# Decision Log

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/GitHub

## Purpose

This log records lightweight product, planning, and tooling decisions that are useful to remember but do not require a
full ADR. Technical architecture decisions should still use ADRs.

## Decision Rules

Use this log when:

- The decision affects product direction, tooling, process, or documentation.
- The decision is useful context but not architecture-heavy.
- The decision may later become an ADR if implementation makes it technical.

Use an ADR when:

- The decision changes architecture, schema, security, API contracts, or core implementation boundaries.
- Future maintainers need context near the code.

## Decisions

| ID | Date | Decision | Rationale | Related docs |
| --- | --- | --- | --- | --- |
| DEC-001 | 2026-06-29 | Keep analysis source in local Git first. | External tools are not configured yet, and Git keeps reviewable history. | ADR 0001 |
| DEC-002 | 2026-06-29 | Use local story ids even after Jira import. | Stable ids keep requirements, docs, and commits traceable across tools. | `analysis/jira/project-setup.md`, `analysis/jira/import-history.md` |
| DEC-003 | 2026-06-29 | Treat FigJam as visual collaboration and local Mermaid as source sketches. | Diagrams need collaborative polish later, but source meaning should remain reviewable. | `analysis/design/diagram-inventory.md`, `analysis/design/diagrams` |
| DEC-004 | 2026-06-29 | Keep first conversion path focused on a discovery/build slice. | It matches the service positioning better than a vague contact action. | `analysis/product/conversion-path.md` |

## Open Decision Candidates

| Candidate | Why it is not decided yet |
| --- | --- |
| Whether implemented stories should import into Jira as Done | Depends on how completed work should appear in Jira reporting. |
| Whether comments should allow edit/delete/report controls first | Needs product and moderation design before implementation. |
| Whether public OpenAPI should exist | Deferred by ADR 0006 until stable external API intent exists. |
