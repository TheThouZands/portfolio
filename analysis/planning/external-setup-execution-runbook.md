# External Setup Execution Runbook

Status: Draft
Owner: Thouzands
Last updated: 2026-06-30
Target home: Confluence/Jira/FigJam/GitHub

## Purpose

This runbook turns the local setup plan and manifests into an execution checklist and evidence record for Confluence,
Jira, FigJam, and GitHub setup.

Use it when external tool access is available or when a new external-sync batch is needed. It explains which files to
trust, what order to follow, what evidence to capture, and which local logs must be updated after setup.

## Required Local Sources

| Tool | Setup source | Mapping or log source | Validation source |
| --- | --- | --- | --- |
| Confluence | `analysis/confluence/page-tree.md`, `analysis/confluence/page-manifest.csv` | `analysis/confluence/publishing-runbook.md` | `Import-Csv analysis\confluence\page-manifest.csv` |
| Jira | `analysis/jira/project-setup.md`, `analysis/jira/epics.csv`, `analysis/jira/backlog.csv` | `analysis/jira/import-history.md` | `Import-Csv analysis\jira\epics.csv`, `Import-Csv analysis\jira\backlog.csv` |
| FigJam | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv`, `analysis/design/diagrams` | `analysis/design/figjam-creation-log.md` | `Import-Csv analysis\design\figjam-section-manifest.csv` |
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
- The target Confluence space key is `Portfolio` and the space id is `425988`.
- The target Jira project key is `KAN`; local story and epic ids retain the `PF-*`/`PF-E*` analysis prefixes.
- Figma access is authenticated and the Figma MCP `generate_diagram` tool is available for Mermaid to FigJam generation.
- The FigJam file name is `Portfolio Analysis Diagrams` if an existing board is used.
- Local manifests are committed before copying or importing them.

## Execution Batches

| Batch | Tool | Action | Done when | Local files to update after |
| --- | --- | --- | --- | --- |
| EXT-001 | Confluence | Create or use the Portfolio space, root page, and current page tree from `page-manifest.csv`. | All current Confluence manifest rows are published with source metadata and URLs. | `analysis/confluence/page-manifest.csv`, `analysis/confluence/publishing-runbook.md` |
| EXT-002 | Jira | Use the connected Portfolio project, confirm components/labels/workflow, and create epics from `epics.csv`. | Seven local epics have Jira keys and labels/components exist. | `analysis/jira/import-history.md` |
| EXT-003 | Jira | Import or manually create stories from `backlog.csv`. | Local story ids map to Jira keys and parents. | `analysis/jira/import-history.md` |
| EXT-004 | FigJam | Generate diagrams from Mermaid using the Figma MCP and record the generated URLs. | All nine current diagram rows have FigJam URLs or a recorded unsupported-tool reason. | `analysis/design/figjam-section-manifest.csv`, `analysis/design/figjam-creation-log.md` |
| EXT-005 | Confluence | Link Jira issues, FigJam sections, and GitHub sources back into copied pages. | Published pages expose source commit, Jira links, FigJam links, and GitHub references where useful. | `analysis/confluence/page-manifest.csv`, relevant source docs |

## Batch Exit Checks

### EXT-001 Confluence

- Space `Portfolio` exists.
- Existing space homepage `Portfolio Home` exists.
- Analysis root page `Portfolio Analysis Home` exists under `Portfolio Home`.
- Starter container pages exist under `Portfolio Analysis Home`.
- First product content pages exist: `Problem Statement`, `Stakeholders And Personas`, and `Scope And Requirements`.
- Product business-path pages exist: `Positioning Brief`, `Service Offer Catalog`, and `Conversion Path Brief`.
- Planning pages exist: `Roadmap`, `Tool Setup Plan`, `External Setup Execution Runbook`, `Validation Strategy`, `Readiness Audit`, `Requirements Traceability Matrix`, and supporting planning records.
- Jira pages exist: `Backlog Notes`, `User Stories`, `Jira Project Setup`, and `Import History`.
- Design overview pages exist: `Diagram Inventory`, `FigJam Section Manifest`, and `Diagram Sources`.
- Generated diagram pages exist for the current nine-diagram inventory.
- Technical pages exist: `Traceability`, `Schema And Migrations`, `Schema Table Catalog`, `Migration Catalog`, `API Surface Inventory`, `Verification Catalog`, and `ADR Index`.
- Operations pages exist: `Artifact Maintenance Matrix`, `Confluence Publishing Runbook`, `Page Manifest`, and supporting operations records.
- No Confluence rows remain pending in `analysis/confluence/page-manifest.csv`.
- Each copied page includes source file and source commit metadata.
- Page URLs are recorded in `page-manifest.csv`.

### EXT-002 Jira Epics

- Project `KAN` exists and is named Portfolio.
- Project issue types include Epic, Story, Task, Feature, Bug, and Subtask.
- Labels match `analysis/jira/project-setup.md`; Jira components still need a separate setup pass if component fields are enabled later.
- Seven epics from `analysis/jira/epics.csv` exist as `KAN-1` through `KAN-7`.
- Local epic ids remain in summaries or descriptions.
- Epic key mapping is recorded in `analysis/jira/import-history.md`.

### EXT-003 Jira Stories

- `analysis/jira/backlog.csv` imports or is manually recreated in batches.
- Local story ids remain visible after Jira creates issue keys.
- Parent epic links are set; the `PF-E01` through `PF-E07` batches verified `parent = KAN-1` through `parent = KAN-7`.
- Status mapping is intentionally chosen and applied: created implemented stories are `Done`, no story issues are
  currently `In Progress`, and planned created stories remain `To Do`.
- Story key mapping is recorded in `analysis/jira/import-history.md`.

### EXT-004 FigJam

- Figma connector access is verified; authenticated account has one available Pro team plan.
- All nine current Mermaid diagram sources are generated through the MCP in `https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW`.
- No current FigJam manifest rows remain pending.
- Each generated diagram name includes the diagram id and title.
- Generated FigJam board URL is recorded in both the section manifest and creation log.
- Confluence links can target the board URL until section-specific anchors are available.

### EXT-005 Cross-Linking

- Confluence pages link to related Jira issues and FigJam sections where available.
- Jira descriptions link back to Confluence or GitHub sources where useful.
- FigJam sections link or note the Git source files.
- Any external edit that changes meaning is brought back to Git in a follow-up commit.

## Source Commit Record

Before each external setup session, capture:

| Field | Value |
| --- | --- |
| Setup run id | `EXT-SETUP-001` |
| Local branch | `feature/backend` |
| Source commit | Setup history spans the recorded Confluence, Jira, and FigJam batches: starter pages `86015e1`; Jira import and status records from `86a2d97` through `fd213fb`; product, planning, Jira, design, diagram, technical, and operations Confluence publication batches from `4ced0fc` through `bf2900b`; remaining FigJam generation batch `b5249e3`; diagram/page state sync `695e4d8`; remaining analysis-page publication `39b5f6a`. |
| External tools touched | Confluence, Jira read/write checks, Figma/FigJam diagram generation |
| Operator | Thouzands |
| Result | EXT-001 starter pages created; product, planning, Jira, design, diagram, technical, and operations pages published in Confluence; all 58 current Confluence manifest rows have external URLs; remaining FigJam diagram batch `PF-DIAG-004`, `PF-DIAG-005`, and `PF-DIAG-006` generated from source commit `b5249e3`; diagram and page publication state synced from source commit `695e4d8`; remaining analysis pages published and recorded from source commit `39b5f6a`; Jira project `KAN` is visible; Jira epics `KAN-1` through `KAN-7` created; stories `KAN-8` through `KAN-63` created under `KAN-1` through `KAN-7`; 45 implemented stories are `Done`; no story issues are currently `In Progress`; planned stories `KAN-17`, `KAN-19`, `KAN-30`, `KAN-33`, `KAN-52`, and `KAN-58` through `KAN-63` remain `To Do`; Jira Backlog Confluence page version 14 was synced before the `KAN-58` through `KAN-63` additions; current Confluence manifest publication, Jira story import, and FigJam diagram generation are otherwise complete |

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

The current external setup baseline is complete when:

- Current Confluence manifest pages exist and have source metadata.
- Jira epics and stories exist with local id mappings.
- FigJam file and current diagram inventory exist with URLs recorded.
- Git still contains the source manifests and updated external ids/URLs.
- `analysis/planning/readiness-audit.md` is updated to distinguish completed external setup from remaining follow-ups.
