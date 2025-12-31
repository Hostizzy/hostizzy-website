import { NextResponse } from 'next/server';
import { withAuth, isAuthenticated } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/bookings - Get all bookings (requires auth)
const handleGET = async (request) => {
  try {
    const data = readJson(DATA_FILES.BOOKINGS);
    return successResponse(data.bookings || []);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return errorResponse('Failed to load bookings', 500);
  }
};

// POST /api/bookings - Create new booking (public - no auth required)
export async function POST(request) {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const data = readJson(DATA_FILES.BOOKINGS);
    if (!data.bookings) data.bookings = [];

    const newBooking = {
      id: generateId(),
      status: 'Inquiry', // Default status for forms
      paymentId: 'N/A',
      date: new Date().toISOString(),
      ...body
    };

    // Add to top
    data.bookings.unshift(newBooking);
    writeJson(DATA_FILES.BOOKINGS, data);

    // Simulate delay like in Express version
    await new Promise(resolve => setTimeout(resolve, 1000));

    return successResponse({ success: true, booking: newBooking }, 201);
  } catch (error) {
    console.error('Error creating booking:', error);
    return errorResponse('Failed to create booking', 500);
  }
}

// GET endpoint requires auth (skipGetAuth: false)
export const GET = withAuth(handleGET, { skipGetAuth: false });
