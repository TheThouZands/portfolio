# Problem Statement

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Background

The portfolio is planned as a service product, not only as a personal website. It needs a clear problem definition,
audience model, requirement set, and delivery path before individual features are treated as complete.

This document defines the product logic that guides the portfolio: what problem it solves, which proof surfaces matter,
and how implementation evidence should support the service story.

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

Detailed stakeholder and persona analysis lives in [stakeholders-and-personas.md](stakeholders-and-personas.md).

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
| NG-002 | Build a full public CMS admin interface immediately. | Owner-managed authoring can use seed scripts and database workflows while admin needs are clarified. |
| NG-003 | Treat every implementation detail as a product requirement. | Requirements should stay outcome-led and use implementation details as evidence, not as automatic scope. |
| NG-004 | Lock the product into one planning tool. | Local Markdown should remain portable to Confluence, Jira, Figma/FigJam, and GitHub. |

## Success Signals

| Signal | Why it matters |
| --- | --- |
| A reviewer can explain the product purpose after reading the analysis index and problem statement. | Confirms the product direction is clear. |
| Each major feature has a requirement and user story with implementation evidence. | Makes delivery traceable. |
| Future work can be expressed as smaller Jira stories instead of broad feature impulses. | Keeps planning practical. |
| ADRs describe current and future technical choices in the same repo as implementation. | Keeps architecture memory near code. |
| Schema and migration docs explain how data evolved. | Makes database work easier to review and operate. |

## Constraints

- The analysis suite is the planning source; implementation evidence and commit history verify delivery.
- The initial tool setup is local; Confluence, Jira, and Figma/FigJam references must be portable.
- GitHub-facing technical artifacts should stay small enough for focused commits.
- Active implementation work should not bypass analysis, traceability, or validation updates.
- Any future import into Jira or Confluence should preserve stable ids from these files.

## Open Questions

| Question | Why it matters | Suggested next artifact |
| --- | --- | --- |
| Which services should the portfolio optimize for selling first? | Affects homepage hierarchy and project storytelling. | `product/positioning-brief.md` baseline drafted |
| Should comments remain generally available or become invitation/client scoped? | Affects auth, moderation, and abuse controls. | `product/interaction-policy.md` baseline drafted |
| What diagrams belong in FigJam versus GitHub Mermaid? | Affects how architecture and flow diagrams are maintained. | Diagram inventory |
| What public APIs, if any, should be formalized beyond current route handlers? | Affects OpenAPI scope and API stability promises. | API contract decision |
