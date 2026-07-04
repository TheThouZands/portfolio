# Scope And Requirements

Status: Draft  
Owner: Thouzands  
Last updated: 2026-07-03
Target home: Confluence

## Product Scope

The current scope is a fullstack personal portfolio for selling and demonstrating technical services. It includes
public content browsing, CMS-backed portfolio data, internationalized routes, project and experience detail pages,
blog publishing foundations, authenticated blog comments, and database-backed operational workflows.

Future scope includes better planning integrations, diagrams, ADR coverage, possible formal API contracts, richer
content editing, and stronger moderation/observability.

## Functional Requirements

| ID | Requirement | Status | Evidence commits | Code areas |
| --- | --- | --- | --- | --- |
| FR-001 | The site shall render a public homepage with a strong personal/service identity. | Implemented | `693b93f`, `5a4bcd2`, `fd7329f`, `a8397c1` | `src/app/[locale]/page.tsx`, `src/components/heroes`, `src/components/partials` |
| FR-002 | The site shall support localized routing and content. | Implemented | `4f41de7`, `bc4f459`, `7fd2f33`, `154ad9d` | `src/i18n`, `src/app/[locale]`, `messages` |
| FR-003 | The system shall store CMS portfolio content in PostgreSQL with versioned migrations. | Implemented | `734bc11`, `a4e903c`, `819f946` | `src/db/schema.ts`, `drizzle`, `scripts/seed-demo-data.mjs` |
| FR-004 | The site shall show professional experience entries from CMS data. | Implemented | `7e4d781`, `fd7329f`, `ce8e785` | `src/db/queries/experience.ts`, `src/components/partials/jobs`, `src/app/[locale]/experience` |
| FR-005 | The site shall show skills and connect them to related experience. | Implemented | `a8397c1`, `453a504`, `0555e11`, `b87e6ab` | `src/db/queries/skills.ts`, `src/components/partials/skills` |
| FR-006 | The site shall show project listings and project detail pages. | Implemented | `94504e1`, `403c727`, `51f33ee` | `src/db/queries/projects.ts`, `src/app/[locale]/projects` |
| FR-007 | The site shall publish blog post previews, detail pages, and canonical post routes. | Implemented | `0e5d518`, `27c9bc0`, `154ad9d`, `90efd64` | `src/db/queries/blog.ts`, `src/app/[locale]/blog`, `src/app/blog/[slug]/route.ts` |
| FR-008 | Blog and project bodies shall use a structured content contract instead of unsafe raw HTML. | Implemented | `1646dd0`, `41794d8`, `5fbd111`, `5640a29` | `src/cms/structural-content`, `src/components/repeatables/structural-content` |
| FR-009 | Blog posts shall be able to mention portfolio entities and render related content. | Implemented | `c973703`, `b9ac923`, `b0785ee` | `content_entities`, `blog_post_mentions`, related query modules |
| FR-010 | Visitors shall be able to sign up, sign in, and sign out through a portfolio-specific auth flow. | Implemented | `85d63d3`, `e9077c4`, `42d0cb8`, `1c96224`, `d843b43` | `src/auth`, `src/components/auth`, `src/app/[locale]/auth` |
| FR-011 | Auth flows shall validate credentials and apply rate limiting. | Implemented | `c0fa0fc`, `7333bb1`, `bbdf312` | `src/auth/validation.ts`, `src/auth/rate-limit.ts`, `tests/auth` |
| FR-012 | Auth sessions shall be backed by durable database records and refreshed locally after state changes. | Implemented/in progress | `6a7ccc8`, `2c0f322`, `d6e1fc6`, `ba94255`, current worktree | `src/auth/server.ts`, `src/auth/session-state.ts`, `src/app/api/auth-state` |
| FR-013 | Authenticated readers shall be able to comment on blog posts. | Implemented/in progress | `4083894`, `1033065`, `cc9073d`, `3d145da`, `94566f8`, current worktree | `comments`, `src/blog/actions.ts`, `src/components/partials/blog` |
| FR-014 | The system shall preserve comment discussion context after user deletion. | Implemented | `cc9073d` | `comments.userId` foreign key with `set null`, comment rendering fallback |
| FR-015 | The project shall support branch-isolated Neon database workflows. | Implemented | `5a50321`, `888fbdf` | `scripts/sync-neon-branch.mjs`, `README.md`, `preview/<git-branch>` workflow |
| FR-016 | The app shall expose development-only integration metadata where fixed URLs require route placement. | Implemented | `d98aff7` | `src/app`, route-level architecture notes |
| FR-017 | The portfolio shall define scoped service entry points for visitors with different service needs. | Documented | `analysis/product/conversion-path.md` | Future homepage/contact or intake surface implements the focused choice path |
| FR-018 | The portfolio owner shall be able to moderate blog comments without breaking thread context. | Planned | `analysis/product/interaction-policy.md`, ADR 0005, ADR 0009, ADR 0010 | Future moderation state, owner workflow, comment rendering |
| FR-019 | The portfolio owner shall be able to author, preview, and publish CMS content through a managed workflow. | Planned | `analysis/product/cms-authoring-workflow.md`, `analysis/product/media-asset-lifecycle.md`, ADR 0011, ADR 0012 | Future owner-only authoring routes, authenticated preview flow, validation, media upload, and audit metadata |
| FR-020 | Owner-only account capabilities shall protect moderation and authoring tools. | Planned | `analysis/product/auth-account-roadmap.md`, ADR 0010, ADR 0011 | Future shared owner guard, protected routes, and action checks |
| FR-021 | The portfolio shall describe service offers with audience fit, scope boundaries, outputs, and proof surfaces. | Documented | `analysis/product/service-offer-catalog.md` | Future service entry section, intake path, and offer-to-proof tagging |

## Non-Functional Requirements

| ID | Requirement | Status | Evidence commits | Notes |
| --- | --- | --- | --- | --- |
| NFR-001 | Maintainability: routes should compose sections rather than own all feature behavior. | Implemented pattern | `0becf78`, `8a37c2b`, `29f3709`, `619d869` | Captured in `ARCHITECTURE.md` and component docs. |
| NFR-002 | Data integrity: schema changes must be code-first and migration-backed. | Implemented | `734bc11`, migration history, `analysis/technical/schema-table-catalog.md` | `src/db/schema.ts` is source of truth. |
| NFR-003 | Security: authentication inputs must be validated before account actions. | Implemented | `c0fa0fc`, `213d7a7` | Zod validation and tests. |
| NFR-004 | Security: auth attempts must be rate limited by scope and resolved client IP. | Implemented | `7333bb1`, `bbdf312`, `213d7a7` | Includes rate limit key tests. |
| NFR-005 | Security: responses should include baseline headers. | Implemented | `ca983df` | Baseline response header work exists in branch history. |
| NFR-006 | Internationalization: public content should support localized metadata and slugs. | Implemented | `bc4f459`, `73952bb`, `7fd2f33` | Locale routes and translated slugs. |
| NFR-007 | Portability: local docs should be copyable into Confluence/Jira without losing stable ids. | Implemented baseline | This suite, Confluence page manifest, Jira import history, FigJam section manifest | Use Markdown tables, Jira CSV, and external publication records. |
| NFR-008 | Testability: important auth, content rendering, and comment behavior should have unit coverage. | Implemented baseline | `213d7a7`, `2870f75`, `analysis/technical/verification-catalog.md` | Tests exist under `tests`; command and coverage mapping lives in the verification catalog. |
| NFR-009 | Operational safety: production and preview builds should run committed migrations predictably. | Implemented | `README.md`, `build:vercel` | Vercel build runs `npm run db:migrate && next build`. |
| NFR-010 | Accessibility and SEO: heroes should align with route-level heading semantics. | Documented | `c4ea874` | Hero docs note SEO H1 assumptions. |
| NFR-011 | Trust and safety: account-backed comments should have clear moderation and preservation rules. | Planned | `analysis/product/interaction-policy.md`, ADR 0005, ADR 0009 | Policy and moderation model exist; implementation still needs migration, owner workflow, and tests. |
| NFR-012 | Business clarity: conversion paths should keep service claims tied to implementation evidence. | Documented | `analysis/product/conversion-path.md`, `analysis/product/positioning-brief.md` | Future contact/intake surfaces should route to service wedges and proof. |
| NFR-013 | Planning quality: future work should remain traceable to personas, risks, requirements, and validation evidence. | Implemented baseline | `analysis/product/stakeholders-and-personas.md`, `analysis/planning/risk-register.md`, `analysis/planning/validation-strategy.md` | Planning artifacts exist; implementation changes still need per-slice traceability. |
| NFR-014 | CMS authoring should preserve structural content safety, localization, and previewability. | Planned | `analysis/product/cms-authoring-workflow.md`, `analysis/product/media-asset-lifecycle.md`, ADR 0003, ADR 0011, ADR 0012 | Authoring workflow should not weaken the structural content or media accessibility contracts. |
| NFR-015 | Auth scope should grow only when tied to reader, owner, or client product needs. | Planned | `analysis/product/auth-account-roadmap.md`, ADR 0010 | Avoid building generic account features or role tables without a portfolio use case. |
| NFR-016 | API boundaries should distinguish internal app routes/actions from public contracts before creating OpenAPI. | Documented | `analysis/technical/openapi.md`, `analysis/technical/api-surface-inventory.md`, ADR 0006 | Do not promote internal framework or server-action behavior into public API promises by accident. |

## Current Jira-Backed Requirement Links

| Requirement area | Jira stories | Confluence context |
| --- | --- | --- |
| Public experience visualization | `PF-105` / `KAN-63` | Requirements traceability and public portfolio discovery docs should guide the horizontal candlestick-style experience chart. |
| CMS authoring and media workflows | `PF-206` / `KAN-17`, `PF-208` / `KAN-19`, `PF-411` / `KAN-33` | CMS Authoring Workflow, Media Asset Lifecycle, and Auth And Account Roadmap define the protected authoring boundaries. |
| Comment moderation and reader controls | `PF-408` / `KAN-30` | Interaction Policy defines deferred reader edit/delete/report behavior before implementation. |
| Email auth, profile pictures, and notifications | `PF-414` / `KAN-58`, `PF-415` / `KAN-59`, `PF-416` / `KAN-60`, `PF-417` / `KAN-61` | Auth And Account Roadmap and Media Asset Lifecycle keep these additions tied to real account/product needs. |
| Service conversion and recruiter experiments | `PF-702` / `KAN-52`, `PF-706` / `KAN-62` | Conversion Path Brief and Service Offer Catalog define the intake and bounded experiment context. |

## Out Of Current Scope

| ID | Item | Reason |
| --- | --- | --- |
| OOS-001 | Full CMS editor UI | The schema and rendering model exist, but authoring workflows need separate product analysis. |
| OOS-002 | Moderation dashboard implementation | Comments and policy exist, but admin flows and schema changes need separate implementation planning. |
| OOS-003 | Public API promise | Current APIs are route handlers and server actions; OpenAPI scope needs a decision. |
| OOS-004 | Fully automated Confluence/Jira synchronization | Current external setup is recorded, but automatic two-way sync is intentionally not part of the first baseline. |
| OOS-005 | High-fidelity Figma product design | FigJam diagram coverage exists; product UI design remains separate from the analysis baseline. |

## Requirement Hygiene

- Keep ids stable after Jira import.
- Mark evidence as `Implemented/in progress` when commits exist but the local worktree has active related changes.
- Add one requirement per meaningful product behavior, not one requirement per component.
- When a requirement becomes too large, split it into narrower stories instead of expanding its acceptance criteria forever.
