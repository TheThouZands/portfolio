# Validation Strategy

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira/GitHub

## Purpose

This document defines how future work should prove that it supports the portfolio goal. It connects product validation,
documentation validation, Jira acceptance criteria, and technical verification.

The portfolio is not validated only by passing tests. It must also prove that a visitor can understand the service,
trust the implementation evidence, and take a useful next action.

## Validation Layers

| Layer | Question | Evidence |
| --- | --- | --- |
| Product | Does the work make the portfolio less aimless and more useful to the target persona? | Updated problem, persona, positioning, conversion, or content docs. |
| Requirements | Does the work map to a functional or non-functional requirement? | Requirement id in docs or PR notes. |
| Jira | Can the work be described as a small deliverable with acceptance criteria? | Jira story id or local backlog row. |
| Technical | Does implementation behavior match the expected system behavior? | Tests, manual verification, schema checks, screenshots, or code review. |
| Documentation | Did decisions and traceability stay current? | ADRs, schema notes, diagrams, traceability, or Confluence copy updates. |

## Definition Of Validated

A change is validated when:

- The target persona or owner need is clear.
- The requirement or story id is known.
- Acceptance criteria were checked.
- Risk impact was considered.
- Technical verification matches the risk level.
- Related docs, diagrams, ADRs, schema notes, or backlog items were updated.

## Validation By Work Type

| Work type | Minimum validation |
| --- | --- |
| Product analysis doc | Link from index or roadmap; check stable ids and target home. |
| Confluence setup update | Page manifest parses; page tree, source path, status, priority, and URL tracking fields stay aligned. |
| Jira backlog update | Epic and story CSV files parse; story has priority, status, acceptance criteria, and evidence/source. |
| ADR | Decision has context, consequences, evidence, and follow-ups. |
| Schema change | Drizzle migration generated and reviewed; schema docs updated if product meaning changes. |
| API surface change | API surface inventory updated; OpenAPI planning note or ADR reviewed if the route becomes public. |
| Route/page change | Manual route check; metadata/locale behavior checked when relevant. |
| Auth/comment change | Unit or integration coverage for validation/session/comment behavior; policy reviewed. |
| Diagram change | Diagram inventory and FigJam section manifest updated; source docs and update triggers named. |
| Conversion path change | Persona, CTA, and intake assumptions checked against positioning brief. |
| External tool setup | Import or publish history records local source, source commit, external URL/key, and owner. |
| Requirement traceability update | Matrix maps requirement, persona, story, evidence, verification signal, and remaining gaps. |
| Pull request or implementation slice | Change traceability template completed or equivalent details included in PR/story notes. |

## Current Verification Commands

Useful checks for analysis-only changes:

```powershell
rg --files analysis
rg --pcre2 "[^\x00-\x7F]" analysis
rg "TO[D]O|TB[D]|FIX[M]E" analysis
Import-Csv analysis\jira\backlog.csv | Measure-Object
Import-Csv analysis\jira\epics.csv | Measure-Object
Import-Csv analysis\confluence\page-manifest.csv | Measure-Object
Import-Csv analysis\design\figjam-section-manifest.csv | Measure-Object
```

Useful checks for application changes, chosen by risk:

```powershell
npm run lint
npm run typecheck
npm run test
npm run db:check
```

Run only the relevant checks for the slice. A documentation-only change does not need app tests unless it claims to
verify implementation behavior.

## Acceptance Criteria Quality

Acceptance criteria should be:

- Observable.
- Small enough to verify.
- Connected to a persona, requirement, risk, or decision.
- Clear about whether behavior is implemented, planned, or intentionally deferred.

Weak:

- "Improve comments."
- "Make the portfolio better."
- "Add docs."

Stronger:

- "Owner can hide a comment while preserving thread structure."
- "Visitor can select a service wedge and submit a minimal intake request."
- "ADR records the tradeoff and links to implementation evidence."

## Traceability Checklist

Before marking a story done, confirm whether the change should update:

- `analysis/product/scope-and-requirements.md`
- `analysis/planning/requirements-traceability-matrix.md`
- `analysis/jira/user-stories.md`
- `analysis/jira/backlog.csv`
- `analysis/technical/traceability.md`
- `analysis/technical/adr/`
- `analysis/technical/schema-and-migrations.md`
- `analysis/technical/api-surface-inventory.md`
- `analysis/technical/openapi.md`
- `analysis/design/diagram-inventory.md`
- `analysis/design/figjam-section-manifest.csv`
- `analysis/planning/risk-register.md`
- `analysis/planning/readiness-audit.md`
- `analysis/operations/release-and-review-cadence.md`
- `analysis/operations/decision-log.md`
- `analysis/operations/open-questions.md`
- `analysis/confluence/publishing-runbook.md`
- `analysis/jira/import-history.md`
- `analysis/design/figjam-creation-log.md`
- `analysis/github/change-traceability-template.md`

## Residual Risk

If a story ships with known gaps, record them explicitly:

| Field | Purpose |
| --- | --- |
| Residual risk | What could still go wrong? |
| Reason accepted | Why is it okay for this slice? |
| Follow-up story | Where will it be handled? |
| Review trigger | When should the decision be revisited? |
