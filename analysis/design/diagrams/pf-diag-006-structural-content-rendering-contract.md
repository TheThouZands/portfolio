# PF-DIAG-006 - Structural Content Rendering Contract

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show how stored structural content becomes rendered output without storing or trusting raw HTML.

Source docs:

- `analysis/technical/adr/0003-use-structural-content-json.md`
- `src/cms/structural-content/types.ts`
- `src/components/repeatables/structural-content`
- `tests/structural-content/rendering.test.ts`

## Mermaid Source

```mermaid
flowchart TD
  A["CMS authoring or seed data"] --> B["StructuralContentDocument"]
  B --> C["version"]
  B --> D["content tree"]
  D --> E["text nodes"]
  D --> F["allowlisted element types"]
  D --> G["allowlisted attributes"]
  D --> H["token style data"]
  D --> I["asset references"]

  B --> J["Stored in revision source_json"]
  J --> K{"Render request"}
  K --> L["Renderer reads structural content"]
  L --> M{"Known element?"}

  M -->|Yes| N["Render supported React element"]
  M -->|No| O["Fallback without losing content"]

  N --> P["Filter unsafe attributes"]
  O --> P
  P --> Q["React escapes text"]
  Q --> R["Rendered portfolio content"]

  R --> S["Tests verify nesting, fallback, filters, empty state"]
```

## FigJam Notes

- Separate storage contract, rendering boundary, and test coverage.
- Mark raw HTML as intentionally absent from the main path.
- Link schema version changes to future migration policy.

## Update Trigger

Update when structural schema version, supported elements, attribute filtering, asset handling, or renderer fallback
behavior changes.

