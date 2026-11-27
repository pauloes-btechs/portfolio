// Tests for the contact endpoint's fixed-window rate limiter.
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit, SWEEP_AT } from "../lib/rate-limit.js";

test("allows max requests per window, blocks the next, recovers after the window", () => {
  const store = new Map();
  const opts = (now) => ({ now, windowMs: 1000, max: 2, store });
  assert.equal(checkRateLimit("ip", opts(0)).allowed, true);
  assert.equal(checkRateLimit("ip", opts(10)).allowed, true);
  assert.deepEqual(checkRateLimit("ip", opts(400)), { allowed: false, retryAfterSeconds: 1 });
  assert.equal(checkRateLimit("other", opts(400)).allowed, true, "limits are per IP");
  assert.equal(checkRateLimit("ip", opts(1000)).allowed, true, "a new window starts fresh");
});

test("expired buckets are swept once the map is large", () => {
  const store = new Map();
  for (let i = 0; i < SWEEP_AT; i++) checkRateLimit(`ip${i}`, { now: 0, windowMs: 1000, store });
  checkRateLimit("late", { now: 1000, windowMs: 1000, store });
  assert.deepEqual([...store.keys()], ["late"]);
});
