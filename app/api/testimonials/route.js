import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/testimonials - Get all testimonials (public)
export async function GET(request) {
  try {
    const testimonials = readJson(DATA_FILES.TESTIMONIALS);
    return successResponse(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return errorResponse('Failed to load testimonials', 500);
  }
}

// POST /api/testimonials - Create new testimonial (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const testimonials = readJson(DATA_FILES.TESTIMONIALS);

    const newTestimonial = {
      id: generateId(),
      ...body
    };

    // Add to top
    testimonials.unshift(newTestimonial);
    writeJson(DATA_FILES.TESTIMONIALS, testimonials);

    return successResponse(newTestimonial, 201);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return errorResponse('Failed to create testimonial', 500);
  }
};

export const POST = withAuth(handlePOST);
