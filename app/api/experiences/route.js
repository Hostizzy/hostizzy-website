import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/experiences - Get all experiences (public)
export async function GET(request) {
  try {
    const experiences = readJson(DATA_FILES.EXPERIENCES);
    return successResponse(experiences);
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

    const experiences = readJson(DATA_FILES.EXPERIENCES);

    const newExp = {
      id: generateId(),
      ...body
    };

    experiences.push(newExp);
    writeJson(DATA_FILES.EXPERIENCES, experiences);

    return successResponse(newExp, 201);
  } catch (error) {
    console.error('Error creating experience:', error);
    return errorResponse('Failed to create experience', 500);
  }
};

export const POST = withAuth(handlePOST);
