import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.PF_DATABASE_URL;

export const db = databaseUrl ? drizzle(databaseUrl, { schema }) : null;
