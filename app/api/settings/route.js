import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
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

// PUT /api/settings - Update settings (requires auth)
const handlePUT = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    await fs.promises.writeFile(DATA_FILES.SETTINGS, JSON.stringify(body, null, 2), 'utf8');
    return successResponse({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    return errorResponse('Failed to save settings', 500);
  }
};

export const PUT = withAuth(handlePUT);
