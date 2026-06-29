# Media Asset Lifecycle

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: Confluence/Jira

## Purpose

Media assets prove that projects, experience, and posts are real, but unmanaged upload tooling can leave broken images,
missing alt text, duplicate blobs, or storage clutter. This document defines the first media lifecycle for CMS authoring
before an upload manager is built.

Decision record: [ADR 0012](../technical/adr/0012-use-managed-media-asset-lifecycle-for-cms-authoring.md).

## Current Model

| Area | Current support |
| --- | --- |
| Asset library | `media_assets` stores Vercel Blob-oriented pathname, URL, download URL, access mode, metadata, image dimensions, focal point, and timestamps. |
| Localization | `media_asset_translations` stores localized alt text. |
| Content attachments | Projects and blog posts can use cover assets; experience and blog revisions use explicit attachment tables. |
| Roles | `media_role` distinguishes logo, cover, gallery, inline, attachment, and screenshot usage. |
| Access hints | `blob_access` distinguishes public and private assets, but public rendering rules still need owner tooling. |
| Upload UI | Not implemented. Seed data currently proves the storage shape. |

## Lifecycle

| Stage | Rule |
| --- | --- |
| 1. Intake | Owner uploads or imports media through owner-only tooling after the ADR 0010 guard exists. |
| 2. Provisional storage | Temporary blobs should use an implementation-specific staging path or batch id and should not be attached to published content. |
| 3. Metadata capture | Content type, size, dimensions, pathname, URL, download URL, access, and focal point should be recorded when available. |
| 4. Accessibility copy | A default alt text or localized alt text is required before media is attached to published visual content. |
| 5. Attachment | Media becomes content evidence only through explicit references such as cover fields, experience media, blog revision assets, or structural content asset references. |
| 6. Preview | Draft content can preview attached media through owner-authenticated preview routes. |
| 7. Publish | Published content must not reference provisional, private-only, missing, or inaccessible assets. |
| 8. Replace | Replacements should create or select a new asset and update references rather than mutating an existing blob path in place. |
| 9. Retire | Assets should be retired only after references are removed or replaced. |
| 10. Cleanup | Cleanup should run as an owner-reviewed dry run first and should never delete assets still referenced by published or draft content. |

## Publish Gates

| Gate | Requirement |
| --- | --- |
| Ownership | Upload, replacement, retirement, and cleanup actions require owner authorization. |
| Accessibility | Visual media needs meaningful default or localized alt text before publication. |
| Localization | Core portfolio images should have localized alt text for supported locales when the surrounding content is localized. |
| Integrity | Published content cannot reference missing blobs, provisional uploads, or media without required metadata. |
| Access mode | Public pages should use public assets unless a future private delivery path is explicitly designed. |
| Traceability | Blog revision assets and structural content references should remain tied to the revision that uses them. |

## Cleanup And Reconciliation

Cleanup should answer three questions before deleting anything:

- Is the asset referenced by projects, experience, blog revisions, structural content, or company logos?
- Is the blob present in storage but missing from `media_assets`?
- Is the database record present but the blob no longer reachable?

The first implementation should provide a reviewed report before destructive cleanup. Automatic deletion can come later
after the report format, reference checks, and restore path are proven.

## Data Model Implications

The current schema is enough for seeded and manually curated assets. Interactive upload tooling may later need:

- Upload batch or provisional state.
- Uploaded-by owner id.
- Retired or deleted timestamp.
- Checksum or blob version metadata.
- Cleanup report/audit records.

Do not add those fields until owner upload or cleanup tooling is being implemented.

## Requirements Impact

| Requirement | Status |
| --- | --- |
| `FR-019` owner can author and preview CMS content through a managed workflow | Planned implementation; media lifecycle decision accepted in ADR 0012. |
| `NFR-014` authoring preserves structural safety, localization, and previewability | Planned implementation; media publish gates require alt text, accessible blobs, and owner preview. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-207` | Media lifecycle decision is defined before upload tooling. |
| `PF-208` | Owner-only media upload, attachment, replacement, and cleanup tooling remains future implementation work. |

## Deferred Decisions

| Decision | Default |
| --- | --- |
| Exact storage path convention | Choose during implementation after confirming Vercel Blob environment behavior. |
| Dedicated media lifecycle enum | Add only if interactive upload needs schema-backed pending, active, retired, or failed states. |
| Public/private media delivery | Keep public portfolio media public first; design private delivery only for a real protected content use case. |
| Automatic cleanup | Defer until owner-reviewed dry-run reporting is proven. |
