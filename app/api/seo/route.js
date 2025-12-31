import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { DATA_FILES, readJsonAsync, writeJsonAsync } from '@/lib/db';
import { errorResponse, successResponse, getRequestBody } from '@/lib/utils';
import fs from 'fs';

// GET /api/seo - Get SEO data (public)
export async function GET(request) {
  try {
    // Check if file exists
    if (!fs.existsSync(DATA_FILES.SEO)) {
      return successResponse({});
    }

    const data = await fs.promises.readFile(DATA_FILES.SEO, 'utf8');
    const seoData = JSON.parse(data);
    return successResponse(seoData);
  } catch (error) {
    // If file doesn't exist or is empty, return empty object
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return successResponse({});
    }
    console.error('Error loading SEO data:', error);
    return errorResponse('Failed to load SEO', 500);
  }
}

// PUT /api/seo - Update SEO data (requires auth)
const handlePUT = async (request) => {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    await fs.promises.writeFile(DATA_FILES.SEO, JSON.stringify(body, null, 2), 'utf8');
    return successResponse({ message: 'SEO updated successfully' });
  } catch (error) {
    console.error('Error saving SEO data:', error);
    return errorResponse('Failed to save SEO', 500);
  }
};

export const PUT = withAuth(handlePUT);
