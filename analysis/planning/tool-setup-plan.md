# Tool Setup Plan

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
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
| 6 | FigJam | Create diagram file and sections. | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv` |
| 7 | FigJam | Recreate/refine local Mermaid sketches and record URLs. | `analysis/design/diagrams`, `analysis/design/figjam-creation-log.md` |
| 8 | Confluence | Link Jira issues, FigJam sections, and GitHub source files. | Tool logs and page metadata |

## Source Of Truth

| Artifact | During local setup | After external setup |
| --- | --- | --- |
| Product/business narrative | `analysis/product` | Confluence readable copy, Git local source retained. |
| Jira execution state | `analysis/jira/user-stories.md`, `analysis/jira/epics.csv`, and `analysis/jira/backlog.csv` | Jira becomes execution state; local docs preserve context. |
| Diagrams | `analysis/design/diagram-inventory.md`, `analysis/design/figjam-section-manifest.csv`, and `analysis/design/diagrams` | FigJam becomes collaborative visual home; local source sketches remain references. |
| ADRs/schema/OpenAPI | GitHub | GitHub remains source of truth. |
| Import mappings/logs | Local docs | Local docs record external ids and links. |

## Tool Readiness Checklist

| Tool | Ready when |
| --- | --- |
| Confluence | Space key, root page, page tree, source metadata, and publishing cadence are defined. |
| Jira | Project key, issue types, components, labels, workflow, epics, CSV mapping, and import history are defined. |
| FigJam | File/section naming, diagram ids, section manifest, source links, and creation log are defined. |
| GitHub | ADR/schema/API ownership and documentation review rules are defined. |

## Setup Rules

- Do not delete or rename local ids after import.
- Add external links beside local ids, not instead of them.
- Record every import or manual copy in a local history file.
- Prefer publishing a small page group first, then checking links and formatting.
- Do not make Confluence the source of truth for ADRs, schema notes, or API contracts.
- Do not make Jira the only place where the reasoning behind a story exists.

## First Setup Batch

| Batch | Scope | Exit check |
| --- | --- | --- |
| Batch 1 | Confluence root, product analysis pages, roadmap. | Pages exist and link back to Git source files. |
| Batch 2 | Jira project `KAN`, epics, CSV import, key mapping. | Epic keys and the `PF-E01`/`PF-E02` story keys are mapped; remaining local story ids still need Jira issue keys. |
| Batch 3 | FigJam file and first four diagram sections. | Section manifest rows have FigJam URLs and link to local diagram sources. |
| Batch 4 | Technical reference pages or links. | ADR/schema/API pages point back to GitHub. |

The detailed execution gates for these batches live in `analysis/planning/external-setup-execution-runbook.md`.

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should Confluence pages be manually copied or imported with automation? | Manual first, automation only after format stabilizes. |
| Should Jira implemented stories import as Done? | Import as Done only if historical work should appear in reports; otherwise import to Backlog with evidence. |
| Should FigJam sections embed Mermaid exports or be redrawn manually? | Redraw manually from source sketches for readability. |
