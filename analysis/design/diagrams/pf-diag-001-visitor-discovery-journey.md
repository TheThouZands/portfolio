# PF-DIAG-001 - Visitor Discovery Journey

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show how a potential client or reviewer moves from first impression to service-specific action.

Source docs:

- `analysis/product/problem-statement.md`
- `analysis/product/positioning-brief.md`
- `analysis/product/content-strategy.md`
- `analysis/product/conversion-path.md`

## Mermaid Source

```mermaid
flowchart TD
  A["Visitor arrives"] --> B["Localized homepage"]
  B --> C["Hero: identity and values"]
  C --> D["Intro: fullstack systems and durable tools"]
  D --> E{"What proof do they need?"}

  E --> F["Skills scan"]
  E --> G["Experience timeline"]
  E --> H["Featured projects"]
  E --> I["Featured posts"]

  F --> J["Capability match"]
  G --> K["Professional credibility"]
  H --> L["Concrete implementation proof"]
  I --> M["Technical reasoning proof"]

  J --> N["Trust check"]
  K --> N
  L --> N
  M --> N

  N --> O["Architecture, migrations, tests, ADRs"]
  O --> P{"Does the visitor have a service need?"}
  P -->|Yes| Q["Choose service wedge"]
  P -->|Not yet| R["Keep browsing proof content"]
  Q --> S["Start discovery/build slice"]
  R --> E
```

## FigJam Notes

- Use swimlanes for visitor thought, portfolio surface, and proof artifact.
- Mark the current product gap at the final action path.
- Link service wedges to `analysis/product/conversion-path.md`.

## Update Trigger

Update when homepage order, service wedges, proof surfaces, or contact/intake behavior changes.

