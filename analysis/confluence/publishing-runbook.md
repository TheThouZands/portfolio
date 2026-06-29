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
| Diagram Inventory | `analysis/design/diagram-inventory.md` | `6b61551` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1441814/Diagram+Inventory | 2026-06-29 | Diagram ids, source docs, status, update triggers, and FigJam generation rules. |
| FigJam Section Manifest | `analysis/design/figjam-section-manifest.csv` | `6b61551` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1310736/FigJam+Section+Manifest | 2026-06-29 | Confluence-readable copy of the Git-owned FigJam CSV checklist. |
| Diagram Sources | `analysis/design/diagrams/README.md` | `6b61551` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1343523/Diagram+Sources | 2026-06-29 | Mermaid source index and generated FigJam copy rules. |
| Visitor Discovery Journey | `analysis/design/diagrams/pf-diag-001-visitor-discovery-journey.md` | `c130050` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1278025/Visitor+Discovery+Journey | 2026-06-29 | Generated FigJam-backed visitor journey source page. |
| CMS Content Model | `analysis/design/diagrams/pf-diag-002-portfolio-content-model.md` | `c130050` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1441837/CMS+Content+Model | 2026-06-29 | Generated FigJam-backed CMS relationship source page. |
| Auth And Session Flow | `analysis/design/diagrams/pf-diag-003-auth-identifier-session-flow.md` | `c130050` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1933313/Auth+And+Session+Flow | 2026-06-29 | Generated FigJam-backed auth/session source page. |
| Blog Comment Flow | `analysis/design/diagrams/pf-diag-004-blog-comment-flow.md` | `d335479` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1474563/Blog+Comment+Flow | 2026-06-29 | Source-ready comment flow page; FigJam generation remains pending. |
| Deployment And Neon Branch Workflow | `analysis/design/diagrams/pf-diag-005-deployment-neon-branch-workflow.md` | `d335479` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1114129/Deployment+And+Neon+Branch+Workflow | 2026-06-29 | Source-ready database branch workflow page; FigJam generation remains pending. |
| Technical Reference | `analysis/confluence/page-manifest.csv` | `86015e1` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/557058/Technical+Reference | 2026-06-29 | Starter container page. |
| Traceability | `analysis/technical/traceability.md` | `d7ba04b` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1441860/Traceability | 2026-06-29 | Capability, commit, code, test, and gap mapping; setup status refreshed. |
| Schema And Migrations | `analysis/technical/schema-and-migrations.md` | `736f56f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1310758/Schema+And+Migrations | 2026-06-29 | Git-authoritative schema domain and migration workflow summary. |
| Schema Table Catalog | `analysis/technical/schema-table-catalog.md` | `736f56f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1212448/Schema+Table+Catalog | 2026-06-29 | Git-authoritative table and enum catalog copy. |
| Migration Catalog | `analysis/technical/migration-catalog.md` | `736f56f` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1245186/Migration+Catalog | 2026-06-29 | Git-authoritative migration intent and evidence copy. |
| API Surface Inventory | `analysis/technical/api-surface-inventory.md` | `d7ba04b` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/786472/API+Surface+Inventory | 2026-06-29 | HTTP route and server action inventory with OpenAPI deferral boundary. |
| Verification Catalog | `analysis/technical/verification-catalog.md` | `d7ba04b` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1966081/Verification+Catalog | 2026-06-29 | CI, command, focused test, coverage, and evidence recording guide. |
| ADR Index | `analysis/technical/adr/README.md` | `d7ba04b` | https://thouzands.atlassian.net/wiki/spaces/Portfolio/pages/1179691/ADR+Index | 2026-06-29 | Readable ADR index; individual ADR files remain authoritative in Git. |
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
