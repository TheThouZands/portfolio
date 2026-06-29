# Diagram Sources

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Figma/FigJam, Confluence, GitHub

## Purpose

These files are local Mermaid source sketches for diagrams that are generated or ready to generate in FigJam. They keep
the diagram intent reviewable in Git while FigJam holds the collaborative visual copy.

The source of truth is still split by artifact type:

- Product and technical meaning: local analysis docs.
- Collaborative visual board: generated FigJam diagrams.
- FigJam setup checklist: `analysis/design/figjam-section-manifest.csv`.
- Lightweight source sketch: these Mermaid files.

## Current Diagram Sources

| ID | File | FigJam target |
| --- | --- | --- |
| PF-DIAG-001 | [pf-diag-001-visitor-discovery-journey.md](pf-diag-001-visitor-discovery-journey.md) | Visitor Discovery Journey |
| PF-DIAG-002 | [pf-diag-002-portfolio-content-model.md](pf-diag-002-portfolio-content-model.md) | Portfolio Content Model |
| PF-DIAG-003 | [pf-diag-003-auth-identifier-session-flow.md](pf-diag-003-auth-identifier-session-flow.md) | Auth Identifier And Session Flow |
| PF-DIAG-004 | [pf-diag-004-blog-comment-flow.md](pf-diag-004-blog-comment-flow.md) | Blog Comment Flow |
| PF-DIAG-005 | [pf-diag-005-deployment-neon-branch-workflow.md](pf-diag-005-deployment-neon-branch-workflow.md) | Deployment And Neon Branch Workflow |
| PF-DIAG-006 | [pf-diag-006-structural-content-rendering-contract.md](pf-diag-006-structural-content-rendering-contract.md) | Structural Content Rendering Contract |
| PF-DIAG-007 | [pf-diag-007-documentation-toolchain.md](pf-diag-007-documentation-toolchain.md) | Documentation Toolchain |

## Usage Rules

- Keep diagram ids stable.
- Keep Mermaid source small enough to review in Git.
- Use the Figma MCP generation path for collaborative FigJam copies and annotations.
- Link the FigJam section back to the source doc after creation.
- Update the source doc when a diagram meaning changes materially.
- Prefer separate diagrams over one overloaded master diagram.
- Avoid manual FigJam-only maintenance; regenerate from Mermaid when the meaning changes.

## Remaining Work

Every current source sketch has a generated FigJam diagram in the shared board. Remaining work is to keep Confluence
links current as lower-priority pages are published and to replace board-level links with section-specific anchors if
the Figma connector exposes durable section URLs later.
