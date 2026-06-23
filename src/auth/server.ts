import "server-only";

import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { portfolioAuthFlow } from "@/auth/portfolio-flow";
import { db } from "@/db/client";
import * as schema from "@/db/schema";

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const FIVE_MINUTES_IN_SECONDS = 60 * 5;

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
  plugins: [portfolioAuthFlow(), nextCookies()],
});
