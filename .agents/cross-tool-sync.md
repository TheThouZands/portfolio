# Cross-Tool Sync Playbook

Status: Active
Owner: Thouzands
Last updated: 2026-06-29
Target home: GitHub agent handoff

## Purpose

This file tells future agent instances how to keep the portfolio analysis suite synchronized across local Git,
Confluence, Jira, and FigJam. Read it before changing `analysis/`, Jira issues, Confluence pages, or FigJam diagrams.

## Current External Baseline

| Tool | Current state |
| --- | --- |
| Confluence | Portfolio space is published from `analysis/confluence/page-manifest.csv`; Page Manifest page is versioned from source commit `004614f`. |
| Jira | Portfolio project uses key `KAN`; local ids map to `KAN-1` through `KAN-57` in `analysis/jira/import-history.md`. |
| Jira docs | User confirmed on 2026-06-29 that Jira docs now link to the Portfolio Confluence space. Treat that project-docs link as the concise bridge instead of duplicating every Confluence page in Jira. |
| FigJam | Board title is `Portfolio Analysis Diagrams`, URL `https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW/Portfolio-Analysis-Diagrams`, project folder `Portfolio`. |
| FigJam sections | Section ids `13:744` through `13:750`, `25:841`, and `27:929` group generated diagrams; generated diagram shapes and connectors remain page-level. |

## Source-Of-Truth Map

| Area | Primary source | External copy or execution home |
| --- | --- | --- |
| Product and planning analysis | `analysis/product`, `analysis/planning`, `analysis/operations` | Confluence Portfolio space |
| Jira story text and stable ids | `analysis/jira/user-stories.md`, `analysis/jira/backlog.csv`, `analysis/jira/epics.csv` | Jira project `KAN` |
| Jira execution status | Jira project `KAN` | Reflected locally in backlog/import-history when reconciled |
| Confluence page inventory | `analysis/confluence/page-manifest.csv` | Confluence Page Manifest page |
| Diagrams and diagram meaning | `analysis/design/diagrams`, `analysis/design/diagram-inventory.md` | FigJam board and Confluence diagram pages |
| FigJam links and generation log | `analysis/design/figjam-section-manifest.csv`, `analysis/design/figjam-creation-log.md` | FigJam board and Confluence manifest/log pages |
| Technical decisions | `analysis/technical/adr` | Confluence technical reference summaries or links |

## Sync Loop

1. Inspect first:
   - Run `git status --short`.
   - Find and read the relevant canonical local source docs for the task, regardless of section. Check across
     `analysis/product`, `analysis/planning`, `analysis/technical`, `analysis/jira`, `analysis/confluence`,
     `analysis/design`, and `analysis/operations` as applicable before relying on a single artifact.
   - Read matching manifests/logs for any Jira, Confluence, or FigJam records the task touches.
   - Preserve unrelated dirty files.

2. Change Git first when meaning changes:
   - Update the source Markdown, CSV, ADR, schema note, or diagram source.
   - Keep stable ids and URLs intact.
   - Use small commits for coherent slices.

3. Sync Confluence when a published source changes:
   - Use `analysis/confluence/page-manifest.csv` to find the page.
   - Update the Confluence page body from the local source or generated Markdown copy.
   - Update manifest notes only when useful; avoid self-referential commit-hash churn for the Page Manifest row.
   - Record source commits for pages that have meaningful source changes.

4. Sync Jira when backlog meaning or status changes:
   - Local story text and acceptance criteria live in Git until intentionally synced.
   - Jira status is authoritative after import.
   - If local status expectations change, reconcile Jira and local CSV/import-history together.
   - Because Jira docs link to the Portfolio Confluence space, prefer that single docs bridge unless a story needs a
     specific page link.

5. Sync FigJam when diagram meaning or board organization changes:
   - Update local Mermaid/source docs first.
   - Regenerate or refresh FigJam only after the source is clear.
   - Keep the board in the `Portfolio` project folder with title `Portfolio Analysis Diagrams`.
   - Use sections for visible grouping and navigation labels.
   - Keep generated shapes and connectors at page level unless nesting has been visually verified. FigJam connector
     routing can break when generated connectors are reparented.
   - Update `figjam-section-manifest.csv` and `figjam-creation-log.md` with section URLs and generation notes.

6. Verify before handoff:
   - Parse CSV manifests.
   - Spot-check Confluence pages that changed.
   - Check Jira status mapping when Jira changed.
   - Inspect FigJam structure or screenshot when FigJam changed.
   - Commit only the intended files.

## Quick Checks

Use PowerShell from the repo root:

```powershell
Import-Csv analysis\confluence\page-manifest.csv | Group-Object Status
Import-Csv analysis\jira\backlog.csv | Group-Object Status
Import-Csv analysis\jira\epics.csv | Group-Object Status
Import-Csv analysis\design\figjam-section-manifest.csv | Group-Object Status
rg -n "Retrospective status|retrospective|already existing|Existing implementation" analysis
```

For FigJam MCP checks, confirm:

- `Portfolio Analysis Diagrams` is the file title in the UI.
- Top-level board structure includes seven sections, generated shapes, and generated connectors.
- There are no extra `Generated diagram label` text nodes.

## Handoff Note

If an external update cannot be completed, leave a precise note in the relevant local log:

- Confluence: `analysis/confluence/page-manifest.csv` or `analysis/confluence/publishing-runbook.md`.
- Jira: `analysis/jira/import-history.md`.
- FigJam: `analysis/design/figjam-creation-log.md`.
- General readiness: `analysis/operations/handoff-readiness-tracker.md`.
