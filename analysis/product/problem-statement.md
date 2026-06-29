# Problem Statement

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Background

The portfolio began as implementation-first work. Features were added in short bursts on a single feature branch, and
the product became coherent through iteration rather than through an upfront analysis phase.

This document reconstructs that missing analysis from the current product. It should not pretend every choice was known
in advance. Instead, it explains the strongest product logic visible in the existing code, data model, migrations, tests,
and commit history.

## Core Problem

Independent technical services are hard to evaluate from a static portfolio. A visitor can see claims, but cannot easily
judge whether the person can design durable fullstack systems, handle content complexity, operate a database-backed app,
think about security, or ship maintainable user-facing workflows.

The portfolio therefore needs to do more than display biographical content. It needs to act as live evidence of the
services offered.

## Product Thesis

Build a portfolio that behaves like a compact production product:

- It presents professional evidence through experience, skills, projects, and writing.
- It uses a real CMS-style content model instead of hard-coded pages.
- It demonstrates system design decisions through migrations, auth, tests, and architecture boundaries.
- It supports future product growth, including richer diagrams, Confluence documentation, Jira planning, and formal API contracts.

## Primary User Groups

| User group | Need | Product response |
| --- | --- | --- |
| Potential client or employer | Quickly understand capability, depth, and relevance. | Public portfolio pages, projects, experience, skill relationships, and blog content. |
| Technical reviewer | Inspect engineering judgment and system quality. | GitHub-visible architecture, schema, migrations, tests, and ADRs. |
| Portfolio owner | Keep content accurate without treating every update as a page rewrite. | CMS-backed entities, localized content, revisions, and seed data. |
| Returning reader | Engage with technical writing and discussion. | Blog post routes, comments, authenticated commenting, and preserved discussion history. |
| Future collaborator | Understand why the system exists and how to extend it. | Analysis suite, architecture notes, requirements, Jira-compatible backlog, and ADRs. |

## Goals

| Goal id | Goal | Current evidence |
| --- | --- | --- |
| G-001 | Present a credible fullstack portfolio with live implementation evidence. | Next.js app, CMS schema, project/experience/skill/blog routes, Vercel-oriented build flow. |
| G-002 | Treat content as structured product data, not loose page copy. | Drizzle schema for content entities, translations, revisions, media, mentions, and status. |
| G-003 | Support multilingual discovery and canonical route behavior. | `next-intl` migration, localized page tree, translated slugs, canonical blog redirects. |
| G-004 | Add account-backed interaction without making the whole site private. | Better Auth integration, custom identifier flow, sessions, blog comments. |
| G-005 | Make changes auditable through migrations, tests, and local architecture notes. | Drizzle migration history, unit tests, architecture docs, CI workflow. |
| G-006 | Create planning artifacts that can move into Confluence, Jira, Figma/FigJam, and GitHub. | This analysis suite. |

## Non-Goals

| Non-goal id | Non-goal | Rationale |
| --- | --- | --- |
| NG-001 | Replace the existing app with a generated static portfolio. | The product value comes from real fullstack behavior. |
| NG-002 | Build a full public CMS admin interface immediately. | The current system can use seed scripts and database workflows while admin needs are clarified. |
| NG-003 | Treat every historical commit as a perfect planned requirement. | The analysis is retrospective and should keep uncertainty visible. |
| NG-004 | Lock the product into one planning tool. | Local Markdown should remain portable to Confluence, Jira, Figma/FigJam, and GitHub. |

## Success Signals

| Signal | Why it matters |
| --- | --- |
| A reviewer can explain the product purpose after reading the analysis index and problem statement. | Confirms the project is no longer aimless. |
| Each major feature has a requirement and user story with implementation evidence. | Makes the past work traceable. |
| Future work can be expressed as smaller Jira stories instead of broad feature impulses. | Keeps planning practical. |
| ADRs describe current and future technical choices in the same repo as implementation. | Keeps architecture memory near code. |
| Schema and migration docs explain how data evolved. | Makes database work easier to review and operate. |

## Constraints

- The source of truth is the already-built app and commit history.
- The initial tool setup is local; Confluence, Jira, and Figma/FigJam references must be portable.
- GitHub-facing technical artifacts should stay small enough for focused commits.
- Existing uncommitted application changes should not be disturbed while analysis docs are created.
- Any future import into Jira or Confluence should preserve stable ids from these files.

## Open Questions

| Question | Why it matters | Suggested next artifact |
| --- | --- | --- |
| Which services should the portfolio optimize for selling first? | Affects homepage hierarchy and project storytelling. | Positioning brief |
| Should comments remain generally available or become invitation/client scoped? | Affects auth, moderation, and abuse controls. | Interaction policy |
| What diagrams belong in FigJam versus GitHub Mermaid? | Affects how architecture and flow diagrams are maintained. | Diagram inventory |
| What public APIs, if any, should be formalized beyond current route handlers? | Affects OpenAPI scope and API stability promises. | API contract decision |

