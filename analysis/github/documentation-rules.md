# GitHub Documentation Rules

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: GitHub/Confluence

## Purpose

This document defines what should remain in GitHub versus what can be copied into Confluence, Jira, or FigJam. The goal
is to keep technical truth close to code while letting planning tools do the jobs they are better at.

## Source Of Truth Rules

| Artifact type | Source of truth | Reason |
| --- | --- | --- |
| ADRs | GitHub | Decisions should version with code and implementation changes. |
| Schema and migrations | GitHub | `src/db/schema.ts` and `drizzle/` are executable/reviewable artifacts. |
| OpenAPI contracts | GitHub | API contracts should be reviewed and tested with code. |
| Product/problem docs | Local Markdown first, then Confluence | Early drafting benefits from Git review; Confluence improves reading and navigation. |
| Jira stories | Jira after import, local Markdown for context | Jira owns execution state; local docs preserve product reasoning. |
| Diagrams | FigJam after creation, local inventory for governance | FigJam owns collaborative visuals; local docs define purpose and update triggers. |
| External tool manifests | GitHub | Setup manifests need reviewable history until external ids and URLs exist. |
| Architecture notes | GitHub | Developers need architecture boundaries during code review. |

## Directory Roles

| Path | Role |
| --- | --- |
| `analysis/` | Product analysis and forward planning artifacts. |
| `analysis/product/` | Business/product problem, scope, requirements, positioning, and strategy. |
| `analysis/planning/` | Roadmaps, staged plans, and delivery cadence. |
| `analysis/jira/` | Jira import sources, setup rules, and backlog notes. |
| `analysis/confluence/` | Confluence page tree, page manifest, and publishing rules. |
| `analysis/design/` | FigJam/Figma diagram inventory, section manifest, logs, and diagram specs. |
| `analysis/technical/` | Traceability, schema notes, API planning, and ADRs. |
| `analysis/github/change-traceability-template.md` | Reusable change/PR traceability template. |
| `ARCHITECTURE.md` | Repo-level architecture entrypoint for developers. |
| `src/**/**/*.md` | Local module notes close to implementation. |

## Commit Sizing

Prefer small documentation commits:

- One tool setup slice.
- One product analysis slice.
- One ADR or tightly related ADR group.
- One schema/migration documentation update.
- One backlog import/update batch.

Avoid combining unrelated app code and analysis docs unless a product decision and implementation must land together.

## Naming Rules

| Item | Rule | Example |
| --- | --- | --- |
| Requirement id | `FR-###` or `NFR-###` | `FR-013` |
| Story id | `PF-###` | `PF-404` |
| Epic id | `PF-E##` | `PF-E04` |
| Diagram id | `PF-DIAG-###` | `PF-DIAG-003` |
| ADR id | Four-digit sequence | `0001-adopt-analysis-suite-as-planning-source.md` |

## Review Checklist

Before committing documentation:

- Check whether the artifact has a clear target home.
- Check whether stable ids were preserved.
- Check whether evidence links point to real commits, files, tests, or decisions.
- Check whether statements distinguish implemented behavior from planned behavior.
- Check whether a related ADR is needed.
- Check whether Confluence/Jira/FigJam copies will need follow-up.

## Verification Commands

Useful local checks for docs-only changes:

```powershell
rg --files analysis
rg --pcre2 "[^\x00-\x7F]" analysis
rg "TO[D]O|TB[D]|FIX[M]E" analysis
Import-Csv analysis\jira\backlog.csv | Measure-Object
Import-Csv analysis\jira\epics.csv | Measure-Object
Import-Csv analysis\confluence\page-manifest.csv | Measure-Object
Import-Csv analysis\design\figjam-section-manifest.csv | Measure-Object
```

## Traceability Expectations

Each meaningful new implementation should eventually link to at least one of:

- Requirement id.
- Jira story id.
- ADR id.
- Diagram id.
- Schema/migration note.
- Test file or manual verification note.

Use [change-traceability-template.md](change-traceability-template.md) when a change touches product behavior, schema,
auth, comments, public routes, conversion paths, or external tool setup.

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should Confluence edits be synced back to Git manually or automatically? | Manual until the page tree stabilizes. |
| Should Jira issue keys replace local story ids in docs? | No. Add Jira keys alongside local ids later. |
| Should diagrams be exported back into the repo? | Only if a static export becomes useful for review or archival. |
