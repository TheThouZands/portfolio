# Schema And Migrations

Status: Draft  
Owner: Thouzands  
Last updated: 2026-07-03
Target home: GitHub/Confluence

## Source Of Truth

`src/db/schema.ts` is the schema source of truth. SQL migrations and snapshots live under `drizzle/`. Normal development
should update the Drizzle schema first, generate a migration with `npm run db:generate`, review the SQL, then apply
committed migrations with `npm run db:migrate`.

Decision record: [ADR 0002](adr/0002-use-drizzle-schema-and-migrations.md).

Account consolidation decision: [ADR 0013](adr/0013-centralize-portfolio-account-fields-on-better-auth-user.md).

Table catalog: [schema-table-catalog.md](schema-table-catalog.md).

Detailed catalog: [migration-catalog.md](migration-catalog.md).

## Current Schema Domains

| Domain | Tables/enums | Product purpose |
| --- | --- | --- |
| Auth | `accounts`, `session`, `logins`, `verification`, `rate_limit`, `auth_role` | Account profile, credential/provider login records, sessions, verification values, role vocabulary, and auth abuse controls. |
| CMS identity | `content_entities`, `content_entity_type`, `status_cms` | Shared identity and lifecycle state for portfolio objects. |
| Media | `media_assets`, `media_asset_translations`, `media_role`, `blob_access` | Reusable media metadata, localized alt text, and Vercel Blob-oriented storage hints. |
| Companies and experience | `companies`, `company_translations`, `experience`, `experience_translations`, `experience_bullets`, `experience_bullet_translations`, `experience_media`, `experience_media_translations` | Professional background, organizations, localized copy, bullets, and attached media. |
| Skills | `skills`, `skill_translations`, `experience_skills`, `project_skills` | Reusable capability vocabulary connected to work evidence. |
| Projects | `projects`, `project_translations`, `project_highlights`, `project_highlight_translations`, `project_revisions` | Case-study metadata, highlights, skill links, and versioned structured narratives. |
| Blog | `blog_posts`, `blog_post_translations`, `blog_post_revisions`, `blog_post_mentions`, `blog_post_assets`, `comments` | Articles, localized slugs, structural content revisions, entity mentions, asset placements, and reader comments. |
| Operations/security | `wp_honeypot_logs` | Records fake WordPress installer probes for analysis and defensive visibility. |

## Migration Timeline

| Migration | Theme | Notes |
| --- | --- | --- |
| `0000_normal_selene.sql` to `0002_mean_magdalene.sql` | Initial Drizzle/Postgres setup | Early migration baseline. |
| `0003_colorful_power_man.sql` to `0006_handy_vapor.sql` | CMS and multilingual content foundations | Introduced core CMS structure, statuses, and translated content support. |
| `0007_add_skill_descriptions.sql` | Skill enrichment | Added skill description support. |
| `0008_add_projects.sql` to `0012_fixed_mad_thinker.sql` | Projects, content entities, mentions, comments | Expanded project model, shared entities, revision integrity, blog comments, and threaded comments. |
| `0013_drop_blog_revision_rendered_output.sql` to `0014_drop_project_revision_rendered_output.sql` | Structural content storage cleanup | Removed rendered output fields where structural source became the stronger source. |
| `0015_mute_scarlet_spider.sql` to `0017_odd_captain_flint.sql` | Auth model | Added Better Auth tables, portfolio identities, UUID id generation, and auth-related schema shifts. |
| `0018_thankful_black_bird.sql` to `0020_chilly_punisher.sql` | Auth hardening and comments | Added auth rate limiting and evolved comments/account relationships. |
| `0021_violet_arclight.sql` | Account role and username consolidation step | Adds `auth_role`, username, and role fields to the Better Auth user model, backfilled from `auth_identities`; runtime auth now resolves usernames, emails, comments, session hints, and role checks from the centralized account model. |
| `0022_simplify_auth_account_tables.sql` | Auth table naming cleanup | Renames Better Auth's user model table from `user` to `accounts`, renames credential/provider rows from `account` to `logins`, removes legacy `auth_identities`, and keeps migrations targeted to the synced `.env.local` branch. |

## Operational Workflow

| Command | Purpose |
| --- | --- |
| `npm run db:generate` | Generate reviewable SQL migration from schema changes. |
| `npm run db:check` | Check schema/migration consistency. |
| `npm run db:migrate` | Apply committed migrations. |
| `npm run db:branch:sync` | Create or reuse the `preview/<git-branch>` Neon branch used by Vercel preview deployments and update local env. |
| `npm run db:branch:migrate` | Sync the preview Neon branch and apply migrations. |
| `npm run db:seed:demo` | Insert demo CMS content for local/design testing. |
| `npm run db:studio` | Open Drizzle Studio. |

## Schema Risks And Follow-Ups

| Risk/follow-up | Notes |
| --- | --- |
| Comment moderation model is not yet represented. | ADR 0009 defines the future soft-state direction; the Drizzle schema and migrations have not implemented it yet. |
| CMS authoring fields are not represented yet. | ADR 0011 defines the first owner-only source-aware authoring boundary; add author/editor, audit, preview, or validation fields only through a planned implementation migration. |
| Owner authorization is starting schema-backed role vocabulary work. | ADR 0010 remains the owner-tool bootstrap decision; `0021_violet_arclight.sql` adds Reader/Moderator/Owner storage and the runtime now has shared server-side role helpers. |
| Auth account consolidation and email semantics are implemented for the current role foundation. | Better Auth's user model still requires an email, but the physical table is now `accounts`. Runtime auth uses canonical lower-case `accounts.username`, real or internal `accounts.email`, and `accounts.role`; generated `.invalid` emails remain internal-only and are rejected before Better Auth handoff. |
| Public API shape is undecided. | Route handlers and server actions exist, but OpenAPI should wait for an explicit API product boundary. |
| Media upload tooling is not represented yet. | ADR 0012 defines the lifecycle; implementation may need upload state, owner id, retirement, checksum, or cleanup audit fields. |
| Migration naming is generated and not semantic. | This is acceptable for Drizzle, but summary docs should keep human-readable grouping. |
