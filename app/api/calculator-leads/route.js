import { NextResponse, after } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendCalculatorLeadNotification } from '@/lib/email';
import { forwardLeadToHostSuite } from '@/lib/hostsuite';

// POST /api/calculator-leads - Submit calculator lead (public - no auth required)
export async function POST(request) {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const leads = readJson(DATA_FILES.CALCULATOR_LEADS);
    const newLead = {
      id: generateId(),
      ...body,
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    writeJson(DATA_FILES.CALCULATOR_LEADS, leads);

    // Also save to Firebase if configured
    if (adminDb) {
      try {
        await adminDb.collection('calculator-leads').doc(newLead.id).set(newLead);
      } catch (fbErr) {
        console.error('Firebase write failed:', fbErr);
      }
    }

    // Send email after response — form responds instantly
    after(async () => {
      await forwardLeadToHostSuite({ kind: 'owner', form: 'calculator', lead: newLead });
      try {
        await sendCalculatorLeadNotification(newLead);
      } catch (err) {
        console.error('Calculator lead email failed:', err.message);
      }
    });

    return successResponse({
      success: true,
      message: 'Lead captured successfully'
    });
  } catch (error) {
    console.error('Calculator lead error:', error);
    return errorResponse('Failed to capture lead', 500);
  }
}
