import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendContactNotification } from '@/lib/email';

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

    // Also save to Firebase if configured
    if (adminDb) {
      try {
        await adminDb.collection('contacts').doc(newContact.id).set(newContact);
      } catch (fbErr) {
        console.error('Firebase write failed:', fbErr);
      }
    }

    // Log to console for debugging
    console.log('--- NEW CONTACT ---');
    console.log(newContact);
    console.log('-------------------');

    // Fire-and-forget email notification
    sendContactNotification(newContact).catch(() => {});

    return successResponse({
      success: true,
      message: 'Message received!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('Failed to submit contact form', 500);
  }
}
