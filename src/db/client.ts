import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const databaseUrl = process.env.PF_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing PF_DATABASE_URL environment variable.");
}

export const db = drizzle(databaseUrl, { schema });
