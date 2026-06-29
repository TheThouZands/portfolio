# ADR 0002: Use Drizzle Schema And Migrations As Database Source Of Truth

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

The portfolio is a database-backed product, not a static site. Its content, auth, comments, translations, media, and
revision history depend on PostgreSQL tables that need to evolve safely.

The project uses Neon PostgreSQL and Drizzle. The repository already contains `src/db/schema.ts`, generated SQL
migrations under `drizzle/`, snapshots under `drizzle/meta/`, and workflow docs in `README.md` and `src/db/db.md`.

## Decision

Use `src/db/schema.ts` as the database source of truth. Generate reviewable SQL migrations with Drizzle and commit them
with the schema changes they represent.

Normal workflow:

1. Edit `src/db/schema.ts`.
2. Run `npm run db:generate`.
3. Review generated SQL in `drizzle/`.
4. Run consistency checks and migrations as appropriate.
5. Commit schema and migration artifacts together.

## Consequences

Positive:

- Database changes are reviewable in Git.
- The schema can be understood without connecting to production.
- Preview and local branches can apply the same committed migrations.
- Technical docs can reference a stable source instead of inferred database state.

Tradeoffs:

- Generated migration names are not always human-readable.
- Developers must avoid changing production manually without reconciling code and migrations.
- Pulling database state with `db:pull` should remain exceptional so Git does not lose authority.

## Evidence

- `src/db/schema.ts`
- `drizzle/`
- `drizzle/meta/`
- `README.md`
- `src/db/db.md`
- `analysis/technical/schema-and-migrations.md`
- Commits: `734bc11`, `5a50321`, `888fbdf`

## Follow-Ups

- Add ADRs if the project adopts a CMS admin/editor workflow that changes schema ownership.
- Keep migration timeline summaries updated when schema domains change materially.
- Consider tests around query behavior for critical content relationships.

