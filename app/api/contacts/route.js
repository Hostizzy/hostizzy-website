import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson } from '@/lib/db';
import { errorResponse, successResponse } from '@/lib/utils';

// GET /api/contacts - Get all contact submissions (requires auth)
const handleGET = async (request) => {
  try {
    const contacts = readJson(DATA_FILES.CONTACTS);
    return successResponse(contacts || []);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return errorResponse('Failed to load contacts', 500);
  }
};

// GET endpoint requires auth (skipGetAuth: false)
export const GET = withAuth(handleGET, { skipGetAuth: false });
