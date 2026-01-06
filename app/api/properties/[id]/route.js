import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { findById, findByIdOrSlug, updateById, deleteById } from '@/lib/mongodb';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

const COLLECTION = 'properties';

// GET /api/properties/:id - Get single property (public)
// Supports both numeric ID and slug-based URLs
export async function GET(request, context) {
  try {
    const { id } = await context.params;
    const property = await findByIdOrSlug(COLLECTION, id);

    if (!property) {
      return errorResponse('Property not found', 404);
    }

    // Remove MongoDB _id from response
    const { _id, ...sanitized } = property;

    return successResponse(sanitized);
  } catch (error) {
    console.error('Error fetching property:', error);
    return errorResponse('Failed to load property', 500);
  }
}

// PUT /api/properties/:id - Update property (requires auth)
const handlePUT = async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    // Add updatedAt timestamp
    const updates = {
      ...body,
      updatedAt: new Date().toISOString()
    };

    const result = await updateById(COLLECTION, id, updates);

    if (result.matchedCount === 0) {
      return errorResponse('Property not found', 404);
    }

    // Fetch updated property
    const updated = await findById(COLLECTION, id);
    const { _id, ...sanitized } = updated;

    return successResponse(sanitized);
  } catch (error) {
    console.error('Error updating property:', error);
    return errorResponse('Failed to update property', 500);
  }
};

// DELETE /api/properties/:id - Delete property (requires auth)
const handleDELETE = async (request, context) => {
  try {
    const { id } = await context.params;
    const result = await deleteById(COLLECTION, id);

    if (result.deletedCount === 0) {
      return errorResponse('Property not found', 404);
    }

    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return errorResponse('Failed to delete property', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
