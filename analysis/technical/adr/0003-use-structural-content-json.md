# ADR 0003: Use Structural Content JSON Instead Of Stored Rendered HTML

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

Blog posts and project narratives need richer body content than plain text. The project needs that richness without
turning stored content into unsafe raw HTML or making future editor work depend on fragile string manipulation.

The current system defines a structural content document type: an HTML-shaped JSON tree with allowlisted element types,
typed attributes, tokenized styles, and asset references. Rendering is handled by React components that can filter,
fallback, and evolve with tests.

## Decision

Store editable rich content as structural content JSON, not rendered HTML.

The stored content should represent intent:

- Element type.
- Text nodes.
- Allowlisted attributes.
- Tokenized style data.
- Asset references.
- Revision-scoped source data.

Rendered HTML should be produced at the application boundary by trusted rendering code.

## Consequences

Positive:

- React escaping and renderer filtering reduce raw HTML risk.
- Future editor workflows can work against structured data.
- Assets and mentions can stay attached to specific revisions.
- Rendering behavior can be tested independently from the database.

Tradeoffs:

- The project owns a content contract that must be versioned carefully.
- The renderer must decide how to handle unsupported or unknown content shapes.
- Structural JSON can be more verbose than Markdown or stored HTML.

## Evidence

- `src/cms/structural-content/types.ts`
- `src/components/repeatables/structural-content`
- `tests/structural-content/rendering.test.ts`
- `analysis/technical/schema-and-migrations.md`
- Commits: `1646dd0`, `41794d8`, `5fbd111`, `5640a29`, `c76456a`

## Follow-Ups

- Define migration rules if `structuralContentSchemaVersion` increments.
- Document editor requirements before building a CMS authoring interface.
- Add diagram `PF-DIAG-006` for the rendering contract.

