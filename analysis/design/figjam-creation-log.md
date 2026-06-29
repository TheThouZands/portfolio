# FigJam Creation Log

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Figma/FigJam and Confluence

## Purpose

This log records FigJam files and sections created from the local diagram inventory. It keeps visual work connected to
the source docs and local Mermaid sketches.

Use `analysis/design/figjam-section-manifest.csv` as the creation checklist. Use this file as the durable log after a
FigJam file or section URL exists.

## FigJam File

| Field | Value |
| --- | --- |
| File name | Portfolio Analysis Diagrams |
| File URL | Pending |
| Owner | Thouzands |
| Source inventory | `analysis/design/diagram-inventory.md` |
| Section manifest | `analysis/design/figjam-section-manifest.csv` |
| Source sketches | `analysis/design/diagrams` |

## Section Mapping

| Diagram id | FigJam section name | FigJam URL | Local source | Status |
| --- | --- | --- | --- | --- |
| PF-DIAG-001 | Visitor Discovery Journey | Pending | `analysis/design/diagrams/pf-diag-001-visitor-discovery-journey.md` | Source ready |
| PF-DIAG-002 | Portfolio Content Model | Pending | `analysis/design/diagrams/pf-diag-002-portfolio-content-model.md` | Source ready |
| PF-DIAG-003 | Auth Identifier And Session Flow | Pending | `analysis/design/diagrams/pf-diag-003-auth-identifier-session-flow.md` | Source ready |
| PF-DIAG-004 | Blog Comment Flow | Pending | `analysis/design/diagrams/pf-diag-004-blog-comment-flow.md` | Source ready |
| PF-DIAG-005 | Deployment And Neon Branch Workflow | Pending | `analysis/design/diagrams/pf-diag-005-deployment-neon-branch-workflow.md` | Source ready |
| PF-DIAG-006 | Structural Content Rendering Contract | Pending | `analysis/design/diagrams/pf-diag-006-structural-content-rendering-contract.md` | Source ready |
| PF-DIAG-007 | Documentation Toolchain | Pending | `analysis/design/diagrams/pf-diag-007-documentation-toolchain.md` | Source ready |

## Creation Steps

1. Create a FigJam file named `Portfolio Analysis Diagrams`.
2. Create one section for each diagram id.
3. Add the source docs and local source file path in a note near each section title.
4. Redraw or refine the Mermaid source into a readable FigJam diagram.
5. Copy the section URL into this log.
6. Link the FigJam section from Confluence pages that use the diagram.

## Update Rules

- If the meaning changes, update the local source doc first.
- If only layout changes, update FigJam and leave local source unchanged.
- If a diagram becomes obsolete, mark it as Archived rather than deleting the id.
- Keep product journey diagrams visually separate from technical diagrams.
