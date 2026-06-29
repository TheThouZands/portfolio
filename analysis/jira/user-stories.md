# User Stories

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Jira/Confluence

## Epic PF-E01 - Public Portfolio Discovery

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-101 | As a potential client, I want the homepage to immediately communicate who owns the portfolio and what kind of work they do, so I can decide whether to keep exploring. | High | Implemented | Homepage renders a strong hero; supporting sections expose professional proof; route composition stays clear. | `693b93f`, `5a4bcd2`, `fd7329f`, `a8397c1` |
| PF-102 | As a visitor, I want to browse professional experience, so I can understand the owner's background and credibility. | High | Implemented | Experience list and detail routes render CMS-backed jobs; empty or missing states are handled through route/partial boundaries. | `7e4d781`, `fd7329f`, `ce8e785` |
| PF-103 | As a visitor, I want to browse skills and see related work, so I can connect capabilities to evidence. | High | Implemented | Skills are CMS-backed; skill detail pages exist; related jobs are shown where available. | `a8397c1`, `453a504`, `0555e11`, `b87e6ab` |
| PF-104 | As a technical reviewer, I want project pages to explain concrete work, so I can evaluate delivery depth. | High | Implemented | Project list and detail routes render from CMS data; project revisions carry structured narrative content. | `94504e1`, `403c727`, `51f33ee` |

## Epic PF-E02 - CMS Content Foundation

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-201 | As the portfolio owner, I want content stored as structured records, so updates do not require hard-coding every page. | High | Implemented | Database schema includes companies, experience, skills, projects, blog posts, translations, media, revisions, and content entities. | `734bc11`, `a4e903c`, `bc4f459`, `c973703` |
| PF-202 | As the portfolio owner, I want content lifecycle statuses, so drafts and testing records can exist without becoming public by accident. | Medium | Implemented | CMS status enum includes published, hidden, draft, and testing; query layers define visible statuses. | `912ad4f`, `src/db/queries/cms.ts` |
| PF-203 | As a content author, I want rich article/project bodies represented as safe structural content, so the site can render complex writing without unsafe raw HTML. | High | Implemented | Structural content schema exists; renderer supports known elements and fallbacks; tests cover filtering and fallback behavior. | `1646dd0`, `41794d8`, `5fbd111`, `5640a29`, `213d7a7` |
| PF-204 | As the portfolio owner, I want demo seed data, so local and design testing can use repeatable content. | Medium | Implemented | Seed script exists; structural content stress posts and localized demo content are present. | `819f946`, `162d1be`, `b0decdb`, `21235c7`, `7ac7b23`, `c76456a` |
| PF-205 | As the portfolio owner, I want the CMS authoring workflow defined before editor implementation, so admin work starts from a coherent model. | High | Planned | CMS authoring workflow defines current state, first workflow, content priorities, boundaries, data implications, and open decisions. | `analysis/product/cms-authoring-workflow.md` |
| PF-206 | As the portfolio owner, I want an owner-only draft, preview, and publish flow, so content changes can be reviewed before publication. | High | Planned | Draft, edit, preview, validate, publish, and audit steps are defined with first-version boundaries. | `analysis/product/cms-authoring-workflow.md` |
| PF-207 | As the portfolio owner, I want media lifecycle decisions before upload tooling, so assets do not become unmanaged storage clutter. | Medium | Planned | Authoring workflow identifies media upload, alt text, lifecycle, and cleanup as design decisions before implementation. | `analysis/product/cms-authoring-workflow.md` |

## Epic PF-E03 - Internationalized Content

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-301 | As a visitor, I want localized routes, so I can browse the portfolio in the intended language context. | High | Implemented | Locale route tree exists; invalid locales route to not found; locale request setup is centralized. | `4f41de7`, `7fd2f33` |
| PF-302 | As a visitor following an old or bare blog URL, I want to land on the canonical localized post route. | Medium | Implemented | Bare blog resolver redirects to the localized route; translated slugs are indexed. | `27c9bc0`, `73952bb`, `154ad9d` |
| PF-303 | As a search or social crawler, I want metadata to resolve from localized CMS records, so previews match the page language. | Medium | Implemented | CMS modules expose metadata resolution for blog, experience, projects, and skills. | `src/cms/blog.ts`, `src/cms/experience.ts`, `src/cms/projects.ts`, `src/cms/skills.ts` |

## Epic PF-E04 - Authenticated Interaction

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-401 | As a reader, I want to sign up with a portfolio-specific identifier flow, so I can interact without the site exposing unnecessary account details. | High | Implemented | Identifier resolution distinguishes username and email paths; signup route and server action exist. | `e9077c4`, `42d0cb8`, `1c96224` |
| PF-402 | As a returning reader, I want to sign in and sign out reliably, so my visible session state matches server state. | High | Implemented/in progress | Better Auth route handler exists; sign-in action creates session; logout refreshes local state; current worktree includes auth-state updates. | `6a7ccc8`, `f767a0f`, `ba94255`, current worktree |
| PF-403 | As the portfolio owner, I want credential validation and rate limiting, so auth flows are harder to abuse. | High | Implemented | Zod validation covers usernames, emails, identifiers, passwords, and sign-up shapes; rate limit table and enforcement exist. | `c0fa0fc`, `7333bb1`, `bbdf312`, `213d7a7` |
| PF-404 | As an authenticated reader, I want to comment on blog posts, so I can engage with technical writing. | High | Implemented/in progress | Comments table links to posts and optional users; comments render on posts; composer/action exist; active local files refine session-aware rendering. | `4083894`, `1033065`, `3d145da`, `94566f8`, current worktree |
| PF-405 | As a reader, I want discussion history preserved even if an account is removed, so conversation context does not disappear unexpectedly. | Medium | Implemented | Comment user foreign key uses account deletion behavior that preserves comments; rendering has fallback author handling. | `cc9073d`, `tests/blog/comments.test.ts` |
| PF-406 | As the portfolio owner, I want comment moderation states defined before schema changes, so moderation does not become a pile of unrelated flags. | High | Implemented | ADR 0009 defines visible, hidden, and removed soft states, owner-only first actions, schema direction, and non-goals before migration work. | `analysis/product/interaction-policy.md`, `analysis/technical/adr/0009-use-soft-state-comment-moderation.md` |
| PF-407 | As the portfolio owner, I want to hide or remove abusive comments while preserving thread structure, so discussion stays readable and trustworthy. | High | Planned | Owner-only moderation path is defined; hidden/removed rendering behavior is specified before implementation. | `analysis/product/interaction-policy.md`, ADR 0005, ADR 0009 |
| PF-408 | As a reader, I want clear rules for comment editing, deletion, and reporting, so I understand what control I have after posting. | Medium | Planned | ADR 0009 defers reader edit, delete, and report controls from the first moderation slice and keeps them as review triggers. | `analysis/product/interaction-policy.md`, `analysis/technical/adr/0009-use-soft-state-comment-moderation.md` |
| PF-409 | As the portfolio owner, I want an owner authorization model before protected tools, so moderation and authoring routes are not guarded ad hoc. | High | Planned | Auth roadmap defines owner controls, authorization boundaries, and first planned model. | `analysis/product/auth-account-roadmap.md` |
| PF-410 | As the portfolio owner, I want to decide whether client/private accounts belong in the portfolio, so account scope does not grow without a use case. | Medium | Planned | Auth roadmap separates reader, owner, client, collaborator, and public profile account types with decisions. | `analysis/product/auth-account-roadmap.md` |
| PF-411 | As the portfolio owner, I want owner auth connected to moderation and CMS authoring workflows, so protected tools share one account strategy. | High | Planned | Auth roadmap links owner controls to moderation and CMS authoring phases. | `analysis/product/auth-account-roadmap.md`, `analysis/product/cms-authoring-workflow.md` |

## Epic PF-E05 - Quality, Operations, And Architecture

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-501 | As the developer, I want schema changes generated as committed migrations, so database evolution is reviewable. | High | Implemented | README documents migration workflow; Drizzle files and snapshots exist; build flow runs migrations before Vercel builds. | `734bc11`, `README.md`, `drizzle` |
| PF-502 | As the developer, I want branch-isolated Neon database workflows, so local and preview work do not collide with production data. | Medium | Implemented | Neon sync script creates/reuses branch-scoped URLs; docs warn about stale env values. | `5a50321`, `888fbdf`, `README.md` |
| PF-503 | As a maintainer, I want clear architecture boundaries, so future changes can be placed correctly. | High | Implemented | Architecture index and local notes define routes, partials, repeatables, CMS, and DB layering. | `0becf78`, `7482d77`, `ARCHITECTURE.md` |
| PF-504 | As a maintainer, I want automated checks for important behavior, so regressions are caught before deployment. | High | Implemented | Unit tests cover auth validation, auth rate-limit keys, structural content rendering, and blog comments; CI workflow exists. | `213d7a7`, `2870f75` |
| PF-505 | As the portfolio owner, I want retrospective product analysis, so future work can be planned instead of improvised. | High | Planned | Analysis directory exists; requirements, stories, traceability, ADR, schema inventory, and API notes are in place. | This suite |
| PF-506 | As a technical maintainer, I want an API surface inventory, so internal routes and server actions are not mistaken for public OpenAPI contracts. | Medium | Planned | Inventory lists route handlers, server actions, contract status, OpenAPI triggers, and update rules. | `analysis/technical/api-surface-inventory.md`, ADR 0006 |
| PF-507 | As a technical reviewer, I want a table-level schema catalog, so I can understand database purpose and relationships before reading `schema.ts`. | Medium | Planned | Catalog lists current enums, tables, product purposes, relationship themes, source-of-truth rules, and update rules. | `analysis/technical/schema-table-catalog.md`, ADR 0002 |

## Epic PF-E06 - Forward Planning

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-601 | As the portfolio owner, I want a Confluence page tree plan, so product and business docs can move out of local files cleanly. | Medium | Planned | Page hierarchy maps to local `analysis/`; ownership and update rules are defined. | Planned |
| PF-602 | As the portfolio owner, I want a Jira setup plan, so stories can be imported with stable labels, epics, and acceptance criteria. | Medium | Planned | Jira project fields, issue types, labels, and CSV mapping are documented. | `analysis/jira` |
| PF-603 | As the portfolio owner, I want a diagram inventory for Figma/FigJam, so visual artifacts are created with purpose. | Medium | Planned | Required diagrams are listed with owners, source docs, and update triggers. | `analysis/planning/roadmap.md` |
| PF-604 | As a technical reviewer, I want ADR coverage for major decisions, so I can understand why the system evolved this way. | Medium | Planned | ADR index exists; future ADR candidates are listed. | `analysis/technical/adr` |
| PF-605 | As the portfolio owner, I want stakeholder and persona analysis, so requirements and content choices are grounded in real audiences. | Medium | Planned | Stakeholder map, personas, persona-to-requirement map, and product implications are documented. | `analysis/product/stakeholders-and-personas.md` |
| PF-606 | As the portfolio owner, I want a risk register, so product, technical, process, and tooling risks stay visible before implementation. | Medium | Planned | Risk register includes ids, areas, likelihood, impact, mitigations, related docs/stories, cadence, and escalation rules. | `analysis/planning/risk-register.md` |
| PF-607 | As a maintainer, I want a validation strategy, so each future slice has clear evidence before being treated as done. | Medium | Planned | Validation layers, done definition, work-type checks, verification commands, focused test coverage, and traceability checklist are documented. | `analysis/planning/validation-strategy.md`, `analysis/technical/verification-catalog.md` |
| PF-608 | As the portfolio owner, I want external tool setup history, so Confluence pages, Jira keys, and FigJam sections stay traceable to local source files. | Medium | Planned | Tool setup plan, execution runbook, Confluence publishing runbook, Jira import history, and FigJam creation log are documented. | `analysis/planning/tool-setup-plan.md`, `analysis/planning/external-setup-execution-runbook.md`, `analysis/confluence/publishing-runbook.md`, `analysis/jira/import-history.md`, `analysis/design/figjam-creation-log.md` |
| PF-609 | As the portfolio owner, I want a review cadence, decision log, and open-question register, so product direction stays maintained after setup. | Medium | Planned | Release/review cadence, artifact maintenance matrix, decision log, and open questions register are documented and linked from the suite. | `analysis/operations/release-and-review-cadence.md`, `analysis/operations/artifact-maintenance-matrix.md`, `analysis/operations/decision-log.md`, `analysis/operations/open-questions.md` |
| PF-610 | As a maintainer, I want a requirements traceability matrix, so requirements, personas, stories, evidence, and verification stay connected as the portfolio evolves. | Medium | Planned | Matrix maps FR and NFR ids to personas, Jira stories, evidence, verification signals, coverage gaps, and update rules. | `analysis/planning/requirements-traceability-matrix.md` |

## Epic PF-E07 - Service Conversion

| ID | Story | Priority | Status | Acceptance criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| PF-701 | As a potential client, I want clear service entry points, so I can choose the kind of help I need without guessing. | High | Planned | Conversion path defines service wedges, entry offers, recommended CTA, and page implications. | `analysis/product/conversion-path.md` |
| PF-702 | As a potential client, I want a focused intake path, so I can describe the problem and start a scoped conversation. | High | Planned | Intake questions are defined; future route/component can collect contact and problem context. | `analysis/product/conversion-path.md` |
| PF-703 | As a visitor, I want projects and posts linked to service wedges, so I can connect proof to the service I need. | Medium | Planned | Content strategy and conversion path define how proof surfaces should support service wedges. | `analysis/product/content-strategy.md`, `analysis/product/conversion-path.md` |
| PF-704 | As the portfolio owner, I want a visitor journey diagram, so the conversion path can be reviewed visually before implementation. | Medium | Planned | FigJam diagram `PF-DIAG-001` includes homepage, proof review, trust check, and action path. | `analysis/design/diagram-inventory.md`, `analysis/product/conversion-path.md` |
| PF-705 | As a potential client, I want service offers to explain fit, scope, outputs, and proof, so I can choose the right first conversation. | High | Planned | Service offer catalog defines offer ids, buyer signals, included and excluded scope, first outputs, proof surfaces, pricing stance, and intake routing. | `analysis/product/service-offer-catalog.md` |
