# ADR 0001: Record Retrospective Analysis Suite In The Repository

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

The portfolio was built implementation-first. The result is coherent enough to continue, but the product and planning
intent is scattered across code, commits, migrations, and small local notes.

The project now needs an analysis layer that can explain the problem, business goal, users, requirements, stories,
technical decisions, schema, and future planning flow. The owner also expects to use Confluence, Jira, Figma/FigJam, and
GitHub, but tool setup is not complete yet.

## Decision

Keep the first analysis suite in the repository under `analysis/`.

Use local Markdown and CSV files because they are:

- Easy to review in small Git changes.
- Portable into Confluence and Jira later.
- Close to implementation evidence such as schema, tests, migrations, and commits.
- Suitable for ADRs and technical inventories that should remain versioned with the codebase.

## Consequences

Positive:

- The project gains a product memory without waiting for external tool setup.
- Requirements and user stories can link directly to existing commits and code paths.
- Future work can start from stable ids instead of broad feature impulses.
- GitHub remains the source of truth for ADRs, schema notes, and API contract planning.

Tradeoffs:

- Some artifacts will later be duplicated or synchronized into Confluence/Jira.
- Retrospective analysis can overfit to what was already built if assumptions are not labeled.
- Diagrams still need a separate decision about Figma/FigJam versus repository-native formats.

## Evidence

- Existing architecture notes: `ARCHITECTURE.md`, `src/app/app.md`, `src/auth/auth.md`, `src/cms/cms.md`, `src/db/db.md`.
- Existing schema and migrations: `src/db/schema.ts`, `drizzle/`.
- Existing tests: `tests/auth`, `tests/blog`, `tests/structural-content`.
- Existing commit history: CMS, i18n, auth, comments, security, operations, and documentation clusters.

## Follow-Ups

- Create ADRs for database workflow, structural content, auth identity separation, and comment preservation.
- Create Confluence page tree and Jira project setup docs.
- Decide which diagrams belong in Figma/FigJam.
- Decide whether an OpenAPI spec is warranted.

