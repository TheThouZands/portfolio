# Confluence Page Tree

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

This document defines the first Confluence structure for the portfolio analysis suite. The local `analysis/` directory
stays as the source while the connected Confluence space provides the readable product and business page tree.

The operational page creation checklist lives in `analysis/confluence/page-manifest.csv`.

## Space Proposal

| Setting | Proposed value | Notes |
| --- | --- | --- |
| Space name | Portfolio | Existing connected Confluence space for the portfolio analysis suite. |
| Space key | `Portfolio` | Actual connected space key in `thouzands.atlassian.net`. |
| Space id | `425988` | Returned by the Atlassian/Rovo connector. |
| Existing space home | Portfolio Home | Default Confluence space homepage. |
| Analysis root page | Portfolio Analysis Home | Created under Portfolio Home; mirrors `analysis/README.md`. |
| Owner | Thouzands | Single owner until collaborators exist. |
| Source repository | GitHub portfolio repository | Git remains source for ADRs, schema notes, and API contracts. |

## Page Tree

```text
Portfolio Home
  Portfolio Analysis Home
    1. Product Analysis
      1.1 Problem Statement
      1.2 Stakeholders And Personas
      1.3 Scope And Requirements
      1.4 Positioning Brief
      1.5 Service Offer Catalog
      1.6 Content Strategy
      1.7 Conversion Path Brief
      1.8 Interaction Policy
      1.9 CMS Authoring Workflow
      1.10 Media Asset Lifecycle
      1.11 Auth And Account Roadmap
    2. Planning
      2.1 Roadmap
      2.2 Tool Setup Plan
      2.3 External Setup Execution Runbook
      2.4 Risk Register
      2.5 Validation Strategy
      2.6 Readiness Audit
      2.7 Requirements Traceability Matrix
      2.8 Release And Review Cadence
    3. Jira Backlog
      3.1 Backlog Notes
      3.2 User Stories
      3.3 Jira Project Setup
      3.4 Import History
    4. Diagrams
      4.1 Diagram Inventory
      4.2 FigJam Section Manifest
      4.3 Diagram Sources
      4.4 Visitor Discovery Journey
      4.5 CMS Content Model
      4.6 Auth And Session Flow
      4.7 Blog Comment Flow
      4.8 Deployment And Neon Branch Workflow
      4.9 Structural Content Rendering Contract
      4.10 Documentation Toolchain
      4.11 Permission-Gated Reactive Island Flow
    5. Technical Reference
      5.1 Traceability
      5.2 Schema And Migrations
      5.3 Schema Table Catalog
      5.4 Migration Catalog
      5.5 API Surface Inventory
      5.6 OpenAPI Planning Notes
      5.7 Verification Catalog
      5.8 ADR Index
      5.9 Permission-Gated Reactive Islands
    6. Operations
      6.1 Documentation Maintenance
      6.2 Artifact Maintenance Matrix
      6.3 Confluence Publishing Runbook
      6.4 FigJam Creation Log
      6.5 Decision Log
      6.6 Open Questions
```

## Local Source Mapping

| Confluence page | Local source | Direction |
| --- | --- | --- |
| Portfolio Analysis Home | `analysis/README.md` | Local to Confluence |
| Problem Statement | `analysis/product/problem-statement.md` | Local to Confluence |
| Stakeholders And Personas | `analysis/product/stakeholders-and-personas.md` | Local to Confluence and Jira |
| Scope And Requirements | `analysis/product/scope-and-requirements.md` | Local to Confluence |
| Positioning Brief | `analysis/product/positioning-brief.md` | Local to Confluence |
| Service Offer Catalog | `analysis/product/service-offer-catalog.md` | Local to Confluence and Jira |
| Content Strategy | `analysis/product/content-strategy.md` | Local to Confluence |
| Conversion Path Brief | `analysis/product/conversion-path.md` | Local to Confluence and Jira |
| Interaction Policy | `analysis/product/interaction-policy.md` | Local to Confluence and Jira |
| CMS Authoring Workflow | `analysis/product/cms-authoring-workflow.md` | Local to Confluence and Jira |
| Media Asset Lifecycle | `analysis/product/media-asset-lifecycle.md` | Local to Confluence and Jira |
| Auth And Account Roadmap | `analysis/product/auth-account-roadmap.md` | Local to Confluence and Jira |
| Permission-Gated Reactive Islands | `analysis/technical/permission-gated-reactive-islands.md` | Local to Confluence, Jira, and FigJam |
| Roadmap | `analysis/planning/roadmap.md` | Local to Confluence |
| Tool Setup Plan | `analysis/planning/tool-setup-plan.md` | Local to Confluence, Jira, and FigJam |
| External Setup Execution Runbook | `analysis/planning/external-setup-execution-runbook.md` | Local to Confluence, Jira, FigJam, and GitHub |
| Risk Register | `analysis/planning/risk-register.md` | Local to Confluence and Jira |
| Validation Strategy | `analysis/planning/validation-strategy.md` | Local to Confluence and Jira |
| Requirements Traceability Matrix | `analysis/planning/requirements-traceability-matrix.md` | Local to Confluence, Jira, and GitHub |
| Readiness Audit | `analysis/planning/readiness-audit.md` | Local to Confluence and GitHub |
| Backlog Notes | `analysis/jira/README.md` | Local to Confluence |
| User Stories | `analysis/jira/user-stories.md` | Local to Confluence and Jira |
| Jira Project Setup | `analysis/jira/project-setup.md` | Local to Confluence and Jira admin |
| Import History | `analysis/jira/import-history.md` | Local to Confluence and Jira |
| Diagram Inventory | `analysis/design/diagram-inventory.md` | Local to Confluence and FigJam |
| FigJam Section Manifest | `analysis/design/figjam-section-manifest.csv` | Local to Confluence and FigJam |
| Diagram Sources | `analysis/design/diagrams/README.md` | Local to Confluence and FigJam |
| Structural Content Rendering Contract | `analysis/design/diagrams/pf-diag-006-structural-content-rendering-contract.md` | Local to Confluence and FigJam |
| Documentation Toolchain | `analysis/design/diagrams/pf-diag-007-documentation-toolchain.md` | Local to Confluence and FigJam |
| Permission-Gated Reactive Island Flow | `analysis/design/diagrams/pf-diag-009-permission-gated-reactive-island-flow.md` | Local to Confluence and FigJam |
| FigJam Creation Log | `analysis/design/figjam-creation-log.md` | Local to Confluence and FigJam |
| Traceability | `analysis/technical/traceability.md` | Local to Confluence and GitHub |
| Schema And Migrations | `analysis/technical/schema-and-migrations.md` | GitHub to Confluence reference |
| Schema Table Catalog | `analysis/technical/schema-table-catalog.md` | GitHub to Confluence reference |
| Migration Catalog | `analysis/technical/migration-catalog.md` | GitHub to Confluence reference |
| API Surface Inventory | `analysis/technical/api-surface-inventory.md` | GitHub to Confluence reference |
| OpenAPI Planning Notes | `analysis/technical/openapi.md` | GitHub to Confluence reference |
| Verification Catalog | `analysis/technical/verification-catalog.md` | GitHub to Confluence and Jira reference |
| ADR Index | `analysis/technical/adr/README.md` | GitHub to Confluence reference |
| Documentation Maintenance | `analysis/github/documentation-rules.md` | GitHub to Confluence reference |
| Artifact Maintenance Matrix | `analysis/operations/artifact-maintenance-matrix.md` | Local to Confluence, GitHub, and Jira |
| Confluence Publishing Runbook | `analysis/confluence/publishing-runbook.md` | Local to Confluence and GitHub |
| Release And Review Cadence | `analysis/operations/release-and-review-cadence.md` | Local to Confluence and Jira |
| Decision Log | `analysis/operations/decision-log.md` | Local to Confluence and GitHub |
| Open Questions | `analysis/operations/open-questions.md` | Local to Confluence and Jira |

## Page Templates

### Product Page Template

Use for problem, strategy, and positioning pages.

```text
Status:
Owner:
Last updated:
Source file:

Purpose
Decision or analysis summary
Current evidence
Implications
Open questions
Next update trigger
```

### Planning Page Template

Use for roadmap and tool setup pages.

```text
Status:
Owner:
Last updated:
Source file:

Goal
Scope
Milestones or slices
Exit criteria
Dependencies
Risks
Next action
```

### Technical Reference Template

Use for schema, API, traceability, and ADR index pages that may be copied from GitHub.

```text
Status:
Owner:
Last updated:
Source file:
Git commit:

Summary
Source of truth
Current state
Related decisions
Verification
Open follow-ups
```

## Publishing Rules

- Keep stable ids from local files when copying to Confluence.
- Do not rewrite Jira story ids after import.
- For ADRs, Confluence should summarize and link to GitHub rather than become the source of truth.
- For schema and migrations, Confluence should explain the model while GitHub remains authoritative.
- For diagrams, Confluence should embed or link FigJam outputs and reference the local diagram inventory.
- Include the source file path and latest Git commit in copied technical pages.

## Update Triggers

| Trigger | Required update |
| --- | --- |
| New major capability | Add or revise requirements, stories, traceability, and possibly a diagram. |
| New database table or relationship | Update schema notes and consider an ADR if the decision changes architecture. |
| New external-facing route contract | Update OpenAPI planning notes or create an OpenAPI spec. |
| New Jira import | Update import history and confirm local ids still map to Jira issues. |
| New FigJam diagram | Add the diagram link and owner to the inventory. |
| Accepted architecture decision | Add ADR in GitHub and summarize in Confluence. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should Confluence or GitHub be the canonical home for requirements? | Local GitHub files first, Confluence copy for readability. |
| Should diagrams be maintained in FigJam only or mirrored in Mermaid? | FigJam for collaborative diagrams, Mermaid only for lightweight GitHub references. |
| Should Jira become the only backlog after import? | No. Keep local planning docs for narrative context and Jira for execution. |
