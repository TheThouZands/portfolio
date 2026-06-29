# ADR 0001: Adopt Analysis Suite As Planning Source

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

The portfolio needs a durable planning source that explains the problem, business goal, users, requirements, stories,
technical decisions, schema, and future planning flow before implementation work is treated as complete.

The owner also expects to use Confluence, Jira, Figma/FigJam, and GitHub. The repository needs to remain the stable
source for analysis ids, technical decisions, schema/API notes, and external tool mappings while readable copies and
execution state move into those tools.

## Decision

Keep the analysis suite in the repository under `analysis/` as the planning source for the portfolio.

Use local Markdown and CSV files because they are:

- Easy to review in small Git changes.
- Portable into Confluence and Jira later.
- Close to verification evidence such as schema, tests, migrations, and commits.
- Suitable for ADRs and technical inventories that should remain versioned with the codebase.

## Consequences

Positive:

- The project gains a product planning source without waiting for external tool setup.
- Requirements and user stories can link directly to implementation evidence and code paths.
- Future work can start from stable ids instead of broad feature impulses.
- GitHub remains the source of truth for ADRs, schema notes, and API contract planning.

Tradeoffs:

- Some artifacts will later be duplicated or synchronized into Confluence/Jira.
- Planning artifacts can overfit to implementation convenience if assumptions are not labeled.
- Diagrams still need a separate decision about Figma/FigJam versus repository-native formats.

## Verification References

- Architecture notes: `ARCHITECTURE.md`, `src/app/app.md`, `src/auth/auth.md`, `src/cms/cms.md`, `src/db/db.md`.
- Schema and migrations: `src/db/schema.ts`, `drizzle/`.
- Tests: `tests/auth`, `tests/blog`, `tests/structural-content`.
- Delivery traceability: CMS, i18n, auth, comments, security, operations, and documentation clusters.

## Follow-Ups

- Create ADRs for database workflow, structural content, auth identity separation, and comment preservation.
- Create Confluence page tree and Jira project setup docs.
- Decide which diagrams belong in Figma/FigJam.
- Decide whether an OpenAPI spec is warranted.
