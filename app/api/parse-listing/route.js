import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// POST /api/parse-listing - Parse listing text (requires auth)
const handlePOST = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body || !body.text) {
      return errorResponse('Text is required', 400);
    }

    const { text } = body;

    // AI-style logic using heuristics and regex
    const parsedData = {
      title: text.split('\n')[0].substring(0, 100),
      description: text.substring(0, 500),
      price: '',
      location: '',
      guests: 2,
      bedrooms: 1,
      bathrooms: 1
    };

    // Heuristics for common listing text
    const priceMatch = text.match(/([0-9,]+)\s?(per night|nightly|₹|$)/i);
    if (priceMatch) {
      parsedData.price = `₹${priceMatch[1]}`;
    }

    const guestMatch = text.match(/([0-9]+)\s?(guests|people|pax)/i);
    if (guestMatch) {
      parsedData.guests = parseInt(guestMatch[1]);
    }

    const bedroomMatch = text.match(/([0-9]+)\s?(bedroom|bdrm)/i);
    if (bedroomMatch) {
      parsedData.bedrooms = parseInt(bedroomMatch[1]);
    }

    const bathroomMatch = text.match(/([0-9]+)\s?(bathroom|bath)/i);
    if (bathroomMatch) {
      parsedData.bathrooms = parseInt(bathroomMatch[1]);
    }

    const locationMatch = text.match(/(in|at|located in)\s?([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
    if (locationMatch) {
      parsedData.location = locationMatch[2];
    }

    return successResponse(parsedData);
  } catch (error) {
    console.error('Parse listing error:', error);
    return errorResponse('Failed to parse listing', 500);
  }
};

export const POST = withAuth(handlePOST);
