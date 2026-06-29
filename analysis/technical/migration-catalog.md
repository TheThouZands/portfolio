# Migration Catalog

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: GitHub/Confluence

## Purpose

This catalog gives a human-readable index to the committed Drizzle SQL migrations. The SQL files under `drizzle/` remain
the authoritative migration evidence. This file explains product intent and traceability at a reviewable level.

Decision record: [ADR 0002](adr/0002-use-drizzle-schema-and-migrations.md).

## Catalog

| Migration | Theme | Product intent | Related evidence |
| --- | --- | --- | --- |
| `0000_normal_selene.sql` | Drizzle baseline | Establish the initial migration history shape. | `734bc11` |
| `0001_sparkling_norman_osborn.sql` | Initial CMS schema | Create the first large portfolio CMS schema foundation. | `a4e903c` |
| `0002_mean_magdalene.sql` | CMS status evolution | Add or adjust early CMS lifecycle support. | `912ad4f` |
| `0003_colorful_power_man.sql` | Featured content support | Support featured content selection for public portfolio surfaces. | `f98085e` |
| `0004_goofy_stardust.sql` | Multilingual CMS expansion | Add translation-oriented tables and localized CMS structure. | `bc4f459` |
| `0005_peaceful_marvel_apes.sql` | Translated slug indexing | Improve localized blog slug lookup and canonical route behavior. | `73952bb` |
| `0006_handy_vapor.sql` | Operational/security logging | Add WordPress honeypot logging data shape. | `b0fc258` |
| `0007_add_skill_descriptions.sql` | Skill enrichment | Add descriptive copy for skill detail and browsing surfaces. | `453a504` |
| `0008_add_projects.sql` | Project content model | Add portfolio project records, translations, highlights, skills, and revisions. | `94504e1` |
| `0009_ambitious_golden_guardian.sql` | Shared content graph | Add shared content entities and cross-content mention support. | `c973703`, `b9ac923` |
| `0010_zippy_energizer.sql` | Revision integrity | Enforce single current revision behavior and support safer detail fetching. | `bea6a8d` |
| `0011_jazzy_tomas.sql` | Project route/model cleanup | Remove project URL/slug columns after project pages moved to id-based route behavior. | `51f33ee` |
| `0012_fixed_mad_thinker.sql` | Blog comments | Attach comments to blog posts and support threaded discussion data. | `4083894`, `8af92b5` |
| `0013_drop_blog_revision_rendered_output.sql` | Structural source cleanup | Remove stored rendered blog output after structural source became the stronger contract. | `0f8b80d`, ADR 0003 |
| `0014_drop_project_revision_rendered_output.sql` | Structural source cleanup | Remove stored rendered project output for the same structural-content reason. | `280bbe7`, ADR 0003 |
| `0015_mute_scarlet_spider.sql` | Better Auth core | Add Better Auth user, session, account, and verification foundations. | `85d63d3` |
| `0016_pink_katie_power.sql` | Portfolio identity | Add portfolio-owned auth identity records separate from provider/session tables. | `30739e4`, ADR 0004 |
| `0017_odd_captain_flint.sql` | Auth UUID transition | Switch auth ids toward UUID-backed database generation. | `2c0f322`, `d6e1fc6` |
| `0018_thankful_black_bird.sql` | Auth rate limiting | Add database-backed auth rate limit storage. | `7333bb1`, `bbdf312` |
| `0019_useful_purifiers.sql` | Comment authorship | Associate blog comments to account users. | `1033065` |
| `0020_chilly_punisher.sql` | Comment preservation | Preserve comments when user accounts are deleted. | `cc9073d`, ADR 0005 |

## Review Rules

- Review SQL files directly before applying migrations.
- Update this catalog when a new migration changes product meaning.
- Link new migrations to requirements, stories, ADRs, or risk entries where relevant.
- Keep generated migration names intact; use this catalog for human-readable grouping.

## Current Follow-Ups

| Follow-up | Reason |
| --- | --- |
| Moderation migration plan | ADR 0009 defines the future soft-state model, but schema is intentionally not implemented yet. |
| CMS authoring migration plan | Authoring workflow may need draft/audit/preview metadata. |
| Owner authorization migration plan | Owner controls may need simple or explicit authorization data. |
| Media lifecycle migration plan | Upload, cleanup, and asset reconciliation need a product decision first. |
