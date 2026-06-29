# Tool Setup Plan

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira

## Purpose

This plan coordinates how the local analysis suite should move into Confluence, Jira, and FigJam while Git remains the
source for technical artifacts. It exists so external tool setup can happen in small, reversible steps instead of as one
large migration.

## Setup Sequence

| Step | Tool | Output | Local source |
| --- | --- | --- | --- |
| 1 | Confluence | Create space and page tree. | `analysis/confluence/page-tree.md` |
| 2 | Confluence | Publish high-level product pages. | `analysis/product` |
| 3 | Jira | Create project, epics, labels, components, workflow. | `analysis/jira/project-setup.md` |
| 4 | Jira | Import or manually create stories from CSV. | `analysis/jira/backlog.csv` |
| 5 | Jira | Record local story id to Jira key mappings. | `analysis/jira/import-history.md` |
| 6 | FigJam | Create diagram file and sections. | `analysis/design/diagram-inventory.md` |
| 7 | FigJam | Recreate/refine local Mermaid sketches. | `analysis/design/diagrams` |
| 8 | Confluence | Link Jira issues, FigJam sections, and GitHub source files. | Tool logs and page metadata |

## Source Of Truth

| Artifact | During local setup | After external setup |
| --- | --- | --- |
| Product/business narrative | `analysis/product` | Confluence readable copy, Git local source retained. |
| Jira execution state | `analysis/jira/backlog.csv` and `user-stories.md` | Jira becomes execution state; local docs preserve context. |
| Diagrams | `analysis/design/diagrams` | FigJam becomes collaborative visual home; local source sketches remain references. |
| ADRs/schema/OpenAPI | GitHub | GitHub remains source of truth. |
| Import mappings/logs | Local docs | Local docs record external ids and links. |

## Tool Readiness Checklist

| Tool | Ready when |
| --- | --- |
| Confluence | Space key, root page, page tree, source metadata, and publishing cadence are defined. |
| Jira | Project key, issue types, components, labels, workflow, epics, CSV mapping, and import history are defined. |
| FigJam | File/section naming, diagram ids, source links, and creation log are defined. |
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
| Batch 2 | Jira project, epics, CSV import, key mapping. | Local story ids map to Jira issue keys. |
| Batch 3 | FigJam file and first four diagram sections. | FigJam sections link to local diagram sources. |
| Batch 4 | Technical reference pages or links. | ADR/schema/API pages point back to GitHub. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| Should Confluence pages be manually copied or imported with automation? | Manual first, automation only after format stabilizes. |
| Should Jira implemented stories import as Done? | Import as Done only if historical work should appear in reports; otherwise import to Backlog with evidence. |
| Should FigJam sections embed Mermaid exports or be redrawn manually? | Redraw manually from source sketches for readability. |

