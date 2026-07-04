# Analysis Suite Readiness Audit

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-30  
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
| Jira-compatible user stories | Jira story import complete with status mapping applied | `jira/user-stories.md`, `jira/epics.csv`, `jira/backlog.csv`, Jira epics `KAN-1` to `KAN-7`, Jira stories `KAN-8` to `KAN-63`; implemented created stories are `Done` and planned stories are `To Do` | Keep story statuses current as planned work is implemented. |
| Confluence-compatible docs | Current manifest published | `confluence/page-tree.md`, `confluence/page-manifest.csv`, `confluence/publishing-runbook.md`; all 58 current manifest rows are published in the Portfolio Confluence space | Keep source commits/URLs current as published pages change. |
| FigJam/Figma diagrams | Current inventory generated | `design/diagram-inventory.md`, `design/figjam-section-manifest.csv`, `design/diagrams`, `figjam-creation-log.md`; all nine current diagram sources are generated in `https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW` | Keep Confluence links current and replace board-level links with section-specific anchors if the connector exposes them later. |
| ADRs | Strong local baseline | `technical/adr/0001` through `0012` | Add ADRs for intake data, public preview sharing, or future collaborator scope when decided. |
| Schema and migrations | Strong local baseline | `technical/schema-and-migrations.md`, `technical/schema-table-catalog.md`, `technical/migration-catalog.md`, ADR 0002 | Update after material schema changes. |
| OpenAPI | Intentionally deferred | `technical/openapi.md`, `technical/api-surface-inventory.md`, ADR 0006 | Create spec only when stable external API contract exists. |
| Tool setup operations | Current external setup baseline complete | `planning/tool-setup-plan.md`, `planning/external-setup-execution-runbook.md`, Confluence page manifest, Jira import history, FigJam creation log | Keep setup logs current as future tools or pages change. |
| Ongoing governance | Local baseline | `risk-register.md`, `validation-strategy.md`, `technical/verification-catalog.md`, `operations/artifact-maintenance-matrix.md`, operations docs | Apply cadence during future slices. |

## Objective Requirement Check

| Objective requirement | Status | Evidence |
| --- | --- | --- |
| Maintain the analysis stage as the source that guides building. | Locally satisfied baseline | Problem, stakeholders, positioning, requirements, risks, validation, roadmap, and workflows exist. |
| Include the problem itself. | Satisfied | `analysis/product/problem-statement.md` |
| Slowly get more specific with functionality and planning artifacts. | Satisfied baseline | Scope/requirements, Jira stories, roadmap, risk register, validation strategy, workflow docs. |
| Tie artifacts to delivery evidence. | Satisfied baseline | Requirements, matrix, stories, traceability, ADRs, schema notes, and verification docs reference code areas, commits, tests, schemas, or external tool records where useful. |
| Connect requirements to personas, stories, evidence, and verification. | Locally satisfied baseline | `analysis/planning/requirements-traceability-matrix.md`, `analysis/technical/verification-catalog.md` |
| Product/business docs compatible with Confluence. | Published | Page tree, publishing runbook, product docs, planning docs, operations docs; every current Confluence manifest row is published with source metadata. |
| User stories compatible with Jira. | Jira imported | Markdown backlog and importable CSV parse successfully; Jira epics `KAN-1` to `KAN-7` and stories `KAN-8` to `KAN-63` exist with status mapping. |
| ADRs kept in GitHub. | Satisfied baseline | `analysis/technical/adr` |
| Current schema and migrations documented in Git. | Satisfied baseline | `analysis/technical/schema-and-migrations.md` |
| Potential OpenAPI considered. | Satisfied by decision | OpenAPI planning note and ADR 0006 intentionally defer spec until public contract exists. |
| Keep Git changes small and digestible. | Satisfied so far | Multiple focused docs-only commits. |

## Known Not-Yet-Done Items

These are not analysis-suite handoff blockers; they are future product implementation or maintenance items.

| Item | Why it remains |
| --- | --- |
| FigJam Confluence cross-linking can be refined. | All nine current diagram sources are generated in FigJam; section-specific anchors are recorded where available. |
| Contact/intake UI is not implemented. | Service definition and proof-mapping artifacts are complete; focused intake implementation remains planned in `PF-702`. |
| Comment editing/reporting and full soft-state moderation are not implemented. | ADR 0009 defines the future soft-state model; the first hard-delete moderation proof is implemented, while reader controls remain planned in `PF-408`. |
| CMS authoring UI is not implemented. | ADR 0011 defines the first owner-only source-aware boundary and ADR 0012 defines media lifecycle; implementation remains planned in `PF-206`, `PF-208`, and `PF-411`. |
| Email auth, profile pictures, notifications, experiments, and experience-chart design remain planned. | The new Jira slices `PF-105`, `PF-414` through `PF-417`, and `PF-706` are mapped to `KAN-63`, `KAN-58` through `KAN-61`, and `KAN-62`. |

## Next Best Slices

| Slice | Purpose |
| --- | --- |
| Confluence upkeep | Keep published pages synced after source changes and refresh source commit metadata after each external update batch. |
| Jira upkeep and cross-linking | Keep story statuses current and add useful Confluence/GitHub links as pages or implementation slices change. |
| FigJam upkeep | Keep generated diagrams synced from Mermaid and improve Confluence links when durable section anchors are available. |
| External setup upkeep | Follow `analysis/planning/external-setup-execution-runbook.md` when new pages, diagrams, Jira stories, or external links are added. |
| Owner authorization implementation prep | Define and test the shared server-only guard before moderation or authoring routes. |
| Conversion implementation | Add service CTA and minimal intake path. |

## Audit Conclusion

The analysis suite is handoff-ready for the current goal. Source-framing leaks are cleaned, the Confluence manifest is
published and freshly synced, Jira import/status mapping is reconciled, and the current FigJam diagram inventory is
generated with the documentation-toolchain refresh applied.

Remaining items are future product implementation or routine maintenance: focused intake UI, reader comment controls,
CMS authoring/media tooling, email auth, profile/account surfaces, recruiter experiments, experience chart design, and
ongoing sync after future source changes.
