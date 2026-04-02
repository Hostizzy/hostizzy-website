import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import { DATA_FILES, readJson } from '@/lib/db';
import { errorResponse, successResponse } from '@/lib/utils';

// GET /api/contacts - Get all contact submissions (requires auth)
const handleGET = async (request) => {
  try {
    // Prefer Firebase when available
    if (adminDb) {
      try {
        const snapshot = await adminDb.collection('contacts').orderBy('createdAt', 'desc').limit(100).get();
        if (!snapshot.empty) {
          const contacts = snapshot.docs.map(doc => doc.data());
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

// GET endpoint requires auth (skipGetAuth: false)
export const GET = withAuth(handleGET, { skipGetAuth: false });
