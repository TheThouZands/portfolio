# PF-DIAG-004 - Blog Comment Flow

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show how account-backed blog comments move from page rendering through submission, persistence, nested rendering, and
future moderation.

Source docs:

- `analysis/product/interaction-policy.md`
- `analysis/technical/adr/0005-preserve-comments-after-user-deletion.md`
- `analysis/jira/user-stories.md`
- `src/blog/actions.ts`
- `tests/blog/comments.test.ts`

## Mermaid Source

```mermaid
flowchart TD
  A["Reader opens blog post"] --> B["Post content renders"]
  B --> C["Comments section renders"]
  C --> D{"Session exists?"}

  D -->|No| E["Read comments only"]
  D -->|Yes| F["Show comment composer"]

  F --> G["Reader writes comment"]
  G --> H["Submit comment action"]
  H --> I["Validate body and post context"]
  I --> J["Persist comment"]
  J --> K["Link to blog post"]
  J --> L["Link to user when available"]
  J --> M["Optional parent comment"]

  K --> N["Fetch comment list"]
  L --> N
  M --> N
  N --> O["Build nested comment tree"]
  O --> P["Render author or fallback label"]
  P --> Q["Thread remains readable"]

  Q --> R["Future moderation states"]
  R --> S["Visible"]
  R --> T["Hidden"]
  R --> U["Removed or redacted"]
  R --> V["Reported"]
```

## FigJam Notes

- Show current behavior and future moderation in separate visual zones.
- Mark account deletion as a preservation path, not a deletion path.
- Link future states to `PF-406`, `PF-407`, and `PF-408`.

## Update Trigger

Update when comment action behavior, moderation schema, rendering states, edit/delete rules, or reporting behavior
changes.

