import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { findById, updateById, deleteById } from '@/lib/mongodb';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

const COLLECTION = 'experiences';

// GET /api/experiences/:id - Get single experience (public)
export async function GET(request, context) {
  try {
    const { id } = await context.params;
    const exp = await findById(COLLECTION, id);

    if (!exp) {
      return errorResponse('Experience not found', 404);
    }

    // Remove MongoDB _id from response
    const { _id, ...sanitized } = exp;

    return successResponse(sanitized);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return errorResponse('Failed to load experience', 500);
  }
}

// PUT /api/experiences/:id - Update experience (requires auth)
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
      return errorResponse('Experience not found', 404);
    }

    // Fetch updated experience
    const updated = await findById(COLLECTION, id);
    const { _id, ...sanitized } = updated;

    return successResponse(sanitized);
  } catch (error) {
    console.error('Error updating experience:', error);
    return errorResponse('Failed to update experience', 500);
  }
};

// DELETE /api/experiences/:id - Delete experience (requires auth)
const handleDELETE = async (request, context) => {
  try {
    const { id } = await context.params;
    const result = await deleteById(COLLECTION, id);

    if (result.deletedCount === 0) {
      return errorResponse('Experience not found', 404);
    }

    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return errorResponse('Failed to delete experience', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
