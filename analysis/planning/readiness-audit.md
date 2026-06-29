# Analysis Suite Readiness Audit

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/GitHub

## Purpose

This audit checks the current `analysis/` suite against the original objective: reconstruct the missing pre-build
analysis process for the portfolio, keep artifacts compatible with Confluence/Jira/FigJam, and keep GitHub-owned
technical artifacts near the code.

## Audit Summary

| Area | Current readiness | Evidence | Remaining work |
| --- | --- | --- | --- |
| Retrospective analysis directory | Strong local baseline | `analysis/README.md` and 40+ linked artifacts | Keep updated as implementation changes. |
| Problem and product goal | Strong local baseline | `product/problem-statement.md`, `positioning-brief.md`, `service-offer-catalog.md`, `conversion-path.md` | Validate against real visitor/client feedback later. |
| Stakeholders and personas | Strong local baseline | `product/stakeholders-and-personas.md` | Revisit after real traffic or leads. |
| Requirements | Strong local baseline | `product/scope-and-requirements.md`, `planning/requirements-traceability-matrix.md` | Keep statuses current as planned stories are implemented. |
| Jira-compatible user stories | Jira story import started with status mapping applied | `jira/user-stories.md`, `jira/epics.csv`, `jira/backlog.csv`, Jira epics `KAN-1` to `KAN-7`, Jira stories `KAN-8` to `KAN-19`; implemented created stories are `Done` | Continue importing remaining story batches and fill story mappings in `jira/import-history.md`. |
| Confluence-compatible docs | External setup started | `confluence/page-tree.md`, `confluence/page-manifest.csv`, `confluence/publishing-runbook.md`, Portfolio space starter pages | Publish priority 1 content pages and keep source commits/URLs current. |
| FigJam/Figma diagrams | Local source ready | `design/diagram-inventory.md`, `design/figjam-section-manifest.csv`, `design/diagrams`, `figjam-creation-log.md` | Create FigJam file/sections and record URLs. |
| ADRs | Strong local baseline | `technical/adr/0001` through `0012` | Add ADRs for intake data, public preview sharing, or future collaborator scope when decided. |
| Schema and migrations | Strong local baseline | `technical/schema-and-migrations.md`, `technical/schema-table-catalog.md`, `technical/migration-catalog.md`, ADR 0002 | Update after material schema changes. |
| OpenAPI | Intentionally deferred | `technical/openapi.md`, `technical/api-surface-inventory.md`, ADR 0006 | Create spec only when stable external API contract exists. |
| Tool setup operations | Local runbooks ready | `planning/tool-setup-plan.md`, `planning/external-setup-execution-runbook.md`, import/log files | Execute setup in external tools. |
| Ongoing governance | Local baseline | `risk-register.md`, `validation-strategy.md`, `technical/verification-catalog.md`, `operations/artifact-maintenance-matrix.md`, operations docs | Apply cadence during future slices. |

## Objective Requirement Check

| Objective requirement | Status | Evidence |
| --- | --- | --- |
| Reconstruct the missing analysis stage as if it happened before building. | Locally satisfied baseline | Problem, stakeholders, positioning, requirements, risks, validation, roadmap, and workflows exist. |
| Include the problem itself. | Satisfied | `analysis/product/problem-statement.md` |
| Slowly get more specific with functionality and planning artifacts. | Satisfied baseline | Scope/requirements, Jira stories, roadmap, risk register, validation strategy, workflow docs. |
| Make artifacts refer to already existing commits/features. | Satisfied baseline | Requirements, matrix, stories, traceability, ADRs, schema notes reference commits/code areas. |
| Connect requirements to personas, stories, evidence, and verification. | Locally satisfied baseline | `analysis/planning/requirements-traceability-matrix.md`, `analysis/technical/verification-catalog.md` |
| Product/business docs compatible with Confluence. | Locally ready | Page tree, publishing runbook, product docs, planning docs, operations docs. |
| User stories compatible with Jira. | Locally ready | Markdown backlog and importable CSV parse successfully. |
| ADRs kept in GitHub. | Satisfied baseline | `analysis/technical/adr` |
| Current schema and migrations documented in Git. | Satisfied baseline | `analysis/technical/schema-and-migrations.md` |
| Potential OpenAPI considered. | Satisfied by decision | OpenAPI planning note and ADR 0006 intentionally defer spec until public contract exists. |
| Keep Git changes small and digestible. | Satisfied so far | Multiple focused docs-only commits. |

## Known Not-Yet-Done Items

These are not local analysis gaps; they are execution or external setup gaps.

| Item | Why it remains |
| --- | --- |
| Only starter Confluence pages exist. | The Portfolio space, analysis root, and six container pages exist; priority 1 content pages still need publication. |
| Jira story import is not done yet. | Project `KAN` is accessible, epics `KAN-1` through `KAN-7` exist, and the `PF-E01`/`PF-E02` stories are mapped as `KAN-8` through `KAN-19`; implemented created stories are `Done`, planned created stories remain `To Do`, and thirty-six stories remain pending. |
| Actual FigJam file/sections do not exist yet. | Needs Figma/FigJam setup and visual refinement. |
| Contact/intake UI is not implemented. | Planned in `PF-701` to `PF-704`. |
| Comment moderation UI/schema is not implemented. | ADR 0009 defines the future soft-state model; implementation remains planned in `PF-407` and `PF-408`. |
| CMS authoring UI is not implemented. | ADR 0011 defines the first owner-only source-aware boundary and ADR 0012 defines media lifecycle; implementation remains planned in `PF-206`, `PF-208`, and `PF-411`. |
| Owner auth controls are not implemented. | ADR 0010 defines the future allowlist model; implementation remains planned in `PF-411`. |

## Next Best Slices

| Slice | Purpose |
| --- | --- |
| External Confluence setup | Create space/page tree and fill publishing metadata. |
| External Jira setup | Continue story import batches, record key mappings, and apply the chosen status mapping after each batch. |
| External FigJam setup | Create diagram file/sections, redraw first diagrams, record URLs. |
| External setup execution run | Follow `analysis/planning/external-setup-execution-runbook.md` and commit filled URLs/keys after each batch. |
| Owner authorization implementation prep | Define and test the shared server-only guard before moderation or authoring routes. |
| Conversion implementation | Add service CTA and minimal intake path. |

## Audit Conclusion

The local analysis suite is now a strong retrospective baseline and is ready for external tool setup. The goal should not
be considered globally complete until external Confluence/Jira/FigJam setup is either completed, explicitly deferred, or
declared out of scope for the current local phase.
