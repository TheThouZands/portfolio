import "server-only";

import { APIError } from "better-auth/api";
import { sql } from "drizzle-orm";

import { createAuthRateLimitKey } from "@/auth/rate-limit-keys";
import { db } from "@/db/client";
import { rateLimit } from "@/db/schema";

export const AUTH_RATE_LIMIT = {
  default: {
    window: 60,
    max: 120,
  },
  identifier: {
    window: 60,
    max: 30,
  },
  signIn: {
    window: 60,
    max: 5,
  },
  signUp: {
    window: 60,
    max: 5,
  },
  signOut: {
    window: 60,
    max: 30,
  },
} as const;

type AuthRateLimitRule = {
  window: number;
  max: number;
};

const RATE_LIMITED = {
  code: "RATE_LIMITED",
  message: "Too many auth attempts. Please try again later.",
} as const;

export async function enforceAuthRateLimit(
  headers: Headers,
  scope: string,
  rule: AuthRateLimitRule,
) {
  const now = Date.now();
  const windowStart = now - rule.window * 1000;
  const key = createAuthRateLimitKey(headers, scope);

  const [bucket] = await db
    .insert(rateLimit)
    .values({
      key,
      count: 1,
      lastRequest: now,
    })
    .onConflictDoUpdate({
      target: rateLimit.key,
      set: {
        count: sql<number>`case when ${rateLimit.lastRequest} <= ${windowStart} then 1 else ${rateLimit.count} + 1 end`,
        lastRequest: sql<number>`case when ${rateLimit.lastRequest} <= ${windowStart} then ${now} else ${rateLimit.lastRequest} end`,
      },
    })
    .returning({
      count: rateLimit.count,
    });

  if (bucket && bucket.count > rule.max) {
    throw APIError.from("FORBIDDEN", RATE_LIMITED);
  }
}
