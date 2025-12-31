import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/social/instagram - Get Instagram posts (public)
export async function GET(request) {
  try {
    const data = readJson(DATA_FILES.SOCIAL);
    return successResponse(data.instagram || []);
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return errorResponse('Failed to load Instagram data', 500);
  }
}

// POST /api/social/instagram - Create new Instagram post (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const data = readJson(DATA_FILES.SOCIAL);
    if (!data.instagram) data.instagram = [];

    const newItem = {
      id: generateId(),
      ...body
    };

    // Add to top
    data.instagram.unshift(newItem);
    writeJson(DATA_FILES.SOCIAL, data);

    return successResponse(newItem, 201);
  } catch (error) {
    console.error('Error creating Instagram post:', error);
    return errorResponse('Failed to create Instagram post', 500);
  }
};

export const POST = withAuth(handlePOST);
