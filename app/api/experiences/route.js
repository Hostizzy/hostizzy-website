import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { findAll, insertOne, getNextId } from '@/lib/mongodb';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

const COLLECTION = 'experiences';

// GET /api/experiences - Get all experiences (public)
export async function GET(request) {
  try {
    const experiences = await findAll(COLLECTION);

    // Remove MongoDB _id from response
    const sanitized = experiences.map(({ _id, ...rest }) => rest);

    return successResponse(sanitized);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return errorResponse('Failed to load experiences', 500);
  }
}

// POST /api/experiences - Create new experience (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const nextId = await getNextId(COLLECTION);

    const newExp = {
      id: nextId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await insertOne(COLLECTION, newExp);

    // Remove MongoDB _id from response
    const { _id, ...sanitized } = result;

    return successResponse(sanitized, 201);
  } catch (error) {
    console.error('Error creating experience:', error);
    return errorResponse('Failed to create experience', 500);
  }
};

export const POST = withAuth(handlePOST);
