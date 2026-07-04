DB files describe the PostgreSQL shape used by the app

schema.ts is the source of truth for table additions, removals, and modifications

after changing it, run db:generate and commit the schema update together with the generated drizzle migration

db:migrate applies those committed migrations to the database

db:branch:sync creates or reuses the `preview/<current-git-branch>` Neon branch used by Vercel preview deployments, then writes the matching PF_* connection values to .env.local

before running local migrations against a Neon branch, make sure the shell does not already export PF_DATABASE_URL or PF_DATABASE_URL_UNPOOLED for another branch. dotenv does not override existing process env values by default, so a sync can update .env.local while db:migrate still uses a stale shell value.

db:seed:demo inserts repeatable demo CMS content for local/design testing without changing the schema
