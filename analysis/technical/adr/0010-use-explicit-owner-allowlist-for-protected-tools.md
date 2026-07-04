# ADR 0010: Use Explicit Owner Allowlist For Protected Tools

Status: Accepted
Date: 2026-06-29
Owner: Thouzands

## Context

The portfolio has reader authentication for comments and a portfolio-specific username/email identity layer. Better Auth
owns durable account subjects, sessions, login records, and verification records. The current schema stores the Better
Auth user model in `accounts` and credential/provider account records in `logins`.

Future moderation and CMS authoring tools need owner-only access. The product does not yet justify client accounts,
collaborator accounts, public profiles, teams, or a general role/permission system. Adding a role table before those use
cases exist would make the first protected tools larger than the current portfolio needs.

ADR 0009 also depends on owner authorization before moderation actions are exposed, because hidden or removed comments
may still contain non-public text.

## Decision

Use an explicit owner allowlist for the first protected owner tools.

The first implementation should:

- Resolve the current user through Better Auth session state.
- Check owner access through one server-only authorization helper.
- Prefer stable Better Auth user ids in configuration for owner matching.
- Allow normalized portfolio username or email only as a bootstrap aid if user ids are not yet known.
- Keep authorization checks on the server even if client UI shows owner affordances.
- Avoid adding a role table, permissions table, teams, or client account model in the first owner-tool slice.

Owner-only moderation, CMS authoring, preview, and administrative actions should all use the same guard instead of each
route or action inventing its own check.

## Consequences

Positive:

- Gives moderation and CMS authoring a clear protection model before implementation.
- Keeps account scope aligned with the current single-owner portfolio.
- Avoids premature RBAC or client portal complexity.
- Keeps Better Auth as the session source of truth while the portfolio owns product-specific authorization policy.

Tradeoffs:

- Owner membership changes require configuration changes until a richer admin model exists.
- Multiple owners or collaborators will require a new decision and probably schema support.
- Client/private accounts remain deferred rather than partially modeled.
- Tests must cover both authenticated non-owner and owner paths so "signed in" is not confused with "authorized."

## Evidence

- `src/auth/server.ts`
- `src/auth/session-state.ts`
- `src/app/api/auth-state/route.ts`
- `src/db/schema.ts`
- `analysis/product/auth-account-roadmap.md`
- `analysis/product/cms-authoring-workflow.md`
- `analysis/product/interaction-policy.md`
- `analysis/technical/adr/0004-separate-portfolio-identity-from-auth-provider-records.md`
- `analysis/technical/adr/0009-use-soft-state-comment-moderation.md`
- Stories: `PF-409`, `PF-411`

## Follow-Ups

- Add a server-only owner authorization helper before implementing protected moderation or authoring actions.
- Add tests for unauthenticated, authenticated non-owner, and owner authorization paths.
- Keep client UI owner affordances derived from server-checked session state, not treated as authorization.
- Revisit this decision if collaborator accounts, client accounts, multi-owner publishing, or audited role management
  becomes a real product requirement.
