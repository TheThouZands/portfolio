# Tool Setup Plan

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-30  
Target home: Confluence/Jira

## Purpose

This plan coordinates how the local analysis suite should move into Confluence, Jira, and FigJam while Git remains the
source for technical artifacts. It exists so external tool setup can happen in small, reversible steps instead of as one
large migration.

Execution checklist: `analysis/planning/external-setup-execution-runbook.md`.

## Setup Sequence

| Step | Tool | Output | Local source |
| --- | --- | --- | --- |
| 1 | Confluence | Create space, page tree, and page creation manifest. | `analysis/confluence/page-tree.md`, `analysis/confluence/page-manifest.csv` |
| 2 | Confluence | Publish high-level product pages. | `analysis/product` |
| 3 | Jira | Use connected project, confirm issue types, labels, components, workflow, and create epics. | `analysis/jira/project-setup.md` |
| 4 | Jira | Import or manually create epics and stories from CSV. | `analysis/jira/epics.csv`, `analysis/jira/backlog.csv` |
| 5 | Jira | Record local story id to Jira key mappings. | `analysis/jira/import-history.md` |
| 6 | FigJam | Generate FigJam diagrams from Mermaid sources using the Figma MCP. | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv`, `analysis/design/diagrams` |
| 7 | FigJam | Record generated board or section URLs and regeneration notes. | `analysis/design/figjam-creation-log.md` |
| 8 | Confluence | Link Jira issues, FigJam sections, and GitHub source files. | Tool logs and page metadata |

## Source Of Truth

| Artifact | During local setup | After external setup |
| --- | --- | --- |
| Product/business narrative | `analysis/product` | Confluence readable copy, Git local source retained. |
| Jira execution state | `analysis/jira/user-stories.md`, `analysis/jira/epics.csv`, and `analysis/jira/backlog.csv` | Jira becomes execution state; local docs preserve context. |
| Diagrams | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv`, and `analysis/design/diagrams` | Git Mermaid remains the source of truth; FigJam is a generated visual copy for review and embedding. |
| ADRs/schema/OpenAPI | GitHub | GitHub remains source of truth. |
| Import mappings/logs | Local docs | Local docs record external ids and links. |

## Tool Readiness Checklist

| Tool | Ready when |
| --- | --- |
| Confluence | Space key, root page, page tree, source metadata, and publishing cadence are defined. |
| Jira | Project key, issue types, components, labels, workflow, epics, CSV mapping, and import history are defined. |
| FigJam | Figma connector access, generated-diagram path, diagram ids, source links, and creation log are defined. |
| GitHub | ADR/schema/API ownership and documentation review rules are defined. |

## Setup Rules

- Do not delete or rename local ids after import.
- Add external links beside local ids, not instead of them.
- Record every import or manual copy in a local history file.
- Prefer publishing a small page group first, then checking links and formatting.
- Do not make Confluence the source of truth for ADRs, schema notes, or API contracts.
- Do not make Jira the only place where the reasoning behind a story exists.

## Current Setup Baseline

| Batch | Scope | Current result |
| --- | --- | --- |
| Batch 1 | Confluence root, product, planning, Jira, design, technical, and operations pages. | All 58 current rows in `analysis/confluence/page-manifest.csv` are published with Confluence URLs. |
| Batch 2 | Jira project `KAN`, epics, story import, key mapping, and status mapping. | Seven epics and 50 stories exist as `KAN-1` through `KAN-57`; 40 implemented stories are `Done`, `KAN-24`, `KAN-26`, `KAN-56`, and `KAN-57` are `In Progress`, and planned stories `KAN-17`, `KAN-19`, `KAN-29`, `KAN-30`, `KAN-33`, and `KAN-52` remain `To Do`. |
| Batch 3 | Generated FigJam diagrams for the current Mermaid source inventory. | All nine current diagram rows are generated in the FigJam board and recorded in the section manifest and creation log. |
| Batch 4 | Technical reference pages or links. | ADR, schema, migration, API surface, verification, and traceability pages are published while Git remains authoritative. |

The detailed execution gates for these batches live in `analysis/planning/external-setup-execution-runbook.md`.

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should Confluence pages be manually copied or imported with automation? | Manual first, automation only after format stabilizes. |
| Should Jira implemented stories import as Done? | Answered for the current setup: implemented stories import as `Done`, current-worktree stories as `In Progress`, and planned stories remain `To Do`. |
| How should FigJam diagrams be created? | Use Figma MCP `generate_diagram` from Mermaid. Do not make FigJam canvas edits the maintenance path. |
