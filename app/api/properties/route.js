import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { findAll, insertOne, getNextId } from '@/lib/mongodb';
import { errorResponse, successResponse, getRequestBody, getQueryParams } from '@/lib/utils';

const COLLECTION = 'properties';

// GET /api/properties - Get all properties (public)
export async function GET(request) {
  try {
    const query = getQueryParams(request);
    let filter = {};

    // Build MongoDB filter
    if (query.category && query.category !== 'All') {
      filter.type = { $regex: new RegExp(query.category, 'i') };
    }

    if (query.location && query.location !== 'All') {
      filter.location = { $regex: new RegExp(query.location, 'i') };
    }

    const properties = await findAll(COLLECTION, filter);

    // Remove MongoDB _id from response
    const sanitized = properties.map(({ _id, ...rest }) => rest);

    return successResponse(sanitized);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return errorResponse('Failed to load properties', 500);
  }
}

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

// POST /api/properties - Create new property (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const nextId = await getNextId(COLLECTION);

    // Generate slug from title and type
    const slug = body.slug || generateSlug(body.title, body.type);

    const newProperty = {
      id: nextId,
      slug,
      ...body,
      rating: body.rating || 5.0,
      reviews: body.reviews || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await insertOne(COLLECTION, newProperty);

    // Remove MongoDB _id from response
    const { _id, ...sanitizedResult } = result;

    return successResponse(sanitizedResult, 201);
  } catch (error) {
    console.error('Error creating property:', error);
    return errorResponse('Failed to create property', 500);
  }
};

export const POST = withAuth(handlePOST);
