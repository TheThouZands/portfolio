# PF-DIAG-008 - User Role Authorization Model

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-30  
Target home: FigJam and Confluence

## Purpose

Show the planned Reader, Moderator, and Owner role vocabulary before schema, migration, or guard implementation. The
diagram keeps role-driven UI affordances separate from server-authoritative authorization checks.

Source docs:

- `analysis/product/auth-account-roadmap.md`
- `analysis/technical/adr/0010-use-explicit-owner-allowlist-for-protected-tools.md`
- `analysis/jira/user-stories.md`
- `KAN-56`

## Mermaid Source

```mermaid
flowchart LR
  A(["Anonymous visitor"]) -->|"Public content"| B["Read portfolio"]
  A -->|"Sign up or sign in"| C["Better Auth session"]

  C -->|"Default role"| D["Reader"]
  C -->|"Planned role lookup"| E{"Server role"}
  E -->|"Reader"| D
  E -->|"Moderator"| F["Moderator"]
  E -->|"Owner"| G["Owner"]

  D --> H["Post comments"]
  F --> I["Moderate comments"]
  G --> J["Owner tools"]
  J --> K["CMS authoring"]
  J --> L["Admin decisions"]

  M["Client UI state"] -->|"Shows affordances"| D
  M -->|"Shows affordances"| F
  M -->|"Shows affordances"| G

  D --> N["Server guard"]
  F --> N
  G --> N
  N -->|"Allows or rejects"| O{"Privileged action"}
  O -->|"Allowed"| P["Action runs"]
  O -->|"Rejected"| Q["Reject request"]
```

## FigJam Notes

- FigJam section: `PF-DIAG-008 - User Role Authorization Model`.
- Section URL: `https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW/Portfolio-Analysis-Diagrams?node-id=25-841`.
- Generated shapes and connectors remain page-level for connector-routing safety; the section is a visible grouping
  label.
- Keep role storage and guard implementation out of scope until `PF-412` reviews the migration and server helper design.

## Update Trigger

Update when role names, role storage, authorization guards, moderation capabilities, owner tools, or CMS authoring
privilege boundaries change.
