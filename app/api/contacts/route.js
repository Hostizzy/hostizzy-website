import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';

// GET /api/contacts - Get all contact submissions (requires auth)
const handleGET = async (request) => {
  try {
    // Prefer Firebase when available
    if (adminDb) {
      try {
        // Try createdAt first, fall back to unordered if index doesn't exist
        let snapshot;
        try {
          snapshot = await adminDb.collection('contacts').orderBy('createdAt', 'desc').limit(100).get();
        } catch {
          // Older contacts may only have 'timestamp' field — fetch unordered
          snapshot = await adminDb.collection('contacts').limit(100).get();
        }
        if (!snapshot.empty) {
          const contacts = snapshot.docs.map(doc => doc.data());
          // Sort client-side to handle mixed timestamp/createdAt fields
          contacts.sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0));
          return successResponse(contacts);
        }
      } catch (fbErr) {
        console.error('Firebase read failed, falling back to JSON:', fbErr);
      }
    }
    // Fallback to JSON
    const contacts = readJson(DATA_FILES.CONTACTS);
    return successResponse(contacts || []);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return errorResponse('Failed to load contacts', 500);
  }
};

// PUT /api/contacts — update status or add note (requires auth)
const handlePUT = async (request) => {
  try {
    const body = await getRequestBody(request);
    if (!body || !body.id) return errorResponse('Contact ID is required', 400);

    const { id, status, note } = body;
    const updates = { updatedAt: new Date().toISOString() };
    if (status) updates.status = status;

    if (adminDb) {
      const docRef = adminDb.collection('contacts').doc(id);
      const doc = await docRef.get();
      if (!doc.exists) return errorResponse('Contact not found', 404);
      if (note) {
        const existing = doc.data();
        const notes = existing.notes || [];
        notes.push({ text: note, timestamp: new Date().toISOString(), author: 'admin' });
        updates.notes = notes;
      }
      await docRef.update(updates);
    } else {
      const contacts = readJson(DATA_FILES.CONTACTS);
      const idx = contacts.findIndex(c => c.id === id);
      if (idx === -1) return errorResponse('Contact not found', 404);
      if (note) {
        if (!contacts[idx].notes) contacts[idx].notes = [];
        contacts[idx].notes.push({ text: note, timestamp: new Date().toISOString(), author: 'admin' });
      }
      Object.assign(contacts[idx], updates);
      writeJson(DATA_FILES.CONTACTS, contacts);
    }

    return successResponse({ success: true, message: 'Contact updated' });
  } catch (error) {
    console.error('Contact update error:', error);
    return errorResponse('Failed to update contact', 500);
  }
};

// DELETE /api/contacts — bulk delete (requires auth)
const handleDELETE = async (request) => {
  try {
    const body = await getRequestBody(request);
    if (!body || !body.ids || !Array.isArray(body.ids)) return errorResponse('Contact IDs array is required', 400);

    const { ids } = body;
    if (adminDb) {
      const batch = adminDb.batch();
      ids.forEach(id => batch.delete(adminDb.collection('contacts').doc(id)));
      await batch.commit();
    } else {
      const contacts = readJson(DATA_FILES.CONTACTS);
      const filtered = contacts.filter(c => !ids.includes(c.id));
      writeJson(DATA_FILES.CONTACTS, filtered);
    }

    return successResponse({ success: true, message: `${ids.length} contact(s) deleted` });
  } catch (error) {
    console.error('Contact delete error:', error);
    return errorResponse('Failed to delete contacts', 500);
  }
};

// GET endpoint requires auth (skipGetAuth: false)
export const GET = withAuth(handleGET, { skipGetAuth: false });
export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
