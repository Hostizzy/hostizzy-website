import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// GET /api/properties/:id - Get single property (public)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const properties = readJson(DATA_FILES.PROPERTIES);
    const property = properties.find(p => p.id == id);

    if (!property) {
      return errorResponse('Property not found', 404);
    }

    return successResponse(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return errorResponse('Failed to load property', 500);
  }
}

// PUT /api/properties/:id - Update property (requires auth)
const handlePUT = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    let properties = readJson(DATA_FILES.PROPERTIES);
    const index = properties.findIndex(p => p.id == id);

    if (index === -1) {
      return errorResponse('Property not found', 404);
    }

    properties[index] = { ...properties[index], ...body };
    writeJson(DATA_FILES.PROPERTIES, properties);

    return successResponse(properties[index]);
  } catch (error) {
    console.error('Error updating property:', error);
    return errorResponse('Failed to update property', 500);
  }
};

// DELETE /api/properties/:id - Delete property (requires auth)
const handleDELETE = async (request, { params }) => {
  try {
    const { id } = params;
    let properties = readJson(DATA_FILES.PROPERTIES);
    const newProperties = properties.filter(p => p.id != id);

    if (properties.length === newProperties.length) {
      return errorResponse('Property not found', 404);
    }

    writeJson(DATA_FILES.PROPERTIES, newProperties);
    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return errorResponse('Failed to delete property', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
