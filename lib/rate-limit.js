// Fixed-window in-memory rate limiter for the contact endpoint.
// Deliberately single-process: on serverless each instance counts
// independently and buckets reset on cold start — enough to blunt a spam
// relay without adding a datastore or a heavy dependency.

export const WINDOW_MS = 60 * 60 * 1000; // 1 hour
export const MAX_REQUESTS = 5;

const buckets = new Map(); // ip -> { windowStart, count }

/**
 * Count one request against `ip`'s current fixed window.
 * `now` and `store` are injectable so window expiry (recovery) is testable
 * without waiting on a real clock.
 */
export function checkRateLimit(
  ip,
  { now = Date.now(), windowMs = WINDOW_MS, max = MAX_REQUESTS, store = buckets } = {}
) {
  const record = store.get(ip);
  if (!record || now - record.windowStart >= windowMs) {
    store.set(ip, { windowStart: now, count: 1 });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (record.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.windowStart + windowMs - now) / 1000),
    };
  }
  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
