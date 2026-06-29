# Artifact Maintenance Matrix

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: Confluence/GitHub/Jira

## Purpose

This matrix defines which analysis artifacts should be updated when the portfolio changes. It keeps the suite useful
after the initial planning baseline, so future work does not slide back into undocumented feature accumulation.

Use it during per-slice review, monthly review, and external tool setup.

## Maintenance Rules

- Update the source artifact in Git before relying on an external copy.
- Keep local ids stable after Confluence/Jira/FigJam setup.
- Update external ids and URLs in manifests/logs after external setup.
- Add ADRs for durable technical decisions; use the decision log for lighter product/process decisions.
- Prefer one focused documentation maintenance commit per coherent change.

## Artifact Matrix

| Artifact group | Source files | Source of truth | Update trigger | Validation |
| --- | --- | --- | --- | --- |
| Product problem and strategy | `analysis/product/problem-statement.md`, `analysis/product/positioning-brief.md`, `analysis/product/service-offer-catalog.md`, `analysis/product/conversion-path.md` | Git first, Confluence readable copy later | Service positioning, offer, conversion, pricing, or audience assumptions change. | Check links from README, requirements, and related Jira stories. |
| Personas and requirements | `analysis/product/stakeholders-and-personas.md`, `analysis/product/scope-and-requirements.md`, `analysis/planning/requirements-traceability-matrix.md` | Git first, Confluence/Jira references later | Persona, FR/NFR, priority, evidence, or story coverage changes. | Verify stable ids, matrix coverage, and Jira story alignment. |
| Jira package | `analysis/jira/user-stories.md`, `analysis/jira/epics.csv`, `analysis/jira/backlog.csv`, `analysis/jira/project-setup.md`, `analysis/jira/import-history.md` | Git until import; Jira owns execution state after import | Story, epic, priority, label, acceptance criteria, or Jira key mapping changes. | `Import-Csv analysis\jira\epics.csv`, `Import-Csv analysis\jira\backlog.csv`. |
| Confluence package | `analysis/confluence/page-tree.md`, `analysis/confluence/page-manifest.csv`, `analysis/confluence/publishing-runbook.md` | Git until pages exist; Confluence owns readable copy after publication | Page title, hierarchy, priority, source path, URL, or publishing rule changes. | `Import-Csv analysis\confluence\page-manifest.csv`; source paths resolve. |
| FigJam package | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv`, `analysis/design/figjam-creation-log.md`, `analysis/design/diagrams` | Git until sections exist; FigJam owns collaborative visual layout after creation | Diagram id, section order, source docs, URL, or diagram meaning changes. | `Import-Csv analysis\design\figjam-section-manifest.csv`; source paths resolve. |
| Technical schema and migrations | `analysis/technical/schema-and-migrations.md`, `analysis/technical/schema-table-catalog.md`, `analysis/technical/migration-catalog.md`, `analysis/technical/adr/0002-use-drizzle-schema-and-migrations.md` | GitHub | Table, enum, migration, domain meaning, or DB workflow changes. | `npm run db:check` when schema changes; catalog and migration review. |
| API contracts and server surface | `analysis/technical/api-surface-inventory.md`, `analysis/technical/openapi.md`, `analysis/technical/adr/0006-defer-openapi-until-public-contract.md` | GitHub | Route handler, server action, or public API boundary changes. | Inventory review; create OpenAPI only after public contract decision. |
| ADRs and technical decisions | `analysis/technical/adr` | GitHub | Architecture, schema, security, API, or durable implementation decision changes. | ADR has context, decision, consequences, evidence, and follow-ups. |
| Verification and quality evidence | `analysis/technical/verification-catalog.md`, `.github/workflows/ci.yml`, `package.json`, `tests` | GitHub/Confluence reference | Script, CI, test coverage, manual check, or evidence recording rule changes. | Commands and coverage gaps match the current repo. |
| Traceability and change review | `analysis/technical/traceability.md`, `analysis/github/change-traceability-template.md` | GitHub/Confluence reference | New capability, requirement/story change, major implementation slice, or PR review pattern changes. | Requirement/story/risk/verification links are present. |
| Governance and operations | `analysis/planning/roadmap.md`, `analysis/planning/risk-register.md`, `analysis/planning/validation-strategy.md`, `analysis/planning/readiness-audit.md`, `analysis/operations/*` | Git first, Confluence copy later | Stage, risk, validation rule, open question, decision, cadence, or readiness status changes. | Monthly review and per-slice checklist. |

## Trigger Checklist

| Change type | Check these artifacts |
| --- | --- |
| New public route or server action | API surface inventory, OpenAPI notes, ADR need, requirements, Jira story. |
| New database migration | Schema table catalog, schema/migration summary, migration catalog, ADR need, Jira story. |
| New product-facing feature | Requirements, traceability matrix, Jira story, risk register, validation strategy, diagrams if flow changes. |
| New service/conversion copy | Positioning brief, service offer catalog, conversion path, content strategy, Jira stories. |
| New auth/comment behavior | Auth/account roadmap, interaction policy, API surface inventory, ADR need, tests, risk register. |
| External Confluence/Jira/FigJam setup | External setup runbook, relevant manifest, import/creation log, readiness audit. |
| Monthly review | Roadmap, risk register, open questions, decision log, release/review cadence, readiness audit. |

## External Sync Rule

After external setup, local Git still records:

- Source commits used for published pages.
- Jira key mappings for local epics and stories.
- FigJam file and section URLs.
- Meaningful edits made in external tools that should not remain only in tool state.

If an external edit is only formatting, record the URL/status but do not churn local content.

## Review Cadence

| Cadence | Required action |
| --- | --- |
| Each documentation slice | Confirm the artifact matrix did not require adjacent updates. |
| Each implementation slice | Use the change traceability template or equivalent PR/story notes. |
| Before external setup | Confirm all CSV manifests parse and source paths resolve. |
| After external setup batch | Commit updated URLs/keys/source commits before starting the next batch. |
| Monthly | Review roadmap, risks, decisions, open questions, and readiness audit. |
