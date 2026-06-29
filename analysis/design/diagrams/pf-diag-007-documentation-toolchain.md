# PF-DIAG-007 - Documentation Toolchain

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show how local Git-tracked analysis feeds Confluence, Jira, FigJam, and GitHub technical artifacts.

Source docs:

- `analysis/README.md`
- `analysis/confluence/page-tree.md`
- `analysis/jira/project-setup.md`
- `analysis/design/diagram-inventory.md`
- `analysis/github/documentation-rules.md`

## Mermaid Source

```mermaid
flowchart LR
  A["analysis/"] --> B["Confluence product and planning pages"]
  A --> C["Jira stories and backlog import"]
  A --> D["FigJam diagrams"]
  A --> E["GitHub technical docs"]

  B --> B1["Problem, scope, positioning, content, conversion, policy"]
  C --> C1["Epics, stories, priorities, acceptance criteria"]
  D --> D1["Journey, content model, auth flow, comment flow"]
  E --> E1["ADRs, schema notes, OpenAPI planning, traceability"]

  F["Existing implementation"] --> A
  F --> F1["Code paths"]
  F --> F2["Migrations"]
  F --> F3["Tests"]
  F --> F4["Commits"]

  C1 --> G["Future delivery slices"]
  E1 --> G
  B1 --> G
  D1 --> G
  G --> F
```

## FigJam Notes

- Put `analysis/` in the center as the local starting point.
- Show GitHub as authoritative for ADRs, schema, and API contracts.
- Show Jira as execution state, not full narrative context.
- Show Confluence as the readable product/business home.

## Update Trigger

Update when the source-of-truth rules change or connected Confluence/Jira/FigJam workflows are established.

