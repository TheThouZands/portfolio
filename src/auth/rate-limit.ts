import "server-only";

import { APIError } from "better-auth/api";
import { sql } from "drizzle-orm";

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

function readForwardedHeader(headers: Headers, key: string): string | null {
  const value = headers.get(key);

  if (!value) {
    return null;
  }

  return value.split(",")[0]?.trim() || null;
}

function getRateLimitIp(headers: Headers): string {
  return (
    readForwardedHeader(headers, "x-forwarded-for") ??
    readForwardedHeader(headers, "x-real-ip") ??
    readForwardedHeader(headers, "cf-connecting-ip") ??
    "unknown"
  );
}

export async function enforceAuthRateLimit(
  headers: Headers,
  scope: string,
  rule: AuthRateLimitRule,
) {
  const now = Date.now();
  const windowStart = now - rule.window * 1000;
  const key = `auth:${scope}:${getRateLimitIp(headers)}`;

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
