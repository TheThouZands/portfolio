import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });
config();

const databaseUrl = process.env.PF_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing PF_DATABASE_URL. Add it to .env.local or .env before running Drizzle commands.",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  schemaFilter: "public",
  tablesFilter: "*",
  strict: true,
  verbose: true,
});
