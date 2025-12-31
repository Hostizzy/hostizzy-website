import { NextResponse } from 'next/server';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// POST /api/contact - Submit contact form (public - no auth required)
export async function POST(request) {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const contacts = readJson(DATA_FILES.CONTACTS);

    const newContact = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      ...body
    };

    // Add to top
    contacts.unshift(newContact);
    writeJson(DATA_FILES.CONTACTS, contacts);

    // Log to console for debugging
    console.log('--- NEW CONTACT ---');
    console.log(newContact);
    console.log('-------------------');

    return successResponse({
      success: true,
      message: 'Message received!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('Failed to submit contact form', 500);
  }
}
