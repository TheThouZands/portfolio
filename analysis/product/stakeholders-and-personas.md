# Stakeholders And Personas

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

This document gives the portfolio analysis a clearer audience model. It turns the primary user groups from the problem
statement into stakeholders and personas that can guide requirements, content, conversion paths, and future Jira work.

The portfolio is still centered on the owner, but the product only works if visitors can understand the proof it offers.

## Stakeholder Map

| ID | Stakeholder | Interest | Success looks like |
| --- | --- | --- | --- |
| SH-001 | Portfolio owner | Sell and demonstrate fullstack services through a real product. | The portfolio explains capability, proof, process, and next action clearly. |
| SH-002 | Potential client | Evaluate whether Thouzands can build or improve a web system. | They can connect their problem to a service wedge and start a scoped conversation. |
| SH-003 | Technical reviewer | Inspect engineering judgment and implementation quality. | They can trace features to schema, tests, ADRs, commits, and architecture boundaries. |
| SH-004 | Content-heavy operator | Understand whether complex content can become manageable product data. | They can see CMS modeling, translations, revisions, media, and structured content. |
| SH-005 | Reader/commenter | Engage with technical writing and discussion. | They can sign in, comment, and trust that discussion has clear rules. |
| SH-006 | Future collaborator | Extend the project without guessing why it exists. | They can follow local docs, Jira-compatible stories, diagrams, and ADRs. |

## Personas

### PERS-001 - Founder With A Half-Shaped Product Idea

Needs:

- Translate a rough web idea into buildable slices.
- Understand whether the first version should be a tool, CMS, workflow, or content surface.
- Avoid spending money on a fragile one-off site.

Portfolio response:

- Positioning brief names durable fullstack systems.
- Conversion path offers a discovery/build slice.
- Analysis suite proves planning can stay connected to implementation.

Content that should convince them:

- Plain-language service entry points.
- Projects framed by problem, approach, result.
- A concise contact/intake path.

### PERS-002 - Technical Lead Reviewing Delivery Judgment

Needs:

- Judge whether the owner can make maintainable architecture choices.
- See evidence beyond UI polish.
- Understand how the system changes safely.

Portfolio response:

- ADRs document technical decisions.
- Schema and migration notes explain database evolution.
- Tests and traceability connect behavior to implementation.

Content that should convince them:

- Technical traceability.
- ADR index.
- Migration timeline.
- Structural content and auth diagrams.

### PERS-003 - Content Operator With Growing Complexity

Needs:

- Manage content that no longer fits static pages.
- Support translations, media, revisions, and relationships.
- Keep content reusable across pages and contexts.

Portfolio response:

- CMS schema demonstrates structured content, translations, revisions, media, and mentions.
- Content strategy explains how portfolio content should become product evidence.
- Diagram PF-DIAG-002 summarizes the content model.

Content that should convince them:

- CMS/content model explanation.
- Project and blog examples that show relationships.
- Structural content rendering contract.

### PERS-004 - Hiring Or Contract Reviewer

Needs:

- Quickly understand capability and maturity.
- Evaluate professional experience and technical breadth.
- See whether the owner can work across frontend, backend, database, and product reasoning.

Portfolio response:

- Homepage gives the fast identity and values.
- Experience, skills, projects, and posts provide different proof surfaces.
- Commit-backed analysis shows process maturity.

Content that should convince them:

- Experience detail pages.
- Skill relationships.
- Featured projects.
- Blog posts explaining decisions.

### PERS-005 - Authenticated Technical Reader

Needs:

- Read technical writing.
- Comment or ask questions without friction.
- Understand how account-backed discussion is handled.

Portfolio response:

- Auth flow supports reader identity.
- Comments support account-backed interaction.
- Interaction policy defines moderation and preservation principles.

Content that should convince them:

- Blog posts.
- Clear comment UI states.
- Trust and safety language.

## Persona To Requirement Map

| Persona | Most relevant requirements |
| --- | --- |
| PERS-001 | `FR-001`, `FR-006`, `FR-017`, `NFR-012` |
| PERS-002 | `FR-003`, `FR-008`, `FR-015`, `NFR-001`, `NFR-002`, `NFR-008` |
| PERS-003 | `FR-003`, `FR-008`, `FR-009`, `NFR-006` |
| PERS-004 | `FR-001`, `FR-004`, `FR-005`, `FR-006`, `FR-007` |
| PERS-005 | `FR-010`, `FR-011`, `FR-013`, `FR-014`, `FR-018`, `NFR-011` |

## Product Implications

| Implication | Why it matters |
| --- | --- |
| Homepage copy should not only say "fullstack"; it should point to durable systems and tools. | PERS-001 needs a service promise, not a role label. |
| Projects should show problem, approach, result, and technical evidence. | PERS-001, PERS-002, and PERS-004 need different proof from the same content. |
| Technical docs should stay close to code. | PERS-002 and PERS-006 need trustworthy implementation evidence. |
| Content model diagrams should be understandable without reading schema code. | PERS-003 needs product-level clarity. |
| Comments need moderation and deletion rules before wider use. | PERS-005 needs trust and safety. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| Which persona should the homepage optimize for first? | PERS-001, with proof paths for PERS-002 and PERS-004. |
| Should technical readers be encouraged to comment or only read? | Encourage comments cautiously after moderation basics exist. |
| Should content-heavy operators get a dedicated service page? | Not yet; connect CMS proof through projects and posts first. |

