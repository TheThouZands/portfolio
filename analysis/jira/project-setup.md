# Jira Project Setup

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Jira/Confluence

## Purpose

This document defines a Jira setup that can receive the local backlog without losing the retrospective analysis context.
It is designed for a small portfolio product with one owner today and possible collaborators later.

## Project Proposal

| Setting | Proposed value | Notes |
| --- | --- | --- |
| Project name | Portfolio Product Delivery | Matches the Confluence space. |
| Project key | `PF` | Aligns with local story ids such as `PF-101`. |
| Template | Kanban or Scrum | Kanban is simpler for ongoing portfolio work; Scrum works if planned sprint delivery becomes useful. |
| Lead | Thouzands | Single owner until collaborators exist. |
| Category | Personal product / portfolio | Keeps it separate from client delivery projects. |

## Issue Types

| Issue type | Use for | Local source |
| --- | --- | --- |
| Epic | Major capability or workstream, such as authenticated interaction or CMS authoring. | Epic sections in `analysis/jira/user-stories.md`. |
| Story | User-visible or owner-visible behavior with acceptance criteria. | `analysis/jira/backlog.csv`. |
| Task | Tool setup, documentation conversion, migration inventory, and operational chores. | Planning docs and ADR follow-ups. |
| Spike | Time-boxed research where the desired implementation is not clear yet. | Open questions and decision points. |
| Bug | Regressions found after implementation. | GitHub issues, tests, or manual checks. |

## Components

| Component | Scope |
| --- | --- |
| `portfolio-ui` | Homepage, public pages, routing, page composition, and presentational components. |
| `cms-content` | CMS entities, content queries, structural content, revisions, and seed data. |
| `auth-session` | Better Auth, custom identity flow, sessions, validation, and rate limiting. |
| `blog-comments` | Blog routes, comments, comment rendering, and future moderation. |
| `database-ops` | Drizzle schema, migrations, Neon branches, seed scripts, and cleanup jobs. |
| `analysis-docs` | Confluence, Jira, FigJam, ADRs, requirements, and traceability. |
| `quality-security` | Tests, CI, headers, abuse controls, and review gates. |

## Labels

Keep the labels from `analysis/jira/README.md` as the starter set:

| Label | When to use |
| --- | --- |
| `portfolio` | Public portfolio experience and visitor-facing surfaces. |
| `cms` | Content model, content rendering, and CMS coordination. |
| `i18n` | Locale routing, translated slugs, and localized content. |
| `auth` | Identity, login, signup, logout, and session behavior. |
| `blog` | Blog publishing, comments, and related content. |
| `db` | Schema, migrations, data integrity, seed data. |
| `security` | Validation, rate limits, headers, and abuse controls. |
| `docs` | Analysis suite, architecture notes, ADRs, and planning artifacts. |
| `ops` | Deployment, Neon, CI, cleanup jobs, and environment workflows. |

## Workflow

| Status | Meaning |
| --- | --- |
| Backlog | Captured but not ready for implementation. |
| Ready | Refined enough to start without extra product decisions. |
| In Progress | Actively being implemented or documented. |
| In Review | Awaiting code/doc review or self-review checkpoint. |
| Done | Implemented, verified, and traceability updated. |
| Deferred | Useful but intentionally postponed. |

## Field Mapping For CSV Import

| CSV column | Jira field | Notes |
| --- | --- | --- |
| Issue Type | Issue Type | `Story` for all current backlog rows. |
| Summary | Summary | Includes local story id in the summary until Jira issue keys exist. |
| Description | Description | Preserve the user story sentence. |
| Priority | Priority | High, Medium, Low. |
| Labels | Labels | Comma-separated labels. |
| Epic Name | Epic Link or Parent | May require importing epics first depending on Jira configuration. |
| Acceptance Criteria | Description or custom field | If no custom field exists, append under a heading in Description. |
| Evidence Commits | Description or custom field | Keep commit hashes for traceability. |
| Status | Status | Map implemented stories to Done only after confirming Jira allows historical Done imports. |

## Import Order

1. Create the Jira project with key `PF`.
2. Create epics from the epic headings in `analysis/jira/user-stories.md`.
3. Import `analysis/jira/backlog.csv`.
4. Map each story to its epic.
5. Confirm labels, components, and priorities.
6. For implemented stories, add evidence commits to the description or linked development panel.
7. Record import date and Jira issue key mapping in an import history page.

The local import history source is `analysis/jira/import-history.md`.

## Import Caution

If Jira cannot map "Epic Name" during CSV import, import stories without parent links, then bulk edit their parents
after creating epics. Do not change local story ids to match Jira keys; keep local ids as stable planning references.

## Definition Of Ready

A new story is ready when it has:

- A stable local id.
- A user or owner need.
- Acceptance criteria that can be checked.
- A component and labels.
- A known source document or decision link.
- A verification expectation.

## Definition Of Done

A story is done when:

- The implementation or documentation exists.
- Acceptance criteria have been verified.
- Relevant docs, requirements, or ADRs were updated.
- Tests or manual checks match the risk level.
- The Jira issue links to GitHub commits or PRs where possible.

## First Admin Tasks

| Task | Target issue type | Priority |
| --- | --- | --- |
| Create Jira project `PF` | Task | High |
| Create epics from local backlog | Task | High |
| Import starter story CSV | Task | High |
| Add components and labels | Task | Medium |
| Create import history page | Task | Medium |
| Decide whether implemented retrospective stories should import as Done or Backlog | Spike | Medium |
