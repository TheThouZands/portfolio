# Diagram Sources

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Figma/FigJam, Confluence, GitHub

## Purpose

These files are local source sketches for diagrams that should later be recreated or refined in FigJam. They keep the
diagram intent reviewable in Git before connected design tooling is set up.

The source of truth is still split by artifact type:

- Product and technical meaning: local analysis docs.
- Collaborative visual board: future FigJam sections.
- Lightweight source sketch: these Mermaid files.

## Current Diagram Sources

| ID | File | FigJam target |
| --- | --- | --- |
| PF-DIAG-001 | [pf-diag-001-visitor-discovery-journey.md](pf-diag-001-visitor-discovery-journey.md) | Visitor Discovery Journey |
| PF-DIAG-002 | [pf-diag-002-portfolio-content-model.md](pf-diag-002-portfolio-content-model.md) | Portfolio Content Model |
| PF-DIAG-003 | [pf-diag-003-auth-identifier-session-flow.md](pf-diag-003-auth-identifier-session-flow.md) | Auth Identifier And Session Flow |
| PF-DIAG-007 | [pf-diag-007-documentation-toolchain.md](pf-diag-007-documentation-toolchain.md) | Documentation Toolchain |

## Usage Rules

- Keep diagram ids stable.
- Keep Mermaid source small enough to review in Git.
- Use FigJam for polished collaborative layout and annotations.
- Link the FigJam section back to the source doc after creation.
- Update the source doc when a diagram meaning changes materially.
- Prefer separate diagrams over one overloaded master diagram.

## Missing Diagram Sources

| ID | Title | Reason to add later |
| --- | --- | --- |
| PF-DIAG-004 | Blog Comment Flow | Should follow the interaction policy and active comment implementation. |
| PF-DIAG-005 | Deployment And Neon Branch Workflow | Should follow operational documentation and migration workflow. |
| PF-DIAG-006 | Structural Content Rendering Contract | Should follow the structural content ADR and renderer tests. |

