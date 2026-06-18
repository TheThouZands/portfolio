# Thouzands' fullstack portfolio

This is a personal portfolio that displays fullstack capabilities using Next.js, and PostgreSQL via Neon serverless DB, handled with Drizzle ORM for DB versioning bound to repo.

It is hosted in Vercel, but is fully runnable as standalone server, likewise, via Drizzle, it is compatible with self-served databases.

## Getting Started

Use the project Node version before installing or running scripts:

```bash
nvm use 25.9.0
```

On some Windows setups, bare `nvm use` does not read `.nvmrc`, so `npm run node:use` is available as a project shortcut. This repo also includes `.nvmrc` and `.node-version` for tools that read those conventions.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Migrations

Drizzle is configured for a Neon PostgreSQL database in `.env.local` via `PF_DATABASE_URL_UNPOOLED` or `PF_DATABASE_URL`.

The source of truth for schema changes is `src/db/schema.ts`. Make table additions, removals, and modifications there, generate a reviewable SQL migration with `npm run db:generate`, then apply committed migrations with `npm run db:migrate`.

Use `npm run db:pull` only when you need to introspect an existing database state for review or bootstrap work. Normal development should stay codebase-first so `drizzle/` contains the SQL migration history and snapshots that belong in version control.

Vercel uses `npm run build:vercel`, which applies committed Drizzle migrations before `next build`. With Neon preview branching enabled, preview deployments receive branch-scoped database URLs from Neon before that migration step runs.

For local branch-isolated development, create a Neon API key and make it available as `NEON_API_KEY` in your shell or ignored `.env.local`, then run:

```bash
npm run db:branch:sync
npm run db:migrate
```

The sync command creates or reuses a Neon branch named `local/<current-git-branch>`, writes the branch connection URLs to `.env.local`, and leaves committed env files untouched. Use `npm run db:branch:migrate` to do both steps together.

Before running local migrations, make sure the terminal does not already export `PF_DATABASE_URL` or `PF_DATABASE_URL_UNPOOLED` for another branch. Dotenv keeps existing process env values by default, so `npm run db:branch:sync` can write the correct `.env.local` while `npm run db:migrate` still uses a stale shell value. If Drizzle reports that it injected `0` values from `.env.local`, restart from a clean terminal or explicitly load the synced `.env.local` values.

Useful commands:

```bash
npm run db:branch:sync
npm run db:branch:migrate
npm run db:pull
npm run db:generate
npm run db:check
npm run db:migrate
npm run db:seed:demo
npm run db:studio
```
