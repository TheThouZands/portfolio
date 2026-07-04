# ADR 0011: Use Owner-Only Source-Aware CMS Authoring

Status: Accepted
Date: 2026-06-29
Owner: Thouzands

## Context

The portfolio already stores CMS content in PostgreSQL, uses lifecycle statuses, and renders blog/project rich bodies from
structural content JSON. Seed scripts and direct data workflows can create content today, but they are not a durable
authoring experience for ongoing portfolio updates.

ADR 0003 makes structural content JSON the source of truth instead of stored rendered HTML. ADR 0010 defines the first
owner authorization model as an explicit server-side owner allowlist. The CMS authoring workflow now needs an
implementation boundary so future admin work does not become isolated forms, unsafe rich-text storage, or premature
multi-user account scope.

## Decision

Build the first CMS authoring surface as owner-only protected admin route(s), guarded by the shared owner authorization
helper required by ADR 0010.

The first authoring version should:

- Start with blog posts and projects, because they prove the richest writing and case-study workflow.
- Keep structural content JSON authoritative; do not store arbitrary rendered HTML as editable body content.
- Use source-aware constrained forms or structured block controls before any freeform WYSIWYG editor.
- Support draft, edit, authenticated preview, validation, publish or testing status, and revision/audit review.
- Keep preview authenticated and owner-only at first instead of creating public draft links or unguessable preview tokens.
- Add author/editor, audit, preview, or validation fields only through a planned migration when implementation requires
  them.

The first version should not add:

- General role-based access control, teams, client accounts, or collaborator accounts.
- Public user-generated content authoring.
- Public draft sharing links.
- A media upload manager or complete asset lifecycle.
- A rich-text editor that can emit arbitrary HTML outside the structural content contract.

## Consequences

Positive:

- Owner authoring now has a clear route, authorization, preview, and editor boundary before implementation.
- The structural content contract stays intact while a future editor is designed around it.
- The first CMS slice can be built and tested without introducing a role system or client portal.
- Blog/project authoring can validate the hardest content path before lower-priority content types are added.

Tradeoffs:

- The first editor will be less comfortable than a polished visual editor.
- Private preview sharing with collaborators remains deferred.
- Media upload and cleanup still need a separate lifecycle decision.
- Future multi-owner or collaborator workflows will need a new authorization/schema decision.

## Evidence

- `analysis/product/cms-authoring-workflow.md`
- `analysis/technical/adr/0003-use-structural-content-json.md`
- `analysis/technical/adr/0010-use-explicit-owner-allowlist-for-protected-tools.md`
- `src/cms/structural-content`
- `src/components/repeatables/structural-content`
- `src/db/schema.ts`
- `tests/structural-content/rendering.test.ts`
- Stories: `PF-205`, `PF-206`, `PF-207`, `PF-208`, `PF-411`

## Follow-Ups

- Add the server-only owner authorization helper before protected CMS routes or actions ship.
- Implement blog/project authoring routes and actions before broader content type coverage.
- Add tests for unauthenticated, authenticated non-owner, and owner authoring paths.
- Add validation/preview tests for structural content source, localized fields, slug collisions, and publish transitions.
- Update schema and migration catalogs if author/editor, audit, preview, or validation metadata becomes real schema.
- Use ADR 0012 before upload, cleanup, or reconciliation tooling ships.
