# Technical Traceability

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: GitHub/Confluence

## Purpose

This document connects product capabilities to the implemented codebase, database schema, tests, and historical commits.
It is intentionally practical: it should help a reviewer move from "why does this exist?" to "where is it implemented?"

## Commit Clusters

| Cluster | Representative commits | Product meaning |
| --- | --- | --- |
| Foundation and UI shell | `34df7a2`, `693b93f`, `5a4bcd2`, `0dcfab6` | Started portfolio app, created main hero/sections, and clarified component naming. |
| Architecture documentation | `2b8b48c`, `0becf78`, `8a37c2b`, `7482d77` | Added local docs and route/component/db layering guidance. |
| Internationalization | `4f41de7`, `bc4f459`, `7fd2f33`, `154ad9d` | Moved app into locale-aware routing and content translations. |
| CMS and content model | `734bc11`, `a4e903c`, `819f946`, `c973703`, `94504e1` | Established Drizzle, CMS entities, seed data, content mentions, and project model. |
| Portfolio surfaces | `7e4d781`, `a8397c1`, `0555e11`, `403c727` | Rendered experience, skills, skill details, related work, and project pages. |
| Structural content | `1646dd0`, `41794d8`, `5fbd111`, `5640a29`, `c76456a` | Defined and stress-tested a safe structural content contract. |
| Auth foundation | `7b91dd3`, `85d63d3`, `30739e4`, `e9077c4`, `42d0cb8`, `1c96224` | Added Better Auth, portfolio identity, custom identifier flow, and signup/signin routes. |
| Auth hardening | `c0fa0fc`, `7333bb1`, `bbdf312`, `ca983df` | Added validation, auth rate limiting, and baseline security headers. |
| Blog comments | `4083894`, `8af92b5`, `1033065`, `cc9073d`, `3d145da`, `94566f8` | Attached comments to blog posts, associated comments with accounts, preserved orphaned comments, and rendered/composed comments. |
| Operations and quality | `5a50321`, `888fbdf`, `fe788f7`, `213d7a7`, `2870f75` | Added Neon branch sync, cleanup job, unit tests, and CI workflow. |
| Analysis and planning reconstruction | `88702ce` through current docs commits | Rebuilt product analysis, tool setup, diagrams, ADRs, risks, validation, and readiness artifacts locally. |

## Capability To Code Map

| Capability | Requirements | Code areas | Verification |
| --- | --- | --- | --- |
| Homepage and public portfolio browsing | `FR-001`, `FR-004`, `FR-005`, `FR-006` | `src/app/[locale]`, `src/components/heroes`, `src/components/partials`, `src/components/repeatables` | Manual route checks; future visual/a11y checks. |
| Internationalized routes and content | `FR-002`, `NFR-006` | `src/i18n`, `messages`, `src/app/[locale]`, translation tables | Existing route behavior; future metadata tests. |
| CMS data model | `FR-003`, `NFR-002` | `src/db/schema.ts`, `src/db/queries`, `drizzle` | `npm run db:check`, migrations, query tests as added. |
| Structural content rendering | `FR-008`, `NFR-003` | `src/cms/structural-content`, `src/components/repeatables/structural-content` | `tests/structural-content/rendering.test.ts` |
| Blog publishing and comments | `FR-007`, `FR-013`, `FR-014` | `src/db/queries/blog.ts`, `src/blog/actions.ts`, `src/components/partials/blog`, `comments` table | `tests/blog/comments.test.ts`; future action tests. |
| Comment moderation and trust | `FR-018`, `NFR-011` | Future comment moderation schema/actions/rendering | Planned; policy in `analysis/product/interaction-policy.md`. |
| Auth and session flows | `FR-010`, `FR-011`, `FR-012` | `src/auth`, `src/components/auth`, `src/app/api/auth/[...all]`, `src/app/api/auth-state` | `tests/auth`; future integration tests. |
| Service conversion path | `FR-017`, `FR-021`, `NFR-012` | Future contact/intake route or component, homepage CTA, service offer links | Planned; briefs in `analysis/product/conversion-path.md` and `analysis/product/service-offer-catalog.md`. |
| CMS authoring workflow | `FR-019`, `NFR-014` | Future owner-only CMS authoring routes, preview flow, validation, audit fields | Planned; workflow in `analysis/product/cms-authoring-workflow.md`. |
| Owner account controls | `FR-020`, `NFR-015` | Future owner authorization model for moderation and authoring tools | Planned; roadmap in `analysis/product/auth-account-roadmap.md`. |
| Database branch operations | `FR-015`, `NFR-009` | `scripts/sync-neon-branch.mjs`, `drizzle.config.ts`, `README.md` | Manual Neon branch sync; migration checks. |
| Architecture governance | `NFR-001`, `NFR-007` | `ARCHITECTURE.md`, local docs, `analysis/technical/adr` | Code review and ADR updates; ADR 0007 records route/component boundaries. |
| Planning governance | `NFR-013` | `analysis/product/stakeholders-and-personas.md`, `analysis/planning/risk-register.md`, `analysis/planning/validation-strategy.md`, `analysis/planning/requirements-traceability-matrix.md`, external tool manifests | Docs validate with CSV/import checks; future implementation slices should cite persona, requirement, story, risk, and validation evidence. ADR 0008 records manifest ownership. |

## Tests Inventory

| Test file | Behavior covered |
| --- | --- |
| `tests/auth/validation.test.ts` | Username, email, identifier, password, sign-in, and sign-up validation shapes. |
| `tests/auth/rate-limit-keys.test.ts` | Client IP resolution and scoped rate-limit key generation. |
| `tests/structural-content/rendering.test.ts` | Nested structural content rendering, unknown element fallback, unsafe attribute filtering, and null content placeholder. |
| `tests/blog/comments.test.ts` | Nested comment tree behavior, orphaned replies, author fallback names, and rendered nested bodies. |

## Current Gaps

| Gap | Why it matters | Candidate story |
| --- | --- | --- |
| No complete Confluence/Jira integration yet | Local docs are portable but not connected to external tools. | `PF-601`, `PF-602` |
| Diagram inventory exists, but no FigJam diagrams have been created yet | Visual artifacts still need external tool setup. | `PF-603` |
| ADR baseline exists, but future moderation/editor implementation decisions remain uncovered | Route composition is covered by ADR 0007; future protected workflows still need decisions when implemented. | `PF-604` |
| No formal public OpenAPI contract | Current route handlers and server actions are inventoried, but ADR 0006 intentionally defers a spec until public API intent is decided. | `PF-506` or future API decision story |
| Comment moderation policy exists, but implementation is not designed or built | Account-backed comments introduce trust and abuse questions beyond current rendering. | `PF-406`, `PF-407`, `PF-408` |
| Service conversion path is defined, but no contact/intake surface exists yet | The portfolio can prove capability but still needs a business action path. | `PF-701`, `PF-702`, `PF-703`, `PF-704` |
| Risk, validation, and requirement traceability artifacts exist, but they are not yet connected to automated PR or Jira workflow | Planning quality still depends on manual discipline. | `PF-606`, `PF-607`, `PF-610` |
| CMS authoring and owner auth are planned, but not implemented | The data model supports CMS behavior, but safe authoring needs protected workflow decisions. | `PF-205`, `PF-206`, `PF-207`, `PF-409`, `PF-411` |
