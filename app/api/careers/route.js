import { NextResponse } from 'next/server';
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
