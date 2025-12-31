import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// GET /api/blogs/:id - Get single blog (public)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const blogs = readJson(DATA_FILES.BLOGS);
    const blog = blogs.find(b => b.id == id);

    if (!blog) {
      return errorResponse('Blog not found', 404);
    }

    return successResponse(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return errorResponse('Failed to load blog', 500);
  }
}

// PUT /api/blogs/:id - Update blog (requires auth)
const handlePUT = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    let blogs = readJson(DATA_FILES.BLOGS);
    const index = blogs.findIndex(b => b.id == id);

    if (index === -1) {
      return errorResponse('Blog not found', 404);
    }

    blogs[index] = { ...blogs[index], ...body };
    writeJson(DATA_FILES.BLOGS, blogs);

    return successResponse(blogs[index]);
  } catch (error) {
    console.error('Error updating blog:', error);
    return errorResponse('Failed to update blog', 500);
  }
};

// DELETE /api/blogs/:id - Delete blog (requires auth)
const handleDELETE = async (request, { params }) => {
  try {
    const { id } = params;
    let blogs = readJson(DATA_FILES.BLOGS);
    const newBlogs = blogs.filter(b => b.id != id);

    if (blogs.length === newBlogs.length) {
      return errorResponse('Blog not found', 404);
    }

    writeJson(DATA_FILES.BLOGS, newBlogs);
    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return errorResponse('Failed to delete blog', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
