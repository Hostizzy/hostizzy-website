/**
 * Anti-spam utilities: honeypot detection + in-memory rate limiting.
 * Apply to public form endpoints (contact, data-deletion, career applications).
 */

// In-memory rate limit store (resets on serverless cold start, which is fine)
const rateLimitStore = new Map();

/**
 * Check if a submission is spam.
 * @param {object} body - The request body
 * @param {Request} request - The incoming request
 * @param {object} options - { maxRequests: number, windowMs: number }
 * @returns {{ isSpam: boolean, reason?: string }}
 */
export function checkSpam(body, request, options = {}) {
  const { maxRequests = 3, windowMs = 60 * 60 * 1000 } = options; // default: 3 per hour

  // 1. Honeypot check — if the hidden field has a value, it's a bot
  if (body._hp_website || body.website_url || body._honeypot) {
    return { isSpam: true, reason: 'honeypot' };
  }

  // 2. Timing check — if form was filled in under 3 seconds, likely a bot
  if (body._formLoadedAt) {
    const elapsed = Date.now() - Number(body._formLoadedAt);
    if (elapsed < 3000) {
      return { isSpam: true, reason: 'too_fast' };
    }
  }

  // 3. Rate limiting by email or IP
  const key = body.email?.toLowerCase() || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (entry) {
    // Clean old entries
    const recent = entry.filter(ts => now - ts < windowMs);
    if (recent.length >= maxRequests) {
      return { isSpam: true, reason: 'rate_limited' };
    }
    recent.push(now);
    rateLimitStore.set(key, recent);
  } else {
    rateLimitStore.set(key, [now]);
  }

  // Cleanup old keys periodically (every 100 entries)
  if (rateLimitStore.size > 500) {
    for (const [k, v] of rateLimitStore) {
      const recent = v.filter(ts => now - ts < windowMs);
      if (recent.length === 0) rateLimitStore.delete(k);
      else rateLimitStore.set(k, recent);
    }
  }

  return { isSpam: false };
}
