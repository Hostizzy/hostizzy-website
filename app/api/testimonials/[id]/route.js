import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// GET /api/testimonials/:id - Get single testimonial (public)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const testimonials = readJson(DATA_FILES.TESTIMONIALS);
    const testimonial = testimonials.find(t => t.id == id);

    if (!testimonial) {
      return errorResponse('Testimonial not found', 404);
    }

    return successResponse(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return errorResponse('Failed to load testimonial', 500);
  }
}

// PUT /api/testimonials/:id - Update testimonial (requires auth)
const handlePUT = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    let testimonials = readJson(DATA_FILES.TESTIMONIALS);
    const index = testimonials.findIndex(t => t.id == id);

    if (index === -1) {
      return errorResponse('Testimonial not found', 404);
    }

    testimonials[index] = { ...testimonials[index], ...body };
    writeJson(DATA_FILES.TESTIMONIALS, testimonials);

    return successResponse(testimonials[index]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return errorResponse('Failed to update testimonial', 500);
  }
};

// DELETE /api/testimonials/:id - Delete testimonial (requires auth)
const handleDELETE = async (request, { params }) => {
  try {
    const { id } = params;
    let testimonials = readJson(DATA_FILES.TESTIMONIALS);
    const newTestimonials = testimonials.filter(t => t.id != id);

    if (testimonials.length === newTestimonials.length) {
      return errorResponse('Testimonial not found', 404);
    }

    writeJson(DATA_FILES.TESTIMONIALS, newTestimonials);
    return successResponse({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return errorResponse('Failed to delete testimonial', 500);
  }
};

export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
