import { NextResponse, after } from 'next/server';
import { withAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendCalculatorLeadNotification } from '@/lib/email';
import { forwardLeadToHostSuite } from '@/lib/hostsuite';

// GET /api/calculator-leads - Get all calculator leads (requires auth)
const handleGET = async (request) => {
  try {
    // Prefer Firebase when available
    if (adminDb) {
      try {
        const snapshot = await adminDb.collection('calculator-leads').orderBy('createdAt', 'desc').limit(100).get();
        if (!snapshot.empty) {
          const leads = snapshot.docs.map(doc => doc.data());
          return successResponse(leads);
        }
      } catch (fbErr) {
        console.error('Firebase read failed, falling back to JSON:', fbErr);
      }
    }
    // Fallback to JSON
    const leads = readJson(DATA_FILES.CALCULATOR_LEADS);
    return successResponse(leads || []);
  } catch (error) {
    console.error('Error fetching calculator leads:', error);
    return errorResponse('Failed to load calculator leads', 500);
  }
};

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

// PUT /api/calculator-leads — update status or add note (requires auth)
const handlePUT = async (request) => {
  try {
    const body = await getRequestBody(request);
    if (!body || !body.id) return errorResponse('Lead ID is required', 400);

    const { id, status, note } = body;
    const updates = { updatedAt: new Date().toISOString() };
    if (status) updates.status = status;

    if (adminDb) {
      const docRef = adminDb.collection('calculator-leads').doc(id);
      const doc = await docRef.get();
      if (!doc.exists) return errorResponse('Lead not found', 404);
      if (note) {
        const existing = doc.data();
        const notes = existing.notes || [];
        notes.push({ text: note, timestamp: new Date().toISOString(), author: 'admin' });
        updates.notes = notes;
      }
      await docRef.update(updates);
    } else {
      const leads = readJson(DATA_FILES.CALCULATOR_LEADS);
      const idx = leads.findIndex(l => l.id === id);
      if (idx === -1) return errorResponse('Lead not found', 404);
      if (note) {
        if (!leads[idx].notes) leads[idx].notes = [];
        leads[idx].notes.push({ text: note, timestamp: new Date().toISOString(), author: 'admin' });
      }
      Object.assign(leads[idx], updates);
      writeJson(DATA_FILES.CALCULATOR_LEADS, leads);
    }

    return successResponse({ success: true, message: 'Lead updated' });
  } catch (error) {
    console.error('Calculator lead update error:', error);
    return errorResponse('Failed to update lead', 500);
  }
};

// DELETE /api/calculator-leads — bulk delete (requires auth)
const handleDELETE = async (request) => {
  try {
    const body = await getRequestBody(request);
    if (!body || !body.ids || !Array.isArray(body.ids)) return errorResponse('Lead IDs array is required', 400);

    const { ids } = body;
    if (adminDb) {
      const batch = adminDb.batch();
      ids.forEach(id => batch.delete(adminDb.collection('calculator-leads').doc(id)));
      await batch.commit();
    } else {
      const leads = readJson(DATA_FILES.CALCULATOR_LEADS);
      const filtered = leads.filter(l => !ids.includes(l.id));
      writeJson(DATA_FILES.CALCULATOR_LEADS, filtered);
    }

    return successResponse({ success: true, message: `${ids.length} lead(s) deleted` });
  } catch (error) {
    console.error('Calculator lead delete error:', error);
    return errorResponse('Failed to delete leads', 500);
  }
};

// GET endpoint requires auth (skipGetAuth: false)
export const GET = withAuth(handleGET, { skipGetAuth: false });
export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
