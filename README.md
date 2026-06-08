This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Use the project Node version before installing or running scripts:

```bash
nvm use 25.9.0
```

On this Windows setup, bare `nvm use` does not read `.nvmrc`, so `npm run node:use` is available as a project shortcut. This repo also includes `.nvmrc` and `.node-version` for tools that read those conventions.

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

You can start editing the localized homepage by modifying `src/app/[locale]/page.tsx`. The page auto-updates as you edit the file.

## Database Migrations

Drizzle is configured for the Neon PostgreSQL database in `.env.local` via `pf_DATABASE_URL`.

The source of truth for schema changes is `src/db/schema.ts`. Make table additions, removals, and modifications there, generate a reviewable SQL migration with `npm run db:generate`, then apply committed migrations with `npm run db:migrate`.

Use `npm run db:pull` only when you need to introspect an existing database state for review or bootstrap work. Normal development should stay codebase-first so `drizzle/` contains the SQL migration history and snapshots that belong in version control.

Useful commands:

```bash
npm run db:pull
npm run db:generate
npm run db:check
npm run db:migrate
npm run db:seed:demo
npm run db:studio
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
