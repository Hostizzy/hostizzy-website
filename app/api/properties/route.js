import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, getQueryParams, filterByQuery, generateId } from '@/lib/utils';

// GET /api/properties - Get all properties (public)
export async function GET(request) {
  try {
    const properties = readJson(DATA_FILES.PROPERTIES);
    const query = getQueryParams(request);

    let filtered = properties;

    // Filter by category
    if (query.category && query.category !== 'All') {
      filtered = filtered.filter(p =>
        p.type?.toLowerCase() === query.category.toLowerCase()
      );
    }

    // Filter by location
    if (query.location && query.location !== 'All') {
      filtered = filtered.filter(p =>
        p.location?.includes(query.location)
      );
    }

    return successResponse(filtered);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return errorResponse('Failed to load properties', 500);
  }
}

// POST /api/properties - Create new property (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const properties = readJson(DATA_FILES.PROPERTIES);

    const newProperty = {
      id: generateId(),
      ...body,
      rating: body.rating || 5.0,
      reviews: body.reviews || 0
    };

    properties.push(newProperty);
    writeJson(DATA_FILES.PROPERTIES, properties);

    return successResponse(newProperty, 201);
  } catch (error) {
    console.error('Error creating property:', error);
    return errorResponse('Failed to create property', 500);
  }
};

export const POST = withAuth(handlePOST);
