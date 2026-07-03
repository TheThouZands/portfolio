import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config();
config({ path: ".env.local", override: true });

const databaseUrl =
  process.env.PF_DATABASE_URL_UNPOOLED ?? process.env.PF_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing PF_DATABASE_URL_UNPOOLED or PF_DATABASE_URL. Add it to .env.local before running Drizzle commands.",
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
