# PF-DIAG-005 - Deployment And Neon Branch Workflow

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show how local and Vercel workflows should apply Drizzle migrations against the intended Neon database branch, with
feature-branch development sharing the `preview/<git-branch>` Neon branch used by Vercel preview deployments.

Source docs:

- `README.md`
- `src/db/db.md`
- `analysis/technical/schema-and-migrations.md`
- `analysis/technical/adr/0002-use-drizzle-schema-and-migrations.md`
- `scripts/sync-neon-branch.mjs`

## Mermaid Source

```mermaid
flowchart TD
  A["Developer selects git branch"] --> B["Run db:branch:sync"]
  B --> C["Derive preview/<git-branch> Neon branch"]
  C --> D["Create or reuse Neon branch"]
  D --> E["Write branch URLs to .env.local"]
  E --> F{"Shell env already has PF_DATABASE_URL?"}

  F -->|Yes| G["Risk: stale exported URL wins"]
  F -->|No| H["Use .env.local branch URL"]

  G --> I["Restart clean terminal or reload env"]
  I --> H

  H --> J["Run db:migrate"]
  J --> K["Apply committed Drizzle migrations"]
  K --> L["Run app or seed demo data"]

  M["Vercel preview build"] --> N["Neon integration injects preview/<git-branch> database URL"]
  N --> O["Run build:vercel"]
  O --> P["db:migrate"]
  P --> Q["next build"]

  R["Vercel production build"] --> S["Use production database environment"]
  S --> O
```

## FigJam Notes

- Use separate lanes for local developer workflow, Vercel preview deployment workflow, and production deployment
  workflow.
- Emphasize the stale environment variable warning.
- Link migration ownership to ADR 0002.

## Update Trigger

Update when Neon branch sync, Vercel build scripts, environment variable names, or migration commands change.
