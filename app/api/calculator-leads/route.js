import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';
import { sendCalculatorLeadNotification } from '@/lib/email';

// GET /api/calculator-leads - Get all calculator leads (requires auth)
const handleGET = async (request) => {
  try {
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

    // Fire-and-forget email notification
    sendCalculatorLeadNotification(newLead).catch(() => {});

    return successResponse({
      success: true,
      message: 'Lead captured successfully'
    });
  } catch (error) {
    console.error('Calculator lead error:', error);
    return errorResponse('Failed to capture lead', 500);
  }
}

// GET endpoint requires auth (skipGetAuth: false)
export const GET = withAuth(handleGET, { skipGetAuth: false });
