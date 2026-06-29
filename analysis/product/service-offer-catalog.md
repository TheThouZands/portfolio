# Service Offer Catalog

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: Confluence/Jira

## Purpose

This catalog turns the portfolio positioning into concrete service offers. It answers what a qualified visitor can ask
for first, what each offer produces, how it connects to existing proof, and what should stay out of scope for an initial
slice.

The goal is not to lock public pricing yet. The goal is to make the portfolio's business path specific enough that a
visitor can choose a service wedge and the owner can convert that request into a small Jira-ready delivery slice.

## Offer Principles

- Start with a scoped slice instead of an open-ended engagement.
- Anchor every offer to implementation evidence already visible in the portfolio.
- Make outputs concrete enough to review: docs, diagrams, backlog items, PRs, migrations, tests, or deployment notes.
- Keep planning and implementation connected; do not sell analysis as ceremony detached from delivery.
- Defer public pricing until repeatable package boundaries and lead feedback exist.

## Offer Ladder

| Offer id | Offer | Best-fit buyer situation | First output | Proof surfaces |
| --- | --- | --- | --- | --- |
| `OFF-001` | Product system audit | A coherent product, workflow, or portfolio goal needs a clear first delivery slice. | Analysis memo, risk map, requirement/story shortlist, and first delivery slice. | Analysis suite, risk register, traceability matrix. |
| `OFF-002` | CMS and content model design slice | Content is outgrowing static pages, loose fields, or copy-only updates. | Content model, structural content plan, migration path, and rendering notes. | CMS schema, structural content renderer, content strategy, ADR 0003. |
| `OFF-003` | Auth and interaction workflow slice | Users need accounts, comments, submissions, or protected workflows. | Flow diagram, data model changes, validation/rate-limit plan, and test checklist. | Better Auth integration, custom identifier flow, comments, ADR 0004 and ADR 0005. |
| `OFF-004` | Database and deployment workflow setup | Schema changes, preview data, or deployment steps are fragile. | Migration workflow, preview database strategy, branch sync checklist, and operational notes. | Drizzle migrations, Neon branch sync, migration catalog, ADR 0002. |
| `OFF-005` | Fullstack feature delivery sprint | A scoped feature is clear enough to build and review. | Jira-ready stories, implementation PRs, verification notes, and docs updates. | Current feature history, tests, route composition, change traceability template. |
| `OFF-006` | Analysis-to-delivery documentation setup | A product or project lacks clear requirements, decisions, and planning history. | Confluence-ready docs, Jira backlog, ADR seed, diagrams inventory, and traceability rules. | This `analysis/` suite, Confluence/Jira runbooks, diagram sources. |

## Offer Detail

### `OFF-001` Product System Audit

| Field | Guidance |
| --- | --- |
| Buyer signal | The buyer has a coherent product, workflow, or portfolio goal and needs the first delivery slice made explicit. |
| Included | Problem framing, stakeholder scan, requirement shortlist, risk register, and first delivery backlog. |
| Not included | Full rebuild, deep code rewrite, or long-term roadmap ownership without a follow-up agreement. |
| Success check | The buyer can point to the next slice, why it matters, and what evidence will prove it. |

### `OFF-002` CMS And Content Model Design Slice

| Field | Guidance |
| --- | --- |
| Buyer signal | Content has multiple types, languages, revisions, relationships, or publishing states. |
| Included | Entity model, content lifecycle, structural body approach, migration plan, and authoring implications. |
| Not included | Full editor UI unless it is scoped as a later implementation story. |
| Success check | Content can be represented without unsafe raw HTML or hard-coded page changes. |

### `OFF-003` Auth And Interaction Workflow Slice

| Field | Guidance |
| --- | --- |
| Buyer signal | Readers, clients, or operators need to sign in, submit, comment, or manage protected actions. |
| Included | Account scope decision, session flow, abuse controls, moderation implications, and test plan. |
| Not included | Generic social network features or account surfaces without a product reason. |
| Success check | The workflow has a clear user, data owner, validation path, and failure behavior. |

### `OFF-004` Database And Deployment Workflow Setup

| Field | Guidance |
| --- | --- |
| Buyer signal | Database changes are risky, preview environments are confusing, or deployment depends on manual memory. |
| Included | Migration workflow, environment split, preview database strategy, deployment checklist, and rollback notes. |
| Not included | Production incident response unless separately scoped. |
| Success check | Schema changes can be reviewed, applied, and verified without colliding with production data. |

### `OFF-005` Fullstack Feature Delivery Sprint

| Field | Guidance |
| --- | --- |
| Buyer signal | The buyer has a bounded feature with known users, data, and success criteria. |
| Included | Story refinement, implementation, tests or manual verification, docs updates, and review notes. |
| Not included | Unbounded product ownership or vague "make it better" work. |
| Success check | The feature ships as reviewable changes tied to requirement, story, and verification evidence. |

### `OFF-006` Analysis-To-Delivery Documentation Setup

| Field | Guidance |
| --- | --- |
| Buyer signal | A working project exists, but nobody can explain why it exists, what is next, or how decisions were made. |
| Included | Problem statement, requirements, Jira-ready stories, ADR seed, schema/API notes, and diagram inventory. |
| Not included | External tool administration unless Confluence, Jira, or FigJam access is available and scoped. |
| Success check | The project has a source-controlled analysis baseline that can move into planning tools. |

## Intake Routing

| Intake answer points to | Route to offer | Follow-up question |
| --- | --- | --- |
| Coherent goal with unclear first slice, proof path, or priority order | `OFF-001` | What would make the first slice obviously valuable? |
| Content complexity, localization, revisions, or publishing state | `OFF-002` | Which content type changes most often or breaks the current workflow? |
| Accounts, sessions, comments, forms, submissions, or moderation | `OFF-003` | What user action needs protection, validation, or abuse handling? |
| Migrations, preview databases, deployment fragility, or environment drift | `OFF-004` | What database or deployment action currently feels risky? |
| Clear feature request with users and acceptance criteria | `OFF-005` | What is the smallest version that proves the feature works? |
| Working product with missing requirements, ADRs, stories, or diagrams | `OFF-006` | Which decision or capability is hardest to explain today? |

## Public Page Implications

| Surface | Implication |
| --- | --- |
| Homepage | Add one service entry section that shows the offer ladder without overwhelming the first viewport. |
| Projects | Tag projects and posts by the service offers they prove. |
| Contact or intake | Let visitors choose an offer or describe the risky area that maps to an offer. |
| Blog | Publish build notes and decision notes that prove individual offer claims. |
| Analysis suite | Keep this catalog linked to requirements, Jira stories, and conversion planning. |

## Pricing Stance

Public pricing remains deferred. The first public version should describe offer shape and first output, then qualify
scope through intake.

| Pricing question | Default for now |
| --- | --- |
| Should fixed public package prices be shown? | No, not until offers repeat with enough lead feedback. |
| Should the first action mention scope? | Yes. Use "scoped slice" language so visitors expect bounded work. |
| Should pricing be discussed privately? | Yes, after the intake identifies offer, risk, scope, and expected output. |
| Should free discovery be promised? | No. Avoid open-ended unpaid analysis; keep the first conversation focused. |

## Requirement And Story Impact

| Artifact | Impact |
| --- | --- |
| `FR-017` | Service entry point should route visitors to one of the catalog offers or intake risk areas. |
| `FR-021` | Portfolio should describe service offers with audience, scope, outputs, proof, and boundaries. |
| `NFR-012` | Conversion claims should stay tied to implementation evidence and service proof. |
| `PF-701` | Service entry points should use this catalog as the source for offer labels and outcomes. |
| `PF-702` | Intake should use offer/risk routing questions from this catalog. |
| `PF-703` | Projects and posts should map proof content to offers. |
| `PF-705` | Catalog itself should remain maintained as a product/business artifact. |

## Open Decisions

| Decision | Default until answered |
| --- | --- |
| Which offer should be the homepage default? | `OFF-001` Product system audit or `OFF-005` Fullstack feature delivery sprint, depending on lead quality. |
| Should each offer get its own route? | Not yet; start with one service entry section and intake path. |
| Should public pricing be included? | No; revisit after repeated service conversations. |
| Should offers be translated before launch? | Yes for public offer labels and summaries; details can follow after copy stabilizes. |
