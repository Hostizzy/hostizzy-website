import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/careers - Get all active careers (public)
export async function GET(request) {
  try {
    const careers = readJson(DATA_FILES.CAREERS);
    const activeCareers = careers
      .filter(c => c.isActive)
      .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    return successResponse(activeCareers);
  } catch (error) {
    console.error('Error fetching careers:', error);
    return errorResponse('Failed to load careers', 500);
  }
}

// POST /api/careers - Create new career (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const careers = readJson(DATA_FILES.CAREERS);

    const newCareer = {
      id: generateId(),
      postedDate: new Date().toISOString().split('T')[0],
      isActive: true,
      ...body
    };

    careers.push(newCareer);
    writeJson(DATA_FILES.CAREERS, careers);

    return successResponse(newCareer, 201);
  } catch (error) {
    console.error('Error creating career:', error);
    return errorResponse('Failed to create career', 500);
  }
};

export const POST = withAuth(handlePOST);
