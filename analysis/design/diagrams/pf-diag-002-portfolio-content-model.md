# PF-DIAG-002 - Portfolio Content Model

Status: Draft source  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: FigJam and Confluence

## Purpose

Show the CMS content model at a readable product/technical level without requiring reviewers to inspect every table in
`src/db/schema.ts`.

Source docs:

- `analysis/technical/schema-and-migrations.md`
- `analysis/technical/adr/0002-use-drizzle-schema-and-migrations.md`
- `analysis/technical/adr/0003-use-structural-content-json.md`
- `src/db/schema.ts`

## Mermaid Source

```mermaid
flowchart TD
  CE["content_entities"] --> CO["companies"]
  CE --> EX["experience"]
  CE --> SK["skills"]
  CE --> PR["projects"]
  CE --> BP["blog_posts"]

  CO --> COT["company_translations"]
  EX --> EXT["experience_translations"]
  EX --> EB["experience_bullets"]
  EB --> EBT["experience_bullet_translations"]
  EX --> EM["experience_media"]
  EM --> EMT["experience_media_translations"]

  SK --> SKT["skill_translations"]
  EX --> ESK["experience_skills"]
  SK --> ESK
  PR --> PSK["project_skills"]
  SK --> PSK

  PR --> PRT["project_translations"]
  PR --> PH["project_highlights"]
  PH --> PHT["project_highlight_translations"]
  PR --> PREV["project_revisions"]

  BP --> BPT["blog_post_translations"]
  BP --> BREV["blog_post_revisions"]
  BREV --> BM["blog_post_mentions"]
  BREV --> BA["blog_post_assets"]
  BP --> CM["comments"]

  MA["media_assets"] --> MAT["media_asset_translations"]
  MA --> EM
  MA --> BA

  BREV --> SC["structural content JSON"]
  PREV --> SC
  BM --> CE
```

## FigJam Notes

- Group entities by domain: identity, portfolio proof, blog, media, revisions, interaction.
- Show translation tables as secondary nodes around their parent content.
- Keep comments visually separate from CMS authoring content.

## Update Trigger

Update after major schema changes, new content relationships, or migration groups that change product meaning.

