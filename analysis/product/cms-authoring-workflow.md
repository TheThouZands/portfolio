# CMS Authoring Workflow

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira

## Purpose

The current portfolio has a CMS-like database and renderer, but it does not yet have a public authoring interface. This
document defines the authoring workflow before implementation so future CMS work can be planned deliberately instead of
adding isolated admin forms.

## Current State

| Area | Current support |
| --- | --- |
| Content storage | PostgreSQL tables for companies, experience, skills, projects, blog posts, media, translations, revisions, mentions, and comments. |
| Content rendering | Public routes and components render CMS-backed content. |
| Rich content | Structural content JSON supports versioned blog/project bodies. |
| Local content creation | Seed scripts can create repeatable demo content. |
| Content lifecycle | `status_cms` supports published, hidden, draft, and testing. |
| Authoring UI | Not implemented. |

## Authoring Goals

| Goal | Why it matters |
| --- | --- |
| Keep portfolio content editable without code changes for every update. | The owner should not need a deployment for every content adjustment. |
| Preserve structured content rather than flattening it into raw HTML. | Keeps the core CMS decision intact. |
| Support bilingual content deliberately. | The public site already supports English and Spanish. |
| Make revisions reviewable before publication. | Case studies and posts should not accidentally publish broken structure. |
| Keep the first authoring surface owner-only. | Multi-author permissions are not yet justified. |

## First Workflow

| Step | Description |
| --- | --- |
| 1. Create draft | Owner creates or imports a draft record for project, post, experience, or skill content. |
| 2. Edit structured fields | Owner edits metadata, localized copy, relationships, and status. |
| 3. Edit body source | Owner edits structural content source through a constrained editor or source-aware form. |
| 4. Preview | Owner previews rendered output in the target locale. |
| 5. Validate | System checks required fields, safe structural content, linked assets, slugs, and current revision rules. |
| 6. Publish | Owner changes status to published or testing after preview. |
| 7. Audit | Revision, timestamps, and related entities remain traceable. |

## Content Types

| Content type | First authoring priority | Notes |
| --- | --- | --- |
| Blog posts | High | Posts prove technical reasoning and comments attach here. |
| Projects | High | Projects are core service proof and need rich case-study structure. |
| Skills | Medium | Skills should stay concise and connected to projects/experience. |
| Experience | Medium | Experience is less frequently edited but business-critical. |
| Media assets | Medium | Media needs upload/reconciliation decisions before a full editor. |
| Companies | Low | Usually supporting data for experience entries. |

## Workflow Boundaries

| Boundary | Decision for first version |
| --- | --- |
| Roles | Owner-only. |
| Approval | Self-review through preview and validation. |
| Multi-user editorial workflow | Deferred. |
| Public user-generated content authoring | Not part of CMS authoring; comments remain separate. |
| Rich-text editor | Needs a separate build decision; structural source contract must remain authoritative. |
| Media upload | Should be designed with storage lifecycle and alt text requirements. |

## Data Model Implications

Future CMS authoring may need:

- Author/editor user id fields.
- Draft revision metadata.
- Preview tokens or private preview routes.
- Media upload state and cleanup workflow.
- Validation error persistence or preview diagnostics.
- Slug collision handling per locale.

Do not add these fields one by one without a migration plan.

## Requirements Impact

| Requirement | Status |
| --- | --- |
| `FR-003` CMS portfolio content is stored in PostgreSQL | Implemented. |
| `FR-008` rich bodies use structural content | Implemented. |
| `FR-019` owner can author and preview CMS content through a managed workflow | Planned. |
| `NFR-014` authoring workflow preserves structured content safety and localization | Planned. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-205` | Define CMS authoring workflow before editor implementation. |
| `PF-206` | Design owner-only draft, preview, and publish flow. |
| `PF-207` | Define media asset lifecycle for authoring. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should authoring start as an admin route or local tooling? | Admin route only after auth/session work stabilizes. |
| Should the editor be visual, form-based, or source-oriented? | Source-aware constrained editor until richer needs are proven. |
| Should CMS records track author/editor ids? | Yes, if an admin surface is built. |
| Should preview be public behind unguessable token or authenticated only? | Authenticated only for first version. |

