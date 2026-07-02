import "server-only";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { portfolioAuthFlow } from "@/auth/portfolio-flow";
import { AUTH_RATE_LIMIT } from "@/auth/rate-limit";
import { db } from "@/db/client";
import * as schema from "@/db/schema";

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const FIVE_MINUTES_IN_SECONDS = 60 * 5;

// Auth stack overview:
// - Better Auth owns the durable user/session/account tables in Postgres.
// - portfolioAuthFlow adds this CMS' username/email identifier password flow.
// - Auth rate limits are database-backed so serverless instances share buckets.
// - nextCookies must stay last so Better Auth Set-Cookie headers become Next
//   cookie mutations during Server Actions, without needing a full page reload.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        sortable: true,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "reader",
        input: false,
      },
    },
  },
  session: {
    expiresIn: THIRTY_DAYS_IN_SECONDS,
    updateAge: ONE_DAY_IN_SECONDS,
    freshAge: FIVE_MINUTES_IN_SECONDS,
    cookieCache: {
      enabled: true,
      maxAge: FIVE_MINUTES_IN_SECONDS,
      strategy: "jwe",
    },
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: AUTH_RATE_LIMIT.default.window,
    max: AUTH_RATE_LIMIT.default.max,
    customRules: {
      "/sign-out": AUTH_RATE_LIMIT.signOut,
    },
  },
  plugins: [portfolioAuthFlow(), nextCookies()],
});
