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
| Portfolio Analysis Home | `analysis/README.md` | `ef75d4f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/655361/Portfolio+Analysis+Home | 2026-06-29 | Root analysis page under existing Portfolio Home; source-first framing synced. |
| Product Analysis | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/98317/Product+Analysis | 2026-06-29 | Starter container page. |
| Planning | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/688129/Planning | 2026-06-29 | Starter container page. |
| Jira Backlog | `analysis/jira/import-history.md` | `ef75d4f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/720897/Jira+Backlog | 2026-06-29 | Starter container page; Jira epics `KAN-1` through `KAN-7` and stories `KAN-8` through `KAN-55` are mapped, with implemented created stories marked `Done`, current-worktree stories marked `In Progress`, planned created stories left `To Do`, and no pending story batches. KAN-38 summary and description are synced to source-controlled analysis wording. |
| Diagrams | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/163842/Diagrams | 2026-06-29 | Starter container page; first FigJam board exists at https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW. |
| Technical Reference | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/557058/Technical+Reference | 2026-06-29 | Starter container page. |
| Operations | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/622594/Operations | 2026-06-29 | Starter container page. |
| Problem Statement | `analysis/product/problem-statement.md` | `b1138ea` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1376257/Problem+Statement | 2026-06-29 | Product baseline; portfolio showcase premise synced. |
| Stakeholders And Personas | `analysis/product/stakeholders-and-personas.md` | `b1138ea` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1179650/Stakeholders+And+Personas | 2026-06-29 | Audience model; PERS-001 reflects proof-driven portfolio showcase. |
| Scope And Requirements | `analysis/product/scope-and-requirements.md` | `4ced0fc` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1343502/Scope+And+Requirements | 2026-06-29 | Requirement ids must stay stable. |
| Positioning Brief | `analysis/product/positioning-brief.md` | `b1138ea` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1409025/Positioning+Brief | 2026-06-29 | Service position and proof strategy; coherent product-direction wording synced. |
| Service Offer Catalog | `analysis/product/service-offer-catalog.md` | `706beee` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1212428/Service+Offer+Catalog | 2026-06-29 | Offer fit, outputs, proof, and pricing stance; service audit fit refined. |
| Content Strategy | `analysis/product/content-strategy.md` | Pending | Pending | Pending | Content pillars and publication workflow. |
| Conversion Path Brief | `analysis/product/conversion-path.md` | `b1138ea` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1441793/Conversion+Path+Brief | 2026-06-29 | Visitor journey and intake path; coherent entry-offer wording synced. |
| Roadmap | `analysis/planning/roadmap.md` | `ef75d4f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/884745/Roadmap | 2026-06-29 | Stage map; product-baseline framing synced. |
| Tool Setup Plan | `analysis/planning/tool-setup-plan.md` | `983ab1c` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1507329/Tool+Setup+Plan | 2026-06-29 | External tool sequence and source-of-truth rules. |
| External Setup Execution Runbook | `analysis/planning/external-setup-execution-runbook.md` | `28ce467` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1277980/External+Setup+Execution+Runbook | 2026-06-29 | External setup batches, preflight checks, logs, and exit criteria. |
| Risk Register | `analysis/planning/risk-register.md` | Pending | Pending | Pending | Review before implementation slices. |
| Validation Strategy | `analysis/planning/validation-strategy.md` | `ef75d4f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1179670/Validation+Strategy | 2026-06-29 | Done/verification expectations; source-first validation wording synced. |
| Readiness Audit | `analysis/planning/readiness-audit.md` | `28ce467` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1671177/Readiness+Audit | 2026-06-29 | Goal readiness audit and external setup gaps. |
| Requirements Traceability Matrix | `analysis/planning/requirements-traceability-matrix.md` | `28ce467` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/786449/Requirements+Traceability+Matrix | 2026-06-29 | FR/NFR to persona, story, evidence, and verification map. |
| Backlog Notes | `analysis/jira/README.md` | `a1ecc22` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1278003/Backlog+Notes | 2026-06-29 | Backlog package overview, local CSV sources, and label taxonomy. |
| User Stories | `analysis/jira/user-stories.md` | `a1ecc22` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1802241/User+Stories | 2026-06-29 | Epic and story narrative with acceptance criteria, evidence, and Jira mapping. |
| Jira Project Setup | `analysis/jira/project-setup.md` | `a1ecc22` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1540098/Jira+Project+Setup | 2026-06-29 | Project key, issue types, workflow, labels, components, and import order. |
| Import History | `analysis/jira/import-history.md` | `a1ecc22` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1835009/Import+History | 2026-06-29 | Local id to Jira key mapping, import run log, and status mapping decision. |

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
