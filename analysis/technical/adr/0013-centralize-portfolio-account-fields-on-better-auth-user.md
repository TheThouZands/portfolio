# ADR 0013: Centralize Portfolio Account Fields On Better Auth User

Status: Accepted
Date: 2026-07-02
Owner: Thouzands

## Context

ADR 0004 separated portfolio identity fields into `auth_identities` so username/email routing could evolve without
depending on Better Auth's default user shape. The later role work in `PF-412` added `user.username` and `user.role`,
making `auth_identities` a duplicate runtime source for signup, signin, comment author display, and session state.

Better Auth supports configured user `additionalFields`, so the portfolio can keep using Better Auth for core users,
sessions, credential login records, and verification while making `user` the canonical app-facing account row.

## Decision

Centralize portfolio account fields on Better Auth's `user` table.

The runtime implementation should:

- Store canonical lower-case usernames in `user.username`.
- Store real lower-case emails in `user.email` when provided.
- Store generated `.invalid` emails only as internal persistence compatibility values.
- Store the first role vocabulary in `user.role` with Reader as the default.
- Configure Better Auth `user.additionalFields` for `username` and `role`.
- Keep Better Auth `account` rows for provider or credential login records.
- Stop application lookup, signup, comment display, and session state from reading or writing `auth_identities`.
- Keep `auth_identities` in the schema only until a cleanup migration can safely remove it.
- Reject generated placeholder email identifiers before handing requests to Better Auth email-oriented helpers.
- Use shared server role helpers for Reader/Moderator/Owner checks; client session role state is only a hint.

## Consequences

Positive:

- Removes duplicate app account writes during signup.
- Makes signin, comments, session state, and role checks read one canonical account row.
- Gives permission-gated islands and future protected actions a shared server-side role resolver.
- Keeps Better Auth responsible for sessions, credentials, verification, and login records.

Tradeoffs:

- Better Auth's required email field still needs generated placeholder values for username-only accounts.
- A future migration must remove `auth_identities` after preview verification.
- ADR 0010's explicit owner allowlist becomes a bootstrap/fallback concern rather than the primary long-term role model.
- Integration tests still need to cover full Better Auth session creation and role propagation.

## Evidence

- `src/auth/server.ts`
- `src/auth/portfolio-flow.ts`
- `src/auth/identity.ts`
- `src/auth/identifier.ts`
- `src/auth/roles.ts`
- `src/auth/role-policy.ts`
- `src/app/api/auth-state/route.ts`
- `src/blog/actions.ts`
- `src/db/queries/blog.ts`
- `tests/auth/validation.test.ts`
- `tests/auth/role-policy.test.ts`
- Story: `PF-412` / `KAN-56`

## Follow-Ups

- Add action/session integration tests around signup, signin, role payloads, and generated placeholder email rejection.
- Add a cleanup migration to remove `auth_identities` after preview verification confirms the centralized runtime path.
- Make moderation, CMS authoring, and permission-gated island payloads call the shared server role helpers before exposing
  privileged controls.
