import { NextResponse } from 'next/server';

// Admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hostizzy2025';
const ADMIN_TOKEN = 'hz-admin-token-2025';

// Verify login credentials (with username)
export const verifyCredentials = (username, password) => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

// Legacy password-only verification (for backwards compatibility)
export const verifyPassword = (password) => {
  return password === ADMIN_PASSWORD;
};

// Generate token (simple implementation)
export const generateToken = () => {
  return ADMIN_TOKEN;
};

// Verify token
export const verifyToken = (token) => {
  return token === ADMIN_TOKEN;
};

// Auth middleware for Next.js Route Handlers
export const withAuth = (handler, options = {}) => {
  return async (request, context) => {
    // Skip auth for GET requests unless specifically required
    const skipGetAuth = options.skipGetAuth !== false;
    if (request.method === 'GET' && skipGetAuth) {
      return handler(request, context);
    }

    // Get authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const token = authHeader.split(' ')[1];

    if (!verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid token.' },
        { status: 403 }
      );
    }

    // Token is valid, proceed with the handler
    return handler(request, context);
  };
};

// Helper to check if request is authenticated (doesn't block)
export const isAuthenticated = (request) => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];
  return verifyToken(token);
};
