# External Setup Execution Runbook

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: Confluence/Jira/FigJam/GitHub

## Purpose

This runbook turns the local setup plan and manifests into an execution checklist for the first real Confluence, Jira,
and FigJam setup pass.

Use it when external tool access is available. Until then, it is the local handoff point that explains which files to
trust, what order to follow, what evidence to capture, and which local logs must be updated after setup.

## Required Local Sources

| Tool | Setup source | Mapping or log source | Validation source |
| --- | --- | --- | --- |
| Confluence | `analysis/confluence/page-tree.md`, `analysis/confluence/page-manifest.csv` | `analysis/confluence/publishing-runbook.md` | `Import-Csv analysis\confluence\page-manifest.csv` |
| Jira | `analysis/jira/project-setup.md`, `analysis/jira/epics.csv`, `analysis/jira/backlog.csv` | `analysis/jira/import-history.md` | `Import-Csv analysis\jira\epics.csv`, `Import-Csv analysis\jira\backlog.csv` |
| FigJam | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv` | `analysis/design/figjam-creation-log.md` | `Import-Csv analysis\design\figjam-section-manifest.csv` |
| GitHub | `analysis/github/documentation-rules.md`, `analysis/technical/adr/0008-use-git-owned-manifests-for-external-tool-setup.md` | Commit history | `git status --short`, focused docs commits |

## Preflight

Run these checks before external setup starts:

```powershell
rg --pcre2 "[^\x00-\x7F]" analysis
rg "TO[D]O|TB[D]|FIX[M]E" analysis
Import-Csv analysis\confluence\page-manifest.csv | Measure-Object
Import-Csv analysis\jira\epics.csv | Measure-Object
Import-Csv analysis\jira\backlog.csv | Measure-Object
Import-Csv analysis\design\figjam-section-manifest.csv | Measure-Object
```

Also confirm:

- The setup source commit is known.
- External tool access exists for Confluence, Jira, and FigJam.
- The target Confluence space key is `PPD`.
- The target Jira project key is `PF`.
- The FigJam file name is `Portfolio Analysis Diagrams`.
- Local manifests are committed before copying or importing them.

## Execution Batches

| Batch | Tool | Action | Done when | Local files to update after |
| --- | --- | --- | --- | --- |
| EXT-001 | Confluence | Create space, root page, and first page tree from `page-manifest.csv`. | Root and priority 1 pages exist with source metadata. | `analysis/confluence/page-manifest.csv`, `analysis/confluence/publishing-runbook.md` |
| EXT-002 | Jira | Create project, components, labels, workflow, and epics from `epics.csv`. | Seven local epics have Jira keys and labels/components exist. | `analysis/jira/import-history.md` |
| EXT-003 | Jira | Import or manually create stories from `backlog.csv`. | Local story ids map to Jira keys and parents. | `analysis/jira/import-history.md` |
| EXT-004 | FigJam | Create the FigJam file and first diagram sections from `figjam-section-manifest.csv`. | First four sections have FigJam URLs and source notes. | `analysis/design/figjam-section-manifest.csv`, `analysis/design/figjam-creation-log.md` |
| EXT-005 | Confluence | Link Jira issues, FigJam sections, and GitHub sources back into copied pages. | Priority 1 pages expose source commit, Jira links, FigJam links, and GitHub references. | `analysis/confluence/page-manifest.csv`, relevant source docs |

## Batch Exit Checks

### EXT-001 Confluence

- Space `PPD` exists.
- Root page matches `Portfolio Analysis Home`.
- Priority 1 pages from `analysis/confluence/page-manifest.csv` exist.
- Each copied page includes source file and source commit metadata.
- Page URLs are recorded in `page-manifest.csv`.

### EXT-002 Jira Epics

- Project `PF` exists.
- Components and labels match `analysis/jira/project-setup.md`.
- Seven epics from `analysis/jira/epics.csv` exist.
- Local epic ids remain in summaries or descriptions.
- Epic key mapping is recorded in `analysis/jira/import-history.md`.

### EXT-003 Jira Stories

- `analysis/jira/backlog.csv` imports or is manually recreated.
- Local story ids remain visible after Jira creates issue keys.
- Parent epic links are set.
- Status mapping is intentionally chosen, especially for implemented retrospective stories.
- Story key mapping is recorded in `analysis/jira/import-history.md`.

### EXT-004 FigJam

- FigJam file exists with the planned name.
- First four priority sections exist.
- Each section includes diagram id, local source file, and source docs.
- Section URLs are recorded in both the section manifest and creation log.
- Confluence links can target the section URLs.

### EXT-005 Cross-Linking

- Confluence priority 1 pages link to related Jira issues and FigJam sections where available.
- Jira descriptions link back to Confluence or GitHub sources where useful.
- FigJam sections link or note the Git source files.
- Any external edit that changes meaning is brought back to Git in a follow-up commit.

## Source Commit Record

Before each external setup session, capture:

| Field | Value |
| --- | --- |
| Setup run id | `EXT-SETUP-001` |
| Local branch | `feature/backend` |
| Source commit | Pending until run |
| External tools touched | Confluence, Jira, FigJam |
| Operator | Thouzands |
| Result | Pending |

Record the final values in the relevant logs after execution.

## Failure Handling

| Failure | Response |
| --- | --- |
| Confluence formatting is poor after copy | Fix formatting in Confluence, then update local source only if meaning changed. |
| Jira cannot map epic parents during CSV import | Import stories without parents, then bulk edit parent links and record the choice in import history. |
| Jira status mapping is wrong | Do not rewrite local ids; adjust Jira workflow/statuses and record the mapping decision. |
| FigJam section order needs to change | Update `figjam-section-manifest.csv` before relying on the new order. |
| External URL or key is missing | Leave `Pending` locally and add the missing value in a follow-up setup commit. |

## Completion Criteria

The first external setup pass is complete when:

- Priority 1 Confluence pages exist and have source metadata.
- Jira epics and stories exist with local id mappings.
- FigJam file and first priority sections exist with URLs recorded.
- Git still contains the source manifests and updated external ids/URLs.
- `analysis/planning/readiness-audit.md` is updated to distinguish completed external setup from remaining follow-ups.
