# Portfolio Analysis Suite

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Planning source: Product goals, service strategy, requirements, architecture notes, schema, migrations, tests, and commit traceability.

## Purpose

This directory is the product and business analysis source for the portfolio. It defines the problem, goals,
requirements, user stories, architecture decisions, and technical inventory that guide implementation and external tool
setup.

The suite is intended to stay useful in four places:

- Confluence: product, business, planning, and decision pages.
- Jira: epics, stories, acceptance criteria, priorities, and traceability.
- Figma/FigJam: diagrams and product flows referenced from local docs before tooling is connected.
- GitHub: ADRs, schema and migration notes, API contracts, and implementation traceability.

## Artifact Map

| Area | File | Intended destination | Purpose |
| --- | --- | --- | --- |
| Tool setup | [confluence/page-tree.md](confluence/page-tree.md) | Confluence | Defines the first Confluence space, page hierarchy, publishing rules, and templates. |
| Tool setup | [confluence/publishing-runbook.md](confluence/publishing-runbook.md) | Confluence/GitHub | Defines page metadata, publishing steps, mapping table, and update triggers. |
| Tool setup | [confluence/page-manifest.csv](confluence/page-manifest.csv) | Confluence | CSV checklist for page creation order, source files, priorities, statuses, and URLs. |
| Product analysis | [product/problem-statement.md](product/problem-statement.md) | Confluence | Defines the problem, opportunity, stakeholders, goals, and constraints. |
| Product analysis | [product/stakeholders-and-personas.md](product/stakeholders-and-personas.md) | Confluence/Jira | Defines stakeholders, personas, persona-to-requirement mapping, and product implications. |
| Product analysis | [product/scope-and-requirements.md](product/scope-and-requirements.md) | Confluence | Captures functional and non-functional requirements mapped to implementation evidence. |
| Product strategy | [product/positioning-brief.md](product/positioning-brief.md) | Confluence | Defines the service position, audience, proof strategy, and first conversion hypothesis. |
| Product strategy | [product/service-offer-catalog.md](product/service-offer-catalog.md) | Confluence/Jira | Defines service offers, buyer fit, outputs, proof surfaces, intake routing, and pricing stance. |
| Product strategy | [product/content-strategy.md](product/content-strategy.md) | Confluence | Defines content pillars, templates, publishing workflow, and content gaps. |
| Product strategy | [product/conversion-path.md](product/conversion-path.md) | Confluence/Jira | Defines service entry points, visitor journey, intake questions, and conversion requirements. |
| Product policy | [product/interaction-policy.md](product/interaction-policy.md) | Confluence/Jira | Defines comment interaction goals, moderation principles, lifecycle, and future policy decisions. |
| Product workflow | [product/cms-authoring-workflow.md](product/cms-authoring-workflow.md) | Confluence/Jira | Defines owner-first CMS authoring, draft, preview, publish, and data-model implications. |
| Product workflow | [product/media-asset-lifecycle.md](product/media-asset-lifecycle.md) | Confluence/Jira | Defines media upload, attachment, replacement, accessibility, and cleanup lifecycle rules. |
| Product workflow | [product/auth-account-roadmap.md](product/auth-account-roadmap.md) | Confluence/Jira | Defines account types, auth growth phases, owner controls, and deferred account scope. |
| Planning | [planning/roadmap.md](planning/roadmap.md) | Confluence/Jira | Groups the work into practical stages and identifies next analysis slices. |
| Planning | [planning/tool-setup-plan.md](planning/tool-setup-plan.md) | Confluence/Jira/FigJam | Coordinates the external tool setup sequence and source-of-truth rules. |
| Planning | [planning/external-setup-execution-runbook.md](planning/external-setup-execution-runbook.md) | Confluence/Jira/FigJam/GitHub | Defines the first external setup execution batches, preflight checks, logs, and exit criteria. |
| Planning | [planning/risk-register.md](planning/risk-register.md) | Confluence/Jira | Tracks product, technical, tooling, and process risks with mitigations and related stories. |
| Planning | [planning/validation-strategy.md](planning/validation-strategy.md) | Confluence/Jira/GitHub | Defines validation layers, done checks, verification commands, and traceability expectations. |
| Planning | [planning/requirements-traceability-matrix.md](planning/requirements-traceability-matrix.md) | Confluence/Jira/GitHub | Maps requirements to personas, Jira stories, evidence, verification signals, and gaps. |
| Planning | [planning/readiness-audit.md](planning/readiness-audit.md) | Confluence/GitHub | Audits the local suite against the original objective and names external setup gaps. |
| Operations | [operations/release-and-review-cadence.md](operations/release-and-review-cadence.md) | Confluence/Jira | Defines per-slice, monthly, tool-sync, and launch review cadence. |
| Operations | [operations/artifact-maintenance-matrix.md](operations/artifact-maintenance-matrix.md) | Confluence/GitHub/Jira | Defines artifact ownership, update triggers, validation checks, and external sync rules. |
| Operations | [operations/decision-log.md](operations/decision-log.md) | Confluence/GitHub | Tracks lightweight product, planning, and tooling decisions that do not need ADRs. |
| Operations | [operations/open-questions.md](operations/open-questions.md) | Confluence/Jira | Keeps unresolved product, tooling, and architecture questions visible. |
| Jira backlog | [jira/user-stories.md](jira/user-stories.md) | Jira/Confluence | Human-readable epics and user stories with acceptance criteria and evidence commits. |
| Jira backlog | [jira/epics.csv](jira/epics.csv) | Jira CSV import | Starter import file for Jira epics before importing stories. |
| Jira backlog | [jira/backlog.csv](jira/backlog.csv) | Jira CSV import | Starter import file for Jira issues once the Jira project is configured. |
| Jira setup | [jira/project-setup.md](jira/project-setup.md) | Jira/Confluence | Defines project key, issue types, components, workflow, import order, and done/ready rules. |
| Jira setup | [jira/import-history.md](jira/import-history.md) | Jira/Confluence/GitHub | Records import runs and local story id to Jira key mappings. |
| Design setup | [design/diagram-inventory.md](design/diagram-inventory.md) | Figma/FigJam/Confluence | Lists planned diagrams, source docs, update triggers, and FigJam creation rules. |
| Design setup | [design/figjam-section-manifest.csv](design/figjam-section-manifest.csv) | Figma/FigJam/Confluence | CSV checklist for FigJam section creation, priorities, sources, statuses, and URLs. |
| Design setup | [design/figjam-creation-log.md](design/figjam-creation-log.md) | Figma/FigJam/Confluence | Tracks FigJam file and section URLs against local diagram ids. |
| Design sources | [design/diagrams/README.md](design/diagrams/README.md) | Figma/FigJam/GitHub | Keeps first Mermaid diagram sketches reviewable before FigJam setup. |
| GitHub setup | [github/documentation-rules.md](github/documentation-rules.md) | GitHub/Confluence | Defines source-of-truth rules, naming conventions, commit sizing, and doc review checks. |
| GitHub setup | [github/change-traceability-template.md](github/change-traceability-template.md) | GitHub/Jira/Confluence | Provides a reusable PR/change template for requirements, stories, risks, ADRs, and verification. |
| Technical | [technical/traceability.md](technical/traceability.md) | GitHub/Confluence | Links product capabilities to code areas, tests, migrations, and commit clusters. |
| Technical | [technical/verification-catalog.md](technical/verification-catalog.md) | GitHub/Confluence/Jira | Catalogs CI behavior, commands, focused tests, coverage gaps, and verification evidence rules. |
| Technical | [technical/schema-and-migrations.md](technical/schema-and-migrations.md) | GitHub | Current schema inventory and migration history summary. |
| Technical | [technical/schema-table-catalog.md](technical/schema-table-catalog.md) | GitHub/Confluence | Table and enum catalog explaining current schema purpose and relationships. |
| Technical | [technical/migration-catalog.md](technical/migration-catalog.md) | GitHub/Confluence | Maps each committed Drizzle migration to product intent and evidence. |
| Technical | [technical/api-surface-inventory.md](technical/api-surface-inventory.md) | GitHub/Confluence | Inventories current route handlers, server actions, contract status, and OpenAPI triggers. |
| Technical decisions | [technical/adr/README.md](technical/adr/README.md) | GitHub | ADR index and conventions. |
| Technical decisions | [technical/adr/0001-adopt-analysis-suite-as-planning-source.md](technical/adr/0001-adopt-analysis-suite-as-planning-source.md) | GitHub | First ADR for keeping the analysis suite in the repository as planning source. |
| API contracts | [technical/openapi.md](technical/openapi.md) | GitHub | Current API surface and OpenAPI planning notes. |

## Traceability Model

Each artifact should prefer concrete evidence:

- Requirement id: stable id such as `FR-001` or `NFR-003`.
- User story id: stable id such as `PF-101`.
- Evidence commits: short hashes proving implementation or documentation delivery.
- Code areas: paths or route groups that currently satisfy the behavior.
- Verification: existing tests, manual checks, or planned tests.
- Tool target: Confluence, Jira, Figma/FigJam, or GitHub.

## Current Product Summary

The portfolio is a fullstack service showcase rather than a static brochure. It presents personal experience, skills,
projects, and blog content through a CMS-backed Next.js application with PostgreSQL/Neon, Drizzle migrations,
internationalized routing, auth flows, blog comments, and operational workflows for preview database branches.

The implementation evidence demonstrates:

- Content modeling for experience, skills, projects, blog posts, media, mentions, and revisions.
- Public routes for localized portfolio browsing.
- Server-rendered CMS data access and route metadata resolution.
- Account/session foundations using Better Auth, custom portfolio identity flow, and Argon2 password handling.
- Blog comments associated with accounts while preserving reader discussion after account deletion.
- Migration-first database workflow backed by Drizzle and Neon branch synchronization.
- Baseline security and quality controls through headers, validation, rate limiting, and tests.

## Working Rule

Keep future changes small and reviewable. Prefer one focused documentation slice at a time, then check whether planned
behavior, implementation evidence, and external-tool records still agree before expanding the suite.
