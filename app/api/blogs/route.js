import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/blogs - Get all blogs (public)
export async function GET(request) {
  try {
    const blogs = readJson(DATA_FILES.BLOGS);
    return successResponse(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return errorResponse('Failed to load blogs', 500);
  }
}

// POST /api/blogs - Create new blog (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const blogs = readJson(DATA_FILES.BLOGS);

    const newBlog = {
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      ...body
    };

    blogs.push(newBlog);
    writeJson(DATA_FILES.BLOGS, blogs);

    return successResponse(newBlog, 201);
  } catch (error) {
    console.error('Error creating blog:', error);
    return errorResponse('Failed to create blog', 500);
  }
};

export const POST = withAuth(handlePOST);
