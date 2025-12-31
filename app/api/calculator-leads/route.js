import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { CalculatorLead, getMongoConnectionState, DATA_FILES, readJson, writeJson } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody, generateId } from '@/lib/utils';

// GET /api/calculator-leads - Get all calculator leads (requires auth)
const handleGET = async (request) => {
  try {
    const isMongoConnected = getMongoConnectionState();

    if (isMongoConnected) {
      // Fetch from MongoDB
      const leads = await CalculatorLead.find().sort({ createdAt: -1 });
      return successResponse(leads);
    } else {
      // Fetch from JSON file
      const leads = readJson(DATA_FILES.CALCULATOR_LEADS);
      return successResponse(leads || []);
    }
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

    const isMongoConnected = getMongoConnectionState();

    if (isMongoConnected) {
      // Save to MongoDB
      const newLead = new CalculatorLead(body);
      await newLead.save();
    } else {
      // Save to JSON file
      const leads = readJson(DATA_FILES.CALCULATOR_LEADS);
      const newLead = {
        id: generateId(),
        ...body,
        createdAt: new Date().toISOString()
      };
      leads.unshift(newLead);
      writeJson(DATA_FILES.CALCULATOR_LEADS, leads);
    }

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
