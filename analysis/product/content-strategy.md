# Content Strategy

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

This document explains what the portfolio should publish and why. It connects the service positioning to the current CMS
model: experience, skills, projects, blog posts, media, structural content, translations, and mentions.

## Strategy Summary

Use content as product evidence. Each page should help a visitor answer one of three questions:

- What can Thouzands build?
- What proof exists that the work is real?
- How does the work stay maintainable after the first version ships?

## Content Pillars

| Pillar | Purpose | Primary surfaces |
| --- | --- | --- |
| Service proof | Show what kind of fullstack systems can be delivered. | Projects, homepage, featured projects. |
| Professional credibility | Show background, responsibilities, and progression. | Experience pages, skills, related jobs. |
| Technical reasoning | Show how decisions are made and tradeoffs are handled. | Blog posts, ADRs, architecture notes. |
| Product process | Show analysis, planning, and delivery discipline. | Analysis suite, roadmap, Jira stories, diagrams. |
| Interaction evidence | Show account-backed workflows and community-ready behavior. | Auth flow, comments, future moderation docs. |

## Homepage Content Role

The homepage should be a fast proof path:

| Section | Job |
| --- | --- |
| Hero | State identity and values: systems, stability, maintainability, accessibility, efficiency, tools. |
| Intro | Explain the service promise in plain language. |
| Skills | Give scan-friendly capability labels. |
| Experience | Show professional credibility and chronology. |
| Featured projects | Prove concrete implementation depth. |
| Featured posts | Prove technical reasoning and product thinking. |
| Future call to action | Convert interest into a scoped conversation or delivery slice. |

## Project Content Template

Each project should eventually answer:

| Field | Guidance |
| --- | --- |
| Title | Name the system or outcome, not only the technology. |
| Short description | One sentence explaining the user/business problem. |
| Overview | Explain context, constraints, approach, and result. |
| Highlights | Use bullets for scannable proof: data model, workflow, security, performance, UX, operations. |
| Skills | Link to reusable skills so the project supports capability browsing. |
| Structural content body | Use narrative sections: problem, constraints, architecture, implementation, results, follow-ups. |
| Media | Prefer screenshots, diagrams, or artifacts that prove the system exists. |

## Experience Content Template

Each experience entry should eventually answer:

| Field | Guidance |
| --- | --- |
| Position title | Use recognizable role language. |
| Company context | Explain what the organization or project environment was. |
| Role summary | State the actual responsibility and scope. |
| Bullets | Separate responsibilities, achievements, and highlights. |
| Skills | Connect experience to capability evidence. |
| Media | Use logos, screenshots, or diagrams only when they clarify the work. |
| Dates/location | Keep chronology accurate and timezone-safe. |

## Skill Content Template

Each skill should eventually answer:

| Field | Guidance |
| --- | --- |
| Name | Use the practical capability name visitors recognize. |
| Category | Group skills by product layer or delivery concern. |
| Description | Explain how the skill is used in delivery, not just what it is. |
| Related jobs | Show where the skill was used professionally. |
| Related projects | Show concrete output or proof. |
| Related posts | Show reasoning, tradeoffs, or lessons learned. |

## Blog Content Strategy

The blog should not be a loose journal. It should explain technical and product choices that support the service
positioning.

| Post type | Purpose | Example topic from current product |
| --- | --- | --- |
| Build note | Explain how a feature was shaped and implemented. | Account-backed blog comments. |
| Architecture note | Explain boundaries and tradeoffs. | Route, partial, repeatable, CMS, and DB layering. |
| Data model note | Explain schema choices. | Content entities, translations, revisions, mentions. |
| Security note | Explain protection choices. | Auth validation, rate limiting, safe structural rendering. |
| Operations note | Explain deployment and maintenance. | Drizzle migrations and Neon branch sync. |
| Decision note | Explain why a product/content decision exists. | Keeping planning and delivery reasoning visible. |

## Translation Strategy

The product already supports English and Spanish copy. Public content should treat both as first-class, but not every
draft must be translated immediately.

| Rule | Reason |
| --- | --- |
| Keep core navigation and homepage copy bilingual. | First impression should work in both supported locales. |
| Translate published portfolio proof content. | Projects and experience are core business evidence. |
| Allow technical drafts to start in one language. | Deep posts can be translated after the shape stabilizes. |
| Preserve localized slugs. | Current schema and route behavior support language-specific discovery. |

## Mention And Relationship Strategy

The CMS can link blog revisions to content entities. Use that intentionally:

| Relationship | Use |
| --- | --- |
| Blog post mentions project | Show how a technical article relates to a case study. |
| Blog post mentions experience | Connect lessons to professional context. |
| Project uses skills | Make capability browsing evidence-based. |
| Experience uses skills | Show that skill labels are grounded in real work. |
| Blog post uses assets | Keep visual proof attached to the revision that needs it. |

## Publication Workflow

1. Choose the content pillar and target audience.
2. Draft the content in local notes or CMS seed shape.
3. Identify related requirements, stories, ADRs, or code paths.
4. Add or update structured CMS records.
5. Verify localized route behavior and metadata.
6. Add media or diagrams only when they prove something specific.
7. Publish or mark as testing/draft according to content readiness.
8. Link related projects, skills, experience, or blog posts through content entities.

## Current Content Gaps

| Gap | Why it matters | Candidate next artifact |
| --- | --- | --- |
| No public service offer surface yet | Visitors may understand capability but not how to start working together. | `product/service-offer-catalog.md` and `product/conversion-path.md` baselines drafted |
| Demo project/content may not fully represent real service work | Synthetic data proves structure but not business credibility. | Real project case-study backlog |
| Blog comments lack moderation policy | Interaction evidence needs trust rules. | `product/interaction-policy.md` baseline drafted |
| No diagram outputs yet | Visual explanation still depends on text docs. | First FigJam diagrams |
| No public contact/conversion requirement | Business outcome is not fully represented in current implementation. | `FR-017`, `PF-701` to `PF-704` |

## Content Quality Checklist

Before publishing a project, experience entry, skill, or post:

- It supports at least one service wedge from the positioning brief.
- It has a clear audience.
- It includes concrete proof rather than only claims.
- It links to related skills, projects, experience, posts, or technical docs where useful.
- It distinguishes implemented behavior from planned follow-up.
- It has localized copy if it is core portfolio content.
- It has a maintenance trigger if the underlying implementation changes.
