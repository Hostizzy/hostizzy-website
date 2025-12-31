import { NextResponse } from 'next/server';
import { verifyCredentials, verifyPassword, generateToken } from '@/lib/auth';
import { getRequestBody, errorResponse, successResponse } from '@/lib/utils';

export async function POST(request) {
  try {
    const body = await getRequestBody(request);

    if (!body) {
      return errorResponse('Request body is required', 400);
    }

    const { username, password } = body;

    // Check if username and password are provided (new auth)
    if (username && password) {
      if (verifyCredentials(username, password)) {
        return successResponse({
          success: true,
          token: generateToken()
        });
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid username or password' },
          { status: 401 }
        );
      }
    }
    // Fallback to password-only auth (backwards compatibility)
    else if (password) {
      if (verifyPassword(password)) {
        return successResponse({
          success: true,
          token: generateToken()
        });
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid password' },
          { status: 401 }
        );
      }
    }
    else {
      return errorResponse('Username and password are required', 400);
    }
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Login failed', 500);
  }
}
