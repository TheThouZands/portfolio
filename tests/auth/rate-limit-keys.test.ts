import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import type * as RateLimitKeys from "../../src/auth/rate-limit-keys";

const require = createRequire(import.meta.url);
const {
  createAuthRateLimitKey,
  getAuthRateLimitIp,
} = require("../../src/auth/rate-limit-keys.ts") as typeof RateLimitKeys;

test("auth rate limit IP prefers the first forwarded IP", () => {
  const headers = new Headers({
    "x-forwarded-for": "203.0.113.10, 198.51.100.20",
    "x-real-ip": "198.51.100.30",
  });

  assert.equal(getAuthRateLimitIp(headers), "203.0.113.10");
});

test("auth rate limit IP falls back through trusted proxy headers", () => {
  assert.equal(
    getAuthRateLimitIp(new Headers({ "x-real-ip": "198.51.100.30" })),
    "198.51.100.30",
  );
  assert.equal(
    getAuthRateLimitIp(new Headers({ "cf-connecting-ip": "198.51.100.40" })),
    "198.51.100.40",
  );
  assert.equal(getAuthRateLimitIp(new Headers()), "unknown");
});

test("auth rate limit keys include the auth scope and resolved IP", () => {
  const headers = new Headers({ "x-forwarded-for": "203.0.113.10" });

  assert.equal(
    createAuthRateLimitKey(headers, "sign-in"),
    "auth:sign-in:203.0.113.10",
  );
});
