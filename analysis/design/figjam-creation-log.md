# FigJam Creation Log

Status: Current diagram inventory generated
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Figma/FigJam and Confluence

## Purpose

This log records FigJam files and generated diagrams created from the local diagram inventory. It keeps visual work
connected to the source docs and local Mermaid sketches.

Use `analysis/design/figjam-section-manifest.csv` as the creation checklist. Use this file as the durable log after a
FigJam file or section URL exists.

## FigJam File

| Field | Value |
| --- | --- |
| File title | PF-DIAG-007 - Documentation Toolchain |
| File contents | Seven generated diagrams, `PF-DIAG-001` through `PF-DIAG-007` |
| File URL | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW |
| Project folder | Portfolio |
| Project URL | https://www.figma.com/files/team/1285044710574723356/project/619873187 |
| Owner | Thouzands |
| Source inventory | `analysis/design/diagram-inventory.md` |
| Section manifest | `analysis/design/figjam-section-manifest.csv` |
| Source sketches | `analysis/design/diagrams` |

## Section Mapping

| Diagram id | FigJam section name | FigJam URL | Local source | Status |
| --- | --- | --- | --- | --- |
| PF-DIAG-001 | Visitor Discovery Journey | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-001-visitor-discovery-journey.md` | Generated |
| PF-DIAG-002 | Portfolio Content Model | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-002-portfolio-content-model.md` | Generated |
| PF-DIAG-003 | Auth Identifier And Session Flow | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-003-auth-identifier-session-flow.md` | Generated |
| PF-DIAG-004 | Blog Comment Flow | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-004-blog-comment-flow.md` | Generated |
| PF-DIAG-005 | Deployment And Neon Branch Workflow | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-005-deployment-neon-branch-workflow.md` | Generated |
| PF-DIAG-006 | Structural Content Rendering Contract | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-006-structural-content-rendering-contract.md` | Generated |
| PF-DIAG-007 | Documentation Toolchain | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | `analysis/design/diagrams/pf-diag-007-documentation-toolchain.md` | Generated |

## Generation History

| Date | Source commit | Diagrams | FigJam URL | Notes |
| --- | --- | --- | --- | --- |
| 2026-06-29 | `2ca08e0` | `PF-DIAG-007`, `PF-DIAG-001`, `PF-DIAG-002`, `PF-DIAG-003` | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | Generated through Figma MCP `generate_diagram`; Git Mermaid remains source of truth. |
| 2026-06-29 | `b5249e3` | `PF-DIAG-004`, `PF-DIAG-005`, `PF-DIAG-006` | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | Generated through Figma MCP `generate_diagram` into the existing FigJam board; Git Mermaid remains source of truth. |
| 2026-06-29 | `a9cdad4` | `PF-DIAG-007` | https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW | Refreshed the documentation-toolchain wording in place: the old implementation-first label became `Delivery evidence`, and the backward connector into `analysis/` was removed. |
| 2026-06-29 | N/A | `PF-DIAG-001` through `PF-DIAG-007` | https://www.figma.com/files/team/1285044710574723356/project/619873187 | Moved the single FigJam file containing all seven generated diagrams from Drafts into the `Portfolio` project folder. |

## Generation Steps

1. Use the Figma MCP `generate_diagram` tool with the Mermaid source from `analysis/design/diagrams`.
2. Generate into an existing FigJam file when a file key exists; otherwise let the tool create the first FigJam artifact.
3. Name each generated diagram with the stable `PF-DIAG-*` id and title.
4. Copy the generated FigJam URL into this log and `figjam-section-manifest.csv`.
5. Link the FigJam diagram from Confluence pages that use it.
6. If the generation tool cannot support a diagram type, keep the Mermaid source in Git and mark the FigJam URL as `Pending`.

## Update Rules

- If the meaning changes, update the local source doc first.
- If only layout changes, regenerate from Mermaid or accept the generated layout as-is; avoid manual FigJam-only maintenance.
- If a diagram becomes obsolete, mark it as Archived rather than deleting the id.
- Keep product journey diagrams visually separate from technical diagrams.
