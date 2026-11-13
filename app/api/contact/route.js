import { NextResponse, after } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendContactNotification } from '@/lib/email';
import { checkSpam } from '@/lib/antispam';
import { forwardLeadToHostSuite } from '@/lib/hostsuite';

// POST /api/contact - Submit contact form (public - no auth required)
export async function POST(request) {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    // Anti-spam: honeypot + rate limiting
    const spam = checkSpam(body, request);
    if (spam.isSpam) {
      // Return success to not reveal detection (bots think it worked)
      return successResponse({ success: true, message: 'Message received!' });
    }

    const contacts = readJson(DATA_FILES.CONTACTS);

    const now = new Date().toISOString();
    const newContact = {
      id: generateId(),
      timestamp: now,
      createdAt: now,
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

    // Send email after response — form responds instantly
    after(async () => {
      // Owners and guests go to HostSuite; business enquiries stay email-only.
      const kind = { owner: 'owner', guest: 'guest' }[newContact.department];
      if (kind) await forwardLeadToHostSuite({ kind, form: 'contact', lead: newContact });
      try {
        await sendContactNotification(newContact);
      } catch (err) {
        console.error('Contact email failed:', err.message);
      }
    });

    return successResponse({
      success: true,
      message: 'Message received!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('Failed to submit contact form', 500);
  }
}
