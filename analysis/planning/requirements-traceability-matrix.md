# Requirements Traceability Matrix

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: Confluence/Jira/GitHub

## Purpose

This matrix connects the reconstructed functional and non-functional requirements to personas, Jira-ready stories,
implementation evidence, verification signals, and known gaps.

It does not replace `analysis/product/scope-and-requirements.md` or `analysis/jira/user-stories.md`. The requirements
page remains the product source, the Jira files remain the execution source, and this page is the cross-check that keeps
the two aligned as the portfolio keeps changing.

## How To Use This Matrix

- Use the requirement id when changing product behavior.
- Use the story id when planning, importing, or reviewing work in Jira.
- Use the evidence column when explaining why an existing feature was built.
- Use the verification column when deciding what must be checked before a slice is done.
- Update this file in the same documentation slice when requirements, stories, ADRs, schema notes, or verification
  expectations change.

## Status Model

| Status | Meaning |
| --- | --- |
| Implemented | Existing commits or code areas satisfy the requirement. |
| Implemented/in progress | Existing commits satisfy the core behavior, but active local work is still refining it. |
| Implemented pattern | The behavior is an established implementation pattern rather than a single feature. |
| Implemented with indirect story coverage | The behavior is implemented, but Jira coverage sits under broader or adjacent stories. |
| Documented | The expectation is documented and has evidence, but may need future technical verification. |
| In progress | Local artifacts exist and external or workflow execution remains incomplete. |
| Planned | Requirement is documented and story-backed, but not yet built. |
| Indirect coverage | The requirement is covered by broader stories or technical evidence, but may need a dedicated story later. |

## Functional Requirements

| Requirement | Status | Primary personas | Jira stories | Evidence | Verification signal |
| --- | --- | --- | --- | --- | --- |
| `FR-001` Public homepage communicates personal/service identity. | Implemented | `PERS-001`, `PERS-004` | `PF-101` | `693b93f`, `5a4bcd2`, `fd7329f`, `a8397c1` | Manual homepage review, route composition review, future visual/accessibility checks. |
| `FR-002` Localized routing and content. | Implemented | `PERS-001`, `PERS-003`, `PERS-004` | `PF-301`, `PF-302`, `PF-303` | `4f41de7`, `bc4f459`, `7fd2f33`, `154ad9d` | Locale route checks, not-found behavior, localized metadata checks. |
| `FR-003` CMS portfolio content stored in PostgreSQL with migrations. | Implemented | `PERS-002`, `PERS-003` | `PF-201`, `PF-501` | `734bc11`, `a4e903c`, `819f946`, ADR 0002 | `npm run db:check`, migration review, schema documentation review. |
| `FR-004` Professional experience entries render from CMS data. | Implemented | `PERS-004` | `PF-102` | `7e4d781`, `fd7329f`, `ce8e785` | Experience route review, empty-state review when content changes. |
| `FR-005` Skills render and connect to related experience. | Implemented | `PERS-004` | `PF-103` | `a8397c1`, `453a504`, `0555e11`, `b87e6ab` | Skill list/detail route review, related work query review. |
| `FR-006` Projects list and detail pages explain concrete work. | Implemented | `PERS-001`, `PERS-002`, `PERS-004` | `PF-104`, `PF-703` | `94504e1`, `403c727`, `51f33ee` | Project route review, structured narrative review, service-proof mapping. |
| `FR-007` Blog previews, detail pages, and canonical post routes. | Implemented with indirect story coverage | `PERS-004`, `PERS-005` | `PF-302`, `PF-303`, `PF-703` | `0e5d518`, `27c9bc0`, `154ad9d`, `90efd64` | Blog route review, canonical redirect review, metadata review. |
| `FR-008` Blog and project bodies use structural content instead of unsafe raw HTML. | Implemented | `PERS-002`, `PERS-003` | `PF-203` | `1646dd0`, `41794d8`, `5fbd111`, `5640a29`, ADR 0003 | `tests/structural-content/rendering.test.ts`, renderer fallback review. |
| `FR-009` Blog posts mention portfolio entities and render related content. | Implemented | `PERS-003`, `PERS-004` | `PF-201`, `PF-703` | `c973703`, `b9ac923`, `b0785ee` | Content entity query review, related content rendering review. |
| `FR-010` Visitors can sign up, sign in, and sign out. | Implemented | `PERS-005` | `PF-401`, `PF-402` | `85d63d3`, `e9077c4`, `42d0cb8`, `1c96224`, `d843b43` | Auth route/action review, sign-in/sign-out manual check. |
| `FR-011` Auth flows validate credentials and apply rate limiting. | Implemented | `PERS-005`, owner | `PF-403` | `c0fa0fc`, `7333bb1`, `bbdf312` | `tests/auth/validation.test.ts`, `tests/auth/rate-limit-keys.test.ts`. |
| `FR-012` Auth sessions are durable and local session state refreshes after changes. | Implemented/in progress | `PERS-005` | `PF-402` | `6a7ccc8`, `2c0f322`, `d6e1fc6`, `ba94255`, current worktree | Session persistence review, local auth-state refresh check. |
| `FR-013` Authenticated readers can comment on blog posts. | Implemented/in progress | `PERS-005` | `PF-404` | `4083894`, `1033065`, `cc9073d`, `3d145da`, `94566f8`, current worktree | `tests/blog/comments.test.ts`, comment action/rendering review. |
| `FR-014` Comment discussion context survives account deletion. | Implemented | `PERS-005` | `PF-405` | `cc9073d`, ADR 0005 | Comment foreign-key behavior review, orphaned author fallback tests. |
| `FR-015` Branch-isolated Neon database workflows. | Implemented | `PERS-002`, owner | `PF-502` | `5a50321`, `888fbdf` | Manual Neon branch sync, env review, migration build review. |
| `FR-016` Development-only integration metadata for fixed route placement. | Implemented with indirect story coverage | `PERS-002` | `PF-503` | `d98aff7` | Route placement review, architecture boundary review. |
| `FR-017` Visitors can choose a scoped service entry point. | Planned | `PERS-001` | `PF-701`, `PF-702`, `PF-703`, `PF-704` | `analysis/product/conversion-path.md` | Future CTA/intake route review, conversion path validation. |
| `FR-018` Owner can moderate blog comments without breaking thread context. | Planned | owner, `PERS-005` | `PF-406`, `PF-407`, `PF-408` | `analysis/product/interaction-policy.md`, ADR 0005, ADR 0009, ADR 0010 | Future moderation schema/action/rendering tests. |
| `FR-019` Owner can author, preview, and publish CMS content through a managed workflow. | Planned | owner, `PERS-003` | `PF-205`, `PF-206`, `PF-207` | `analysis/product/cms-authoring-workflow.md`, ADR 0011 | Future owner admin route, authenticated preview, validation, and audit checks. |
| `FR-020` Owner-only account capabilities protect moderation and authoring tools. | Planned | owner, `PERS-003` | `PF-409`, `PF-411` | `analysis/product/auth-account-roadmap.md`, ADR 0010, ADR 0011 | Future authorization tests and protected-route review. |
| `FR-021` Service offers describe audience fit, scope boundaries, outputs, and proof surfaces. | Planned | `PERS-001`, `PERS-002`, `PERS-004` | `PF-701`, `PF-702`, `PF-703`, `PF-705` | `analysis/product/service-offer-catalog.md` | Future service section review, intake routing check, offer-to-proof content audit. |

## Non-Functional Requirements

| Requirement | Status | Primary personas | Jira stories | Evidence | Verification signal |
| --- | --- | --- | --- | --- | --- |
| `NFR-001` Maintainable route and component boundaries. | Implemented pattern | `PERS-002` | `PF-503`, `PF-604` | `0becf78`, `8a37c2b`, `29f3709`, `619d869`, ADR 0007 | Architecture review, route composition review, ADR updates. |
| `NFR-002` Data integrity through code-first schema and migrations. | Implemented | `PERS-002`, `PERS-003` | `PF-201`, `PF-501`, `PF-507` | `734bc11`, migration history, ADR 0002, `analysis/technical/schema-table-catalog.md` | `npm run db:check`, schema table catalog review, migration catalog review. |
| `NFR-003` Auth inputs validated before account actions. | Implemented | `PERS-005` | `PF-403` | `c0fa0fc`, `213d7a7` | Auth validation tests. |
| `NFR-004` Auth attempts rate limited by scope and resolved client IP. | Implemented | `PERS-005`, owner | `PF-403` | `7333bb1`, `bbdf312`, `213d7a7` | Rate-limit key tests, abuse-case review. |
| `NFR-005` Baseline response headers. | Implemented with indirect story coverage | `PERS-002`, owner | `PF-504` | `ca983df` | Header review in route/build checks, future security checklist. |
| `NFR-006` Localized metadata and slugs. | Implemented | `PERS-001`, `PERS-003`, `PERS-004` | `PF-301`, `PF-302`, `PF-303` | `bc4f459`, `73952bb`, `7fd2f33` | Locale route and metadata checks. |
| `NFR-007` Portable docs for Confluence/Jira/FigJam. | In progress | owner, `PERS-002` | `PF-601`, `PF-602`, `PF-603`, `PF-608` | Local analysis suite | Markdown review, CSV parse, future external import records. |
| `NFR-008` Unit coverage for important auth, content, and comment behavior. | Implemented baseline | `PERS-002` | `PF-504` | `213d7a7`, `2870f75`, `analysis/technical/verification-catalog.md` | `npm run test`, focused test files by capability. |
| `NFR-009` Production and preview builds run committed migrations predictably. | Implemented | `PERS-002`, owner | `PF-501`, `PF-502` | `README.md`, `build:vercel` | Build script review, Neon workflow review. |
| `NFR-010` Hero semantics support accessibility and SEO. | Documented | `PERS-001`, `PERS-004` | `PF-101` | `c4ea874` | Heading semantics review, future visual/accessibility checks. |
| `NFR-011` Account-backed comments have moderation and preservation rules. | Planned | owner, `PERS-005` | `PF-405`, `PF-406`, `PF-407`, `PF-408` | `analysis/product/interaction-policy.md`, ADR 0005, ADR 0009 | Future moderation tests, policy review before schema work. |
| `NFR-012` Conversion claims stay tied to implementation evidence. | Planned | `PERS-001`, `PERS-002`, `PERS-004` | `PF-701`, `PF-702`, `PF-703`, `PF-704` | `analysis/product/conversion-path.md`, `analysis/product/positioning-brief.md` | Future service CTA review, proof-to-service mapping. |
| `NFR-013` Future work stays traceable to personas, risks, requirements, and validation. | In progress | owner, `PERS-002` | `PF-605`, `PF-606`, `PF-607`, `PF-608`, `PF-609`, `PF-610` | Planning suite, this matrix | Traceability checklist, PR/change template, review cadence. |
| `NFR-014` CMS authoring preserves structural safety, localization, and previewability. | Planned | owner, `PERS-003` | `PF-203`, `PF-205`, `PF-206`, `PF-207` | `analysis/product/cms-authoring-workflow.md`, ADR 0003, ADR 0011 | Future authoring validation tests, preview workflow review. |
| `NFR-015` Auth scope grows only with reader, owner, or client product needs. | Planned | owner, `PERS-005` | `PF-409`, `PF-410`, `PF-411` | `analysis/product/auth-account-roadmap.md`, ADR 0010 | Future account-scope decision review, authorization tests. |
| `NFR-016` API boundaries distinguish internal app behavior from public contracts before OpenAPI. | Documented | `PERS-002` | `PF-506` | `analysis/technical/openapi.md`, `analysis/technical/api-surface-inventory.md`, ADR 0006 | API inventory review before adding public route contracts or OpenAPI files. |

## Coverage Notes

| Coverage area | Assessment | Follow-up |
| --- | --- | --- |
| Public portfolio, CMS, i18n, auth, comments, migrations | Strong implemented traceability. | Keep evidence current when active worktree changes are committed. |
| Blog publishing as a standalone product story | Partial story coverage. | Add a dedicated story if blog publishing becomes a major roadmap area beyond comments and metadata. |
| Security headers and development-only metadata | Indirect story coverage. | Keep under architecture/quality unless they need independent product acceptance criteria. |
| External tool portability | Locally ready, externally incomplete. | Finish `PF-601`, `PF-602`, `PF-603`, and `PF-608` once Confluence, Jira, and FigJam are connected. |
| Planned owner workflows | Story-backed but not implemented. | Moderation schema, owner authorization, and CMS authoring directions are accepted in ADR 0009, ADR 0010, and ADR 0011; build routes/actions only after the shared guard and focused tests exist. |

## Update Rules

- Add new requirement rows before implementation starts when possible.
- Add or revise Jira stories when a requirement has no story coverage or the current story is too broad to verify.
- Move a row to `Implemented` only when evidence and verification both exist.
- Keep `Implemented/in progress` when committed evidence exists but active local work is still changing the behavior.
- Record external Jira keys or Confluence links in `analysis/jira/import-history.md` after tool setup rather than replacing
  the local ids here.
- If a requirement is removed, keep the id in a retired section instead of reusing it for different behavior.
