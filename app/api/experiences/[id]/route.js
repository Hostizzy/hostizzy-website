import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// GET /api/experiences/:id - Get single experience (public)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const experiences = readJson(DATA_FILES.EXPERIENCES);
    const exp = experiences.find(e => e.id == id);

    if (!exp) {
      return errorResponse('Experience not found', 404);
    }

    return successResponse(exp);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return errorResponse('Failed to load experience', 500);
  }
}

// PUT /api/experiences/:id - Update experience (requires auth)
const handlePUT = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    let experiences = readJson(DATA_FILES.EXPERIENCES);
    const index = experiences.findIndex(e => e.id == id);

    if (index === -1) {
      return errorResponse('Experience not found', 404);
    }

    experiences[index] = { ...experiences[index], ...body };
    writeJson(DATA_FILES.EXPERIENCES, experiences);

    return successResponse(experiences[index]);
  } catch (error) {
    console.error('Error updating experience:', error);
    return errorResponse('Failed to update experience', 500);
  }
};

// DELETE /api/experiences/:id - Delete experience (requires auth)
const handleDELETE = async (request, { params }) => {
  try {
    const { id } = params;
    let experiences = readJson(DATA_FILES.EXPERIENCES);
    const newExps = experiences.filter(e => e.id != id);

    if (experiences.length === newExps.length) {
      return errorResponse('Experience not found', 404);
    }

    writeJson(DATA_FILES.EXPERIENCES, newExps);
    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return errorResponse('Failed to delete experience', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
