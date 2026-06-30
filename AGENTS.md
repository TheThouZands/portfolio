# Agent Handoff

This repository has an analysis suite that is kept in sync across Git, Confluence, Jira, and FigJam. Future agent
instances should read `.agents/cross-tool-sync.md` before changing analysis, planning, Jira, Confluence, or diagram
artifacts.

## Source Order

- Git is the durable source for local analysis files, ADRs, schema notes, migrations, OpenAPI notes, and manifests.
- Confluence is the readable published copy for product, planning, Jira, design, technical reference, and operations
  pages.
- Jira owns execution status after import, while local Jira files keep stable ids, story text, and import history.
- FigJam is the collaborative visual copy. Local Mermaid sketches and manifests keep diagram meaning and traceability.

## Required Habits

- Start with `git status --short` and preserve unrelated worktree changes.
- Keep local ids stable: `FR-*`, `NFR-*`, `PF-*`, `PF-DIAG-*`, ADR numbers, and Jira keys.
- When an external tool changes, update the matching local manifest or log in the same small slice when practical.
- When local analysis content changes, check whether the matching Confluence page, Jira story, or FigJam diagram also
  needs a sync.
- Do not describe the suite as reverse-engineered from code. Write as normal source planning material.
- Do not nest generated FigJam diagram shapes/connectors inside sections unless connector routing is verified. Sections
  are safe as visible grouping labels; generated shapes and dynamic connectors should remain page-level.

## Useful Entrypoints

- `.agents/cross-tool-sync.md` - cross-tool sync contract and checklist.
- `analysis/operations/artifact-maintenance-matrix.md` - artifact ownership and triggers.
- `analysis/confluence/page-manifest.csv` - Confluence publication index.
- `analysis/jira/import-history.md` - local-to-Jira key mapping.
- `analysis/design/figjam-creation-log.md` - FigJam file and generation history.
