# Confluence Publishing Runbook

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

This runbook describes how to copy or import local analysis docs into Confluence without losing source traceability. It
does not make Confluence the source of truth for technical artifacts; it makes Confluence the readable product/business
home.

## Publishing Metadata

Every Confluence page copied from this repository should include this metadata block near the top:

| Field | Value |
| --- | --- |
| Status | Draft, Accepted, Active, Deferred, or Archived |
| Owner | Thouzands |
| Source file | Local path such as `analysis/product/problem-statement.md` |
| Source commit | Git commit hash used for the copy |
| Last local update | Date from the source file |
| External links | Related Jira issues, FigJam sections, GitHub files, or ADRs |

Use `analysis/confluence/page-manifest.csv` as the page creation checklist and URL tracking sheet. The mapping table
below is the first publishing batch, not the full page inventory.

## Publishing Steps

1. Confirm the local source file is committed.
2. Copy the source file path and commit hash.
3. Create or update the matching Confluence page from `analysis/confluence/page-tree.md`.
4. Add the metadata block.
5. Copy the Markdown content and adjust formatting only where Confluence requires it.
6. Add links to related Jira issues, FigJam sections, and GitHub technical references.
7. Record the publication in `analysis/confluence/page-manifest.csv` and the batch mapping table below when relevant.
8. If Confluence edits change meaning, update the local source file in a follow-up commit.

## Page Mapping

| Confluence page | Local source | Source commit | Confluence URL | Last published | Notes |
| --- | --- | --- | --- | --- | --- |
| Portfolio Analysis Home | `analysis/README.md` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/655361/Portfolio+Analysis+Home | 2026-06-29 | Root analysis page under existing Portfolio Home. |
| Product Analysis | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/98317/Product+Analysis | 2026-06-29 | Starter container page. |
| Planning | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/688129/Planning | 2026-06-29 | Starter container page. |
| Jira Backlog | `analysis/jira/import-history.md` | `3bac758` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/720897/Jira+Backlog | 2026-06-29 | Starter container page; Jira epics `KAN-1` through `KAN-7` and stories `KAN-8` through `KAN-50` are mapped, with implemented created stories marked `Done`, current-worktree stories marked `In Progress`, and planned created stories left `To Do`. |
| Diagrams | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/163842/Diagrams | 2026-06-29 | Starter container page; FigJam pending. |
| Technical Reference | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/557058/Technical+Reference | 2026-06-29 | Starter container page. |
| Operations | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/622594/Operations | 2026-06-29 | Starter container page. |
| Problem Statement | `analysis/product/problem-statement.md` | Pending | Pending | Pending | Product baseline. |
| Stakeholders And Personas | `analysis/product/stakeholders-and-personas.md` | Pending | Pending | Pending | Audience model. |
| Scope And Requirements | `analysis/product/scope-and-requirements.md` | Pending | Pending | Pending | Requirement ids must stay stable. |
| Positioning Brief | `analysis/product/positioning-brief.md` | Pending | Pending | Pending | Service position and proof strategy. |
| Service Offer Catalog | `analysis/product/service-offer-catalog.md` | Pending | Pending | Pending | Offer fit, outputs, proof, and pricing stance. |
| Content Strategy | `analysis/product/content-strategy.md` | Pending | Pending | Pending | Content pillars and publication workflow. |
| Conversion Path Brief | `analysis/product/conversion-path.md` | Pending | Pending | Pending | Visitor journey and intake path. |
| Roadmap | `analysis/planning/roadmap.md` | Pending | Pending | Pending | Stage map. |
| Risk Register | `analysis/planning/risk-register.md` | Pending | Pending | Pending | Review before implementation slices. |
| Validation Strategy | `analysis/planning/validation-strategy.md` | Pending | Pending | Pending | Done/verification expectations. |

## Formatting Notes

- Keep ids such as `FR-017`, `PF-701`, `ADR 0006`, and `PF-DIAG-001` unchanged.
- Keep status labels visible.
- Prefer Confluence tables for mapping pages, requirements, risks, and stories.
- Link ADRs and schema docs to GitHub source rather than duplicating them as editable Confluence authority.
- Keep Mermaid source in Git and use generated FigJam diagrams as the visual copy; Confluence can embed or link the finished visual.

## Update Triggers

| Trigger | Action |
| --- | --- |
| Local product doc changes | Update the matching Confluence page and source commit metadata. |
| Jira import completes | Add Jira issue links to story and requirement pages. |
| FigJam diagram created | Add the FigJam section URL to relevant pages. |
| ADR accepted | Summarize in Confluence and link to GitHub ADR. |
| Schema meaning changes | Update schema summary page and link to migration/ADR evidence. |
