# Schema Table Catalog

Status: Draft
Owner: Thouzands
Last updated: 2026-07-02
Target home: GitHub/Confluence

## Purpose

This catalog maps the current Drizzle schema at table and enum level. It is a reader-friendly companion to
`src/db/schema.ts`, not a replacement for the code source of truth.

Use it when a reviewer needs to understand what each table is for before reading column definitions, migrations, or
query code.

## Source Of Truth

| Artifact | Role |
| --- | --- |
| `src/db/schema.ts` | Authoritative schema definitions. |
| `drizzle/` | Authoritative SQL migration history. |
| `analysis/technical/schema-and-migrations.md` | Domain-level schema summary and operational workflow. |
| `analysis/technical/migration-catalog.md` | Migration-level product intent and evidence. |
| ADR 0002 | Decision to use Drizzle schema and migrations as database source of truth. |

## Enums

| Enum | Values | Purpose |
| --- | --- | --- |
| `location_type` | `remote`, `hybrid`, `onsite` | Classifies work location for experience records. |
| `status_cms` | `published`, `hidden`, `draft`, `testing` | Controls CMS visibility and lifecycle state. |
| `content_entity_type` | See `src/db/schema.ts` | Identifies shared portfolio entity types used by mentions and cross-content relationships. |
| `employment_type` | See `src/db/schema.ts` | Classifies professional experience relationship type. |
| `experience_bullet_type` | See `src/db/schema.ts` | Distinguishes responsibilities, achievements, and other experience bullet kinds. |
| `media_role` | See `src/db/schema.ts` | Classifies how media is used in portfolio content. |
| `blob_access` | `public`, `private` | Describes intended Vercel Blob access mode for media records. |
| `auth_role` | `reader`, `moderator`, `owner` | Stores the first portfolio account role vocabulary for future server-side authorization checks. |

## Table Catalog

| Table | Domain | Product purpose | Key relationships or notes |
| --- | --- | --- | --- |
| `user` | Auth | Better Auth user/account subject and portfolio account profile. | Referenced by `session`, `account`, and optionally by `comments`; runtime auth now uses canonical lower-case `username`, real or internal `email`, and `role` from this row. |
| `session` | Auth | Better Auth session persistence. | Belongs to `user`; supports durable sign-in state. |
| `account` | Auth | Better Auth provider/login linkage. | Belongs to `user`; stores credential or provider login metadata and should be described as login records in product language. |
| `verification` | Auth | Better Auth verification data. | Provider/framework-owned support table for short-lived email verification, password reset, OTP, or OTL values. |
| `rate_limit` | Auth/security | Database-backed auth rate-limit counters. | Used by auth flows to reduce abuse risk. |
| `auth_identities` | Auth | Legacy portfolio-owned username/email identity resolution. | Remains in the database after `0021_violet_arclight.sql` for migration safety; current runtime lookup, signup, comments, and session role state use `user` directly, so a later cleanup migration can remove it. |
| `wp_honeypot_logs` | Operations/security | Records fake WordPress installer probes. | Defensive telemetry for suspicious automated requests. |
| `content_entities` | CMS identity | Shared identity layer for portfolio objects. | Enables cross-content references and mentions across content types. |
| `media_assets` | Media | Reusable media metadata and storage references. | Translated alt text and use-specific join tables attach media to content; lifecycle rules live in ADR 0012. |
| `media_asset_translations` | Media | Localized media text. | Belongs to `media_assets`; supports localized alt/metadata. |
| `companies` | Experience | Organization records for professional history. | Referenced by `experience` and localized by `company_translations`. |
| `company_translations` | Experience | Localized company copy. | Belongs to `companies`. |
| `experience` | Experience | Professional role records. | Connects companies, dates, employment/location types, skills, media, and translations. |
| `experience_translations` | Experience | Localized experience summaries. | Belongs to `experience`. |
| `experience_bullets` | Experience | Structured role bullet points. | Belongs to `experience`; localized through bullet translations. |
| `experience_bullet_translations` | Experience | Localized bullet text. | Belongs to `experience_bullets`. |
| `skills` | Skills | Reusable capability vocabulary. | Linked to experience and projects; localized through `skill_translations`. |
| `skill_translations` | Skills | Localized skill names/descriptions. | Belongs to `skills`. |
| `experience_skills` | Skills/experience | Join table between experience and skills. | Grounds skill claims in work history. |
| `experience_media` | Experience/media | Join table for media attached to experience records. | Additional translations can clarify media usage. |
| `experience_media_translations` | Experience/media | Localized media captions or role-specific text for experience media. | Belongs to `experience_media`. |
| `projects` | Projects | Portfolio case-study records. | Connects content entity identity, translations, highlights, skills, and revisions. |
| `project_translations` | Projects | Localized project metadata. | Belongs to `projects`. |
| `project_highlights` | Projects | Structured project proof points. | Localized through highlight translations. |
| `project_highlight_translations` | Projects | Localized project highlight text. | Belongs to `project_highlights`. |
| `project_skills` | Projects/skills | Join table between projects and skills. | Connects case-study proof to reusable capabilities. |
| `project_revisions` | Projects/content | Versioned structured project narrative content. | Stores structural content source, not rendered HTML; see ADR 0003. |
| `blog_posts` | Blog | Blog article identity and lifecycle records. | Connects translations, revisions, comments, mentions, and assets. |
| `comments` | Blog/auth | Authenticated reader comments on blog posts. | Supports nesting and preserves comments after user deletion; future soft-state moderation is defined in ADR 0009. |
| `blog_post_translations` | Blog/i18n | Localized blog metadata and slugs. | Supports canonical localized routes and bare slug redirects. |
| `blog_post_revisions` | Blog/content | Versioned structured blog body content. | Stores structural source, not rendered HTML; see ADR 0003. |
| `blog_post_mentions` | Blog/CMS graph | Connects blog revisions to mentioned portfolio entities. | Powers related content and evidence linking. |
| `blog_post_assets` | Blog/media | Attaches media assets to blog post revisions. | Keeps visual assets tied to the revision that uses them. |

## Current Relationship Themes

| Theme | Tables | Product meaning |
| --- | --- | --- |
| Localized content | `*_translations`, localized slugs | Public portfolio surfaces can support English and Spanish without hard-coded page data. |
| Structured rich content | `project_revisions`, `blog_post_revisions` | Rich bodies stay stored as structural JSON rather than unsafe rendered HTML. |
| Evidence graph | `content_entities`, mentions, skill joins | Projects, posts, experience, and skills can support each other as proof. |
| Managed media lifecycle | `media_assets`, media translations, media joins | Media should be uploaded, attached, replaced, retired, and cleaned up through owner-reviewed rules. |
| Account-backed interaction | Better Auth user/session/account tables, `comments` | Readers can authenticate and comment while preserving discussion context; app account display and role data resolve from `user`. |
| Operational safety | `rate_limit`, `wp_honeypot_logs`, migrations | Abuse controls and operational records are part of the product, not afterthoughts. |

## Update Rules

- Update this catalog when a table or enum is added, removed, renamed, or meaningfully repurposed.
- Update `schema-and-migrations.md` when a domain-level meaning changes.
- Update `migration-catalog.md` when a migration changes product behavior.
- Add or revise an ADR when a schema change expresses a durable architecture decision.
- Keep column-level truth in `src/db/schema.ts`; avoid copying full column definitions here unless a product meaning needs explanation.
