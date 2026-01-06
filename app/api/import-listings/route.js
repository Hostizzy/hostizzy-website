import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { insertOne, getNextId, findAll } from '@/lib/mongodb';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

const COLLECTION = 'properties';

// Helper: Generate URL-friendly slug
function generateSlug(title, type) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single
    .trim();

  const typeSlug = type ? type.toLowerCase().replace(/\s+/g, '-') : 'property';
  return `${typeSlug}/${slug}`;
}

/**
 * POST /api/import-listings - Import properties from third-party sources
 *
 * Supported formats:
 * 1. Direct JSON array of properties
 * 2. Airbnb-style format
 * 3. Booking.com format
 * 4. Custom API URL fetch
 *
 * Request Body:
 * {
 *   "source": "airbnb" | "booking" | "json" | "url",
 *   "data": [...] // For JSON source
 *   "url": "https://..." // For URL source
 *   "apiKey": "..." // Optional for authenticated APIs
 * }
 */
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body || !body.source) {
      return errorResponse('Request body with "source" field is required', 400);
    }

    let listings = [];

    // Handle different sources
    switch (body.source) {
      case 'json':
        // Direct JSON import
        if (!Array.isArray(body.data)) {
          return errorResponse('For JSON source, "data" must be an array of properties', 400);
        }
        listings = body.data;
        break;

      case 'url':
        // Fetch from URL
        if (!body.url) {
          return errorResponse('For URL source, "url" field is required', 400);
        }

        const headers = {};
        if (body.apiKey) {
          headers['Authorization'] = `Bearer ${body.apiKey}`;
        }

        const response = await fetch(body.url, { headers });
        if (!response.ok) {
          return errorResponse(`Failed to fetch from URL: ${response.statusText}`, 400);
        }

        const data = await response.json();
        listings = Array.isArray(data) ? data : (data.listings || data.properties || []);
        break;

      case 'airbnb':
        // Parse Airbnb format
        listings = parseAirbnbFormat(body.data);
        break;

      case 'booking':
        // Parse Booking.com format
        listings = parseBookingFormat(body.data);
        break;

      default:
        return errorResponse(`Unknown source: ${body.source}. Supported: json, url, airbnb, booking`, 400);
    }

    if (!listings || listings.length === 0) {
      return errorResponse('No listings found in the provided data', 400);
    }

    // Get existing properties to avoid duplicates
    const existing = await findAll(COLLECTION);
    const existingTitles = new Set(existing.map(p => p.title.toLowerCase()));

    // Import properties
    const results = {
      imported: 0,
      skipped: 0,
      failed: 0,
      errors: []
    };

    for (const listing of listings) {
      try {
        // Normalize the listing data
        const normalized = normalizeListing(listing);

        // Skip duplicates (by title)
        if (existingTitles.has(normalized.title.toLowerCase())) {
          results.skipped++;
          continue;
        }

        // Generate ID and slug
        const nextId = await getNextId(COLLECTION);
        const slug = normalized.slug || generateSlug(normalized.title, normalized.type);

        const property = {
          id: nextId,
          slug,
          ...normalized,
          rating: normalized.rating || 5.0,
          reviews: normalized.reviews || 0,
          imported: true,
          importSource: body.source,
          importedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await insertOne(COLLECTION, property);
        existingTitles.add(normalized.title.toLowerCase());
        results.imported++;

      } catch (error) {
        results.failed++;
        results.errors.push({
          listing: listing.title || 'Unknown',
          error: error.message
        });
      }
    }

    return successResponse({
      success: true,
      message: `Import completed: ${results.imported} imported, ${results.skipped} skipped, ${results.failed} failed`,
      results
    });

  } catch (error) {
    console.error('Error importing listings:', error);
    return errorResponse(`Failed to import listings: ${error.message}`, 500);
  }
};

// Normalize listing data to match our schema
function normalizeListing(listing) {
  return {
    title: listing.title || listing.name || 'Untitled Property',
    location: listing.location || listing.address || listing.city || '',
    type: listing.type || listing.property_type || 'Villa',
    description: listing.description || listing.summary || '',
    price: parseInt(listing.price || listing.nightly_rate || listing.base_price || 0),
    guests: parseInt(listing.guests || listing.accommodates || listing.max_guests || 2),
    bedrooms: parseInt(listing.bedrooms || listing.beds || 1),
    bathrooms: parseInt(listing.bathrooms || listing.baths || 1),
    image: listing.image || listing.main_image || listing.cover_photo || listing.images?.[0] || '',
    gallery: listing.gallery || listing.images || listing.photos || [],
    videos: listing.videos || listing.video_urls || [],
    amenities_grouped: listing.amenities_grouped || parseAmenities(listing.amenities || []),
    house_rules: listing.house_rules || listing.rules || [],
    cancellation_policy: listing.cancellation_policy || listing.cancellation || '',
    rating: parseFloat(listing.rating || listing.review_score || 5.0),
    reviews: parseInt(listing.reviews || listing.review_count || 0),
    superhost: listing.superhost || listing.is_superhost || false,
    slug: listing.slug || null
  };
}

// Parse amenities array into grouped format
function parseAmenities(amenities) {
  if (!Array.isArray(amenities)) return {};

  const grouped = {
    'Essentials': [],
    'Features': [],
    'Entertainment': [],
    'Safety': []
  };

  const categories = {
    'wifi': 'Essentials',
    'kitchen': 'Essentials',
    'air conditioning': 'Essentials',
    'heating': 'Essentials',
    'pool': 'Features',
    'hot tub': 'Features',
    'gym': 'Features',
    'garden': 'Features',
    'tv': 'Entertainment',
    'netflix': 'Entertainment',
    'smoke detector': 'Safety',
    'first aid': 'Safety'
  };

  amenities.forEach(amenity => {
    const lower = amenity.toLowerCase();
    let category = 'Features'; // default

    for (const [key, cat] of Object.entries(categories)) {
      if (lower.includes(key)) {
        category = cat;
        break;
      }
    }

    if (!grouped[category].includes(amenity)) {
      grouped[category].push(amenity);
    }
  });

  // Remove empty categories
  Object.keys(grouped).forEach(key => {
    if (grouped[key].length === 0) delete grouped[key];
  });

  return grouped;
}

// Parse Airbnb-specific format
function parseAirbnbFormat(data) {
  if (!Array.isArray(data)) return [];

  return data.map(item => ({
    title: item.name,
    location: `${item.city}, ${item.country}`,
    type: item.property_type || 'Villa',
    description: item.summary || item.description,
    price: item.price?.rate,
    guests: item.accommodates,
    bedrooms: item.bedrooms,
    bathrooms: item.bathrooms,
    image: item.picture_url,
    images: item.photos?.map(p => p.picture) || [],
    amenities: item.amenities || [],
    house_rules: item.house_rules?.split('\n') || [],
    rating: item.review_scores_rating / 20, // Airbnb uses 0-100 scale
    reviews: item.number_of_reviews
  }));
}

// Parse Booking.com-specific format
function parseBookingFormat(data) {
  if (!Array.isArray(data)) return [];

  return data.map(item => ({
    title: item.hotel_name,
    location: `${item.city_name}, ${item.country_name}`,
    type: item.accommodation_type_name || 'Hotel',
    description: item.hotel_description,
    price: item.min_total_price,
    guests: item.max_occupancy,
    bedrooms: item.nr_rooms,
    bathrooms: item.nr_bathrooms || 1,
    image: item.main_photo_url,
    images: item.photos?.map(p => p.url_max) || [],
    amenities: item.facilities?.map(f => f.name) || [],
    rating: item.review_score / 2, // Booking uses 0-10 scale
    reviews: item.review_nr
  }));
}

export const POST = withAuth(handlePOST);
