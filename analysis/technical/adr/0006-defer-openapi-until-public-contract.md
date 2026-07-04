# ADR 0006: Defer OpenAPI Until A Stable Public Contract Exists

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

The portfolio has HTTP route handlers and server actions, but it does not yet present itself as a public API product.
Some routes are framework-owned or auth-provider-owned, while other behavior is internal to the Next.js app.

Creating an OpenAPI spec too early would make unstable internal behavior look like a public promise.

## Decision

Do not create a full OpenAPI specification yet. Keep `analysis/technical/openapi.md` as the planning document until the
product decides which HTTP routes are stable external contracts.

Create an OpenAPI spec only when at least one route is intended for external consumers, integration clients, contract
tests, or public data access.

## Consequences

Positive:

- Avoids false stability promises.
- Keeps attention on product and route decisions before contract formatting.
- Leaves room to choose which APIs deserve versioning.

Tradeoffs:

- Current HTTP behavior is documented narratively rather than as machine-readable OpenAPI.
- API contract tests should wait until the contract is real.
- Future API work needs an explicit decision before implementation.

## Evidence

- `analysis/technical/openapi.md`
- `src/app/api/auth/[...all]/route.ts`
- `src/app/api/auth-state/route.ts`
- `src/app/blog/[slug]/route.ts`
- `src/auth/actions.ts`
- `src/blog/actions.ts`

## Follow-Ups

- Create `openapi/portfolio.v1.yaml` if public content or comment APIs become stable external contracts.
- Add an ADR if server actions move to route handlers for public API reasons.
- Add contract tests when a machine-readable spec exists.

