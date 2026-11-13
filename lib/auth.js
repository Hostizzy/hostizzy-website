import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Admin auth.
//
// This repository is public, so nothing secret may live in it. Earlier
// versions hard-coded a fixed admin token and a default password; both are
// gone. Credentials come only from the environment, and login returns a
// signed token that expires, so a token can't be guessed or reused forever.
//
// Env:
//   ADMIN_USERNAME, ADMIN_PASSWORD  — required; login fails closed without them.
//   ADMIN_TOKEN_SECRET              — signing key. If unset, a key derived from
//                                     ADMIN_PASSWORD is used, so changing the
//                                     password also signs everyone out.

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

const signingKey = () => {
  if (process.env.ADMIN_TOKEN_SECRET) return process.env.ADMIN_TOKEN_SECRET;
  if (process.env.ADMIN_PASSWORD) {
    return crypto.createHash('sha256').update('hostizzy-admin-token:' + process.env.ADMIN_PASSWORD).digest('hex');
  }
  return null;
};

const safeEqual = (a, b) => {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
};

const sign = (data, key) => crypto.createHmac('sha256', key).update(data).digest('base64url');

// Verify login credentials
export const verifyCredentials = (username, password) => {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p || !username || !password) return false;
  // Evaluate both so timing doesn't reveal which one was wrong.
  const userOk = safeEqual(username, u);
  const passOk = safeEqual(password, p);
  return userOk && passOk;
};

// Issue a signed token: base64url(payload).signature
export const generateToken = () => {
  const key = signingKey();
  if (!key) throw new Error('Admin auth is not configured');
  const payload = Buffer.from(JSON.stringify({ sub: 'admin', exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  return `${payload}.${sign(payload, key)}`;
};

// Verify token signature and expiry
export const verifyToken = (token) => {
  const key = signingKey();
  if (!key || typeof token !== 'string') return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig || !safeEqual(sig, sign(payload, key))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
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
