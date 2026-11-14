import { NextResponse } from 'next/server';
import { DATA_FILES } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';
import fs from 'fs';

// GET /api/settings - Get settings (public)
export async function GET(request) {
  try {
    // Check if file exists
    if (!fs.existsSync(DATA_FILES.SETTINGS)) {
      return successResponse({});
    }

    const data = await fs.promises.readFile(DATA_FILES.SETTINGS, 'utf8');
    const settings = JSON.parse(data);
    return successResponse(settings);
  } catch (error) {
    // If file doesn't exist or is empty, return empty object
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return successResponse({});
    }
    console.error('Error loading settings:', error);
    return errorResponse('Failed to load settings', 500);
  }
}
