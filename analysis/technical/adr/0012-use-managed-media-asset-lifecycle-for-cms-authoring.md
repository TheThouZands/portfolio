# ADR 0012: Use Managed Media Asset Lifecycle For CMS Authoring

Status: Accepted
Date: 2026-06-29
Owner: Thouzands

## Context

The portfolio schema already has a reusable media asset library, localized alt text, blob access hints, and attachment
tables for content that uses media. Seed data proves this shape, but there is no owner upload, replacement, or cleanup
workflow yet.

ADR 0011 defers media upload from the first CMS authoring boundary because upload tooling can create storage clutter,
broken references, missing accessibility copy, or unsafe public/private asset assumptions if it is added as a small form
without lifecycle rules.

## Decision

Use a managed media asset lifecycle for CMS authoring before building upload tooling.

The first media workflow should:

- Require owner authorization for upload, replacement, retirement, and cleanup actions.
- Treat `media_assets` as the durable library for assets that are ready to attach to CMS content.
- Keep provisional uploads out of published content until metadata, access mode, and alt text are complete.
- Require meaningful default or localized alt text before visual media is attached to published content.
- Attach media through explicit content references such as cover fields, experience media, blog revision assets, or
  structural content asset references.
- Replace assets by creating or selecting a new asset and updating references instead of mutating an existing blob path.
- Reconcile database records and blob storage with a reviewed dry-run report before any destructive cleanup.
- Prevent cleanup from deleting assets still referenced by draft or published content.

The first implementation should not add automatic deletion, a public upload surface, client uploads, or a broad media
manager until owner-only upload and reconciliation are proven.

## Consequences

Positive:

- Media authoring has accessibility, localization, and cleanup rules before upload UI exists.
- Existing schema tables remain useful without immediately adding lifecycle columns.
- Public pages are protected from provisional, private-only, missing, or inaccessible assets.
- Cleanup can be reviewed before destructive storage operations.

Tradeoffs:

- First upload tooling will need more validation than a basic file picker.
- Automatic cleanup remains deferred.
- Interactive upload may still need a later migration for batch, state, uploaded-by, retired-at, or audit fields.
- Private media delivery is intentionally not designed until protected content needs it.

## Evidence

- `analysis/product/media-asset-lifecycle.md`
- `analysis/product/cms-authoring-workflow.md`
- `analysis/technical/adr/0011-use-owner-only-source-aware-cms-authoring.md`
- `src/db/schema.ts`
- `scripts/seed-demo-data.mjs`
- Stories: `PF-207`, `PF-208`

## Follow-Ups

- Add owner-only media upload tooling only after the ADR 0010 guard exists.
- Add validation for required metadata, localized alt text, access mode, dimensions, and content type.
- Add a dry-run media reconciliation report before deletion or blob cleanup actions.
- Update schema and migration catalogs if upload state, owner id, retirement, checksum, or cleanup audit fields are added.
- Add tests around reference checks before any automated cleanup ships.
