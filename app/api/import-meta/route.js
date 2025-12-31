import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// POST /api/import-meta - Import metadata from URL (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body || !body.url) {
      return errorResponse('URL is required', 400);
    }

    const { url } = body;

    // Fetch the URL with proper headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!response.ok) {
      return errorResponse('Failed to fetch URL', response.status);
    }

    const html = await response.text();

    // Helper function to extract meta tags
    const getMeta = (prop) => {
      const match = html.match(new RegExp(`<meta property=["']${prop}["'] content=["']([^"']*)["']`)) ||
        html.match(new RegExp(`<meta name=["']${prop}["'] content=["']([^"']*)["']`));
      return match ? match[1] : '';
    };

    // Extract metadata
    const title = getMeta('og:title') || getMeta('twitter:title') || html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
    const description = getMeta('og:description') || getMeta('twitter:description');
    const image = getMeta('og:image') || getMeta('twitter:image');

    // Extract price (heuristic approach)
    let price = '';
    const priceMatch = html.match(/[₹$]\s?([0-9,]+)/);
    if (priceMatch) {
      price = `₹${priceMatch[1]}`;
    }

    return successResponse({
      title: title.split(' - ')[0],
      description,
      image,
      price
    });
  } catch (error) {
    console.error('Import meta error:', error);
    return errorResponse('Failed to import meta tags', 500);
  }
};

export const POST = withAuth(handlePOST);
