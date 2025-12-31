import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// GET /api/social/instagram/:id - Get single Instagram post (public)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const data = readJson(DATA_FILES.SOCIAL);

    if (!data.instagram) {
      return errorResponse('No Instagram data', 404);
    }

    const post = data.instagram.find(i => i.id == id);

    if (!post) {
      return errorResponse('Instagram post not found', 404);
    }

    return successResponse(post);
  } catch (error) {
    console.error('Error fetching Instagram post:', error);
    return errorResponse('Failed to load Instagram post', 500);
  }
}

// PUT /api/social/instagram/:id - Update Instagram post (requires auth)
const handlePUT = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const data = readJson(DATA_FILES.SOCIAL);

    if (!data.instagram) {
      return errorResponse('No Instagram data', 404);
    }

    const index = data.instagram.findIndex(i => i.id == id);

    if (index === -1) {
      return errorResponse('Instagram post not found', 404);
    }

    data.instagram[index] = { ...data.instagram[index], ...body };
    writeJson(DATA_FILES.SOCIAL, data);

    return successResponse(data.instagram[index]);
  } catch (error) {
    console.error('Error updating Instagram post:', error);
    return errorResponse('Failed to update Instagram post', 500);
  }
};

// DELETE /api/social/instagram/:id - Delete Instagram post (requires auth)
const handleDELETE = async (request, { params }) => {
  try {
    const { id } = params;
    const data = readJson(DATA_FILES.SOCIAL);

    if (!data.instagram) {
      return errorResponse('No Instagram data', 404);
    }

    const originalLength = data.instagram.length;
    data.instagram = data.instagram.filter(i => i.id != id);

    if (data.instagram.length === originalLength) {
      return errorResponse('Instagram post not found', 404);
    }

    writeJson(DATA_FILES.SOCIAL, data);
    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting Instagram post:', error);
    return errorResponse('Failed to delete Instagram post', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
