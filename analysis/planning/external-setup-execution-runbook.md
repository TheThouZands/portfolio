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
| EXT-001 | Confluence | Create or use the Portfolio space, root page, and first page tree from `page-manifest.csv`. | Root and starter container pages exist with source metadata; priority 1 content pages can follow in smaller batches. | `analysis/confluence/page-manifest.csv`, `analysis/confluence/publishing-runbook.md` |
| EXT-002 | Jira | Use the connected Portfolio project, confirm components/labels/workflow, and create epics from `epics.csv`. | Seven local epics have Jira keys and labels/components exist. | `analysis/jira/import-history.md` |
| EXT-003 | Jira | Import or manually create stories from `backlog.csv`. | Local story ids map to Jira keys and parents. | `analysis/jira/import-history.md` |
| EXT-004 | FigJam | Generate the first diagrams from Mermaid using the Figma MCP and record the generated URLs. | First four diagram rows have FigJam URLs or a recorded unsupported-tool reason. | `analysis/design/figjam-section-manifest.csv`, `analysis/design/figjam-creation-log.md` |
| EXT-005 | Confluence | Link Jira issues, FigJam sections, and GitHub sources back into copied pages. | Priority 1 pages expose source commit, Jira links, FigJam links, and GitHub references. | `analysis/confluence/page-manifest.csv`, relevant source docs |

## Batch Exit Checks

### EXT-001 Confluence

- Space `Portfolio` exists.
- Existing space homepage `Portfolio Home` exists.
- Analysis root page `Portfolio Analysis Home` exists under `Portfolio Home`.
- Starter container pages exist under `Portfolio Analysis Home`.
- Priority 1 content pages from `analysis/confluence/page-manifest.csv` remain the next Confluence batch.
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
- Status mapping is intentionally chosen and applied: created implemented stories are `Done`, current-worktree stories
  `KAN-24` and `KAN-26` are `In Progress`, and planned created stories remain `To Do`.
- Story key mapping is recorded in `analysis/jira/import-history.md`.

### EXT-004 FigJam

- Figma connector access is verified; authenticated account has one available Pro team plan.
- First four priority Mermaid diagrams are generated through the MCP, or unsupported diagram types are explicitly left pending.
- Each generated diagram name includes the diagram id and title.
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
| Source commit | `86015e1` for EXT-001 starter pages; `dd6c8a4` for the Jira access check; `86a2d97` for the Jira epic import source; `eab5f40` for the local epic key mapping; `b980ebb` for the first story batch source; `4b664c6` for the local first story mapping; `e50da91` for the second story batch source; `ca99f14` for the local second story mapping; `3bc7001` for the Jira status reconciliation source; `14b9eb9` for the local status mapping record and Confluence Jira Backlog sync source; `1a94d4e` for the `PF-E03` story import source; `cc8586f` for the `PF-E03` story mapping and Confluence Jira Backlog sync source; `4024a94` for the `PF-E04` story import source; `80a2d1d` for the `PF-E04` story mapping and Confluence Jira Backlog sync source; `0ce05cd` for the `PF-E05` story import source; `da7214d` for the `PF-E05` story mapping and Confluence Jira Backlog sync source; `38f82ed` for the `PF-E06` story import source; `3bac758` for the `PF-E06` story mapping and Confluence Jira Backlog sync source; `aaf0128` for the `PF-E07` story import source |
| External tools touched | Confluence, Jira read/write checks |
| Operator | Thouzands |
| Result | EXT-001 starter pages created; Jira project `KAN` is visible; Jira epics `KAN-1` through `KAN-7` created; stories `KAN-8` through `KAN-55` created under `KAN-1` through `KAN-7`; implemented created stories are `Done`; current-worktree stories are `In Progress`; planned created stories remain `To Do`; Jira Backlog Confluence page version 12 was synced; Figma connector and Mermaid-to-FigJam generation path verified; Jira story import is complete and FigJam diagram generation is pending |

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
