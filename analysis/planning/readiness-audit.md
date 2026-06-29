# Analysis Suite Readiness Audit

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/GitHub

## Purpose

This audit checks the current `analysis/` suite against the objective: maintain the pre-build product analysis source
for the portfolio, keep artifacts compatible with Confluence/Jira/FigJam, and keep GitHub-owned technical artifacts near
the code.

## Audit Summary

| Area | Current readiness | Evidence | Remaining work |
| --- | --- | --- | --- |
| Analysis source directory | Strong local baseline | `analysis/README.md` and 40+ linked artifacts | Keep updated as implementation changes. |
| Problem and product goal | Strong local baseline | `product/problem-statement.md`, `positioning-brief.md`, `service-offer-catalog.md`, `conversion-path.md` | Validate against real visitor/client feedback later. |
| Stakeholders and personas | Strong local baseline | `product/stakeholders-and-personas.md` | Revisit after real traffic or leads. |
| Requirements | Strong local baseline | `product/scope-and-requirements.md`, `planning/requirements-traceability-matrix.md` | Keep statuses current as planned stories are implemented. |
| Jira-compatible user stories | Jira story import complete with status mapping applied | `jira/user-stories.md`, `jira/epics.csv`, `jira/backlog.csv`, Jira epics `KAN-1` to `KAN-7`, Jira stories `KAN-8` to `KAN-55`; implemented created stories are `Done` and current-worktree stories are `In Progress` | Keep story statuses current as planned work is implemented. |
| Confluence-compatible docs | Priority 1 publication complete | `confluence/page-tree.md`, `confluence/page-manifest.csv`, `confluence/publishing-runbook.md`, Portfolio space starter pages, product baseline pages, product business-path pages, priority 1 planning pages, priority 1 Jira pages, priority 1 design pages, priority 1 technical pages, and priority 1 operations pages | Keep source commits/URLs current as published pages change; continue lower-priority Confluence pages when useful. |
| FigJam/Figma diagrams | First batch generated | `design/diagram-inventory.md`, `design/figjam-section-manifest.csv`, `design/diagrams`, `figjam-creation-log.md`; first FigJam board exists at `https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW` | Generate remaining priority 2 diagrams and link relevant Confluence pages. |
| ADRs | Strong local baseline | `technical/adr/0001` through `0012` | Add ADRs for intake data, public preview sharing, or future collaborator scope when decided. |
| Schema and migrations | Strong local baseline | `technical/schema-and-migrations.md`, `technical/schema-table-catalog.md`, `technical/migration-catalog.md`, ADR 0002 | Update after material schema changes. |
| OpenAPI | Intentionally deferred | `technical/openapi.md`, `technical/api-surface-inventory.md`, ADR 0006 | Create spec only when stable external API contract exists. |
| Tool setup operations | External setup in progress | `planning/tool-setup-plan.md`, `planning/external-setup-execution-runbook.md`, import/log files | Continue Confluence and FigJam setup in small batches. |
| Ongoing governance | Local baseline | `risk-register.md`, `validation-strategy.md`, `technical/verification-catalog.md`, `operations/artifact-maintenance-matrix.md`, operations docs | Apply cadence during future slices. |

## Objective Requirement Check

| Objective requirement | Status | Evidence |
| --- | --- | --- |
| Maintain the analysis stage as the source that guides building. | Locally satisfied baseline | Problem, stakeholders, positioning, requirements, risks, validation, roadmap, and workflows exist. |
| Include the problem itself. | Satisfied | `analysis/product/problem-statement.md` |
| Slowly get more specific with functionality and planning artifacts. | Satisfied baseline | Scope/requirements, Jira stories, roadmap, risk register, validation strategy, workflow docs. |
| Make artifacts refer to already existing commits/features. | Satisfied baseline | Requirements, matrix, stories, traceability, ADRs, schema notes reference commits/code areas. |
| Connect requirements to personas, stories, evidence, and verification. | Locally satisfied baseline | `analysis/planning/requirements-traceability-matrix.md`, `analysis/technical/verification-catalog.md` |
| Product/business docs compatible with Confluence. | Priority 1 published | Page tree, publishing runbook, product docs, planning docs, operations docs; priority 1 Confluence pages are published with source metadata. |
| User stories compatible with Jira. | Jira imported | Markdown backlog and importable CSV parse successfully; Jira epics `KAN-1` to `KAN-7` and stories `KAN-8` to `KAN-55` exist with status mapping. |
| ADRs kept in GitHub. | Satisfied baseline | `analysis/technical/adr` |
| Current schema and migrations documented in Git. | Satisfied baseline | `analysis/technical/schema-and-migrations.md` |
| Potential OpenAPI considered. | Satisfied by decision | OpenAPI planning note and ADR 0006 intentionally defer spec until public contract exists. |
| Keep Git changes small and digestible. | Satisfied so far | Multiple focused docs-only commits. |

## Known Not-Yet-Done Items

These are not local analysis gaps; they are execution or external setup gaps.

| Item | Why it remains |
| --- | --- |
| Confluence lower-priority publication remains. | Priority 1 Confluence publication is complete; lower-priority product, planning, design, technical, and operations pages remain optional future publication work. |
| FigJam publication is partial. | First priority diagrams `PF-DIAG-007`, `PF-DIAG-001`, `PF-DIAG-002`, and `PF-DIAG-003` exist; priority 2 diagrams and Confluence links remain pending. |
| Contact/intake UI is not implemented. | Planned in `PF-701` to `PF-704`. |
| Comment moderation UI/schema is not implemented. | ADR 0009 defines the future soft-state model; implementation remains planned in `PF-407` and `PF-408`. |
| CMS authoring UI is not implemented. | ADR 0011 defines the first owner-only source-aware boundary and ADR 0012 defines media lifecycle; implementation remains planned in `PF-206`, `PF-208`, and `PF-411`. |
| Owner auth controls are not implemented. | ADR 0010 defines the future allowlist model; implementation remains planned in `PF-411`. |

## Next Best Slices

| Slice | Purpose |
| --- | --- |
| Continue Confluence publication | Publish lower-priority pages only when they become useful, and keep priority 1 pages synced after source changes. |
| Jira upkeep and cross-linking | Keep story statuses current and add useful Confluence/GitHub links as pages are published. |
| Continue FigJam setup | Generate remaining Mermaid-backed diagrams, record URLs, and keep Git Mermaid as source of truth. |
| External setup execution run | Follow `analysis/planning/external-setup-execution-runbook.md` and commit filled URLs/keys after each batch. |
| Owner authorization implementation prep | Define and test the shared server-only guard before moderation or authoring routes. |
| Conversion implementation | Add service CTA and minimal intake path. |

## Audit Conclusion

The local analysis suite is now a strong planning baseline and is ready for continued external tool setup. The goal
should not be considered globally complete until external Confluence/Jira/FigJam setup is either completed, explicitly
deferred, or declared out of scope for the current local phase.
