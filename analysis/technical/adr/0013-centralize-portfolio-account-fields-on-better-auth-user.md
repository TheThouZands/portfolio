# ADR 0013: Centralize Portfolio Account Fields On Better Auth User

Status: Accepted
Date: 2026-07-02
Owner: Thouzands

## Context

ADR 0004 separated portfolio identity fields into `auth_identities` so username/email routing could evolve without
depending on Better Auth's default user shape. The later role work in `PF-412` added username and role fields to the
Better Auth user model, making `auth_identities` a duplicate runtime source for signup, signin, comment author display,
and session state.

Better Auth supports configured `additionalFields` and `modelName` values, so the portfolio can keep using Better Auth
for core users, sessions, credential login records, and verification while making `accounts` the canonical app-facing
account table and `logins` the credential/provider linkage table.

## Decision

Centralize portfolio account fields on Better Auth's user model, stored in the `accounts` table.

The runtime implementation should:

- Store canonical lower-case usernames in `accounts.username`.
- Store real lower-case emails in `accounts.email` when provided.
- Store generated `.invalid` emails only as internal persistence compatibility values.
- Store the first role vocabulary in `accounts.role` with Reader as the default.
- Configure Better Auth `user.additionalFields` for `username` and `role`.
- Configure Better Auth `user.modelName` as `accounts` and `account.modelName` as `logins`.
- Keep Better Auth account-model rows in `logins` for provider or credential login records.
- Stop application lookup, signup, comment display, and session state from reading or writing `auth_identities`.
- Remove `auth_identities` after the centralized runtime path is verified on the preview branch; completed by
  `0022_simplify_auth_account_tables.sql`.
- Reject generated placeholder email identifiers before handing requests to Better Auth email-oriented helpers.
- Use shared server role helpers for Reader/Moderator/Owner checks; client session role state is only a hint.

## Consequences

Positive:

- Removes duplicate app account writes during signup.
- Makes signin, comments, session state, and role checks read one canonical account row.
- Makes physical table names less ambiguous: `accounts` for app account subjects and `logins` for login credentials.
- Gives permission-gated islands and future protected actions a shared server-side role resolver.
- Keeps Better Auth responsible for sessions, credentials, verification, and login records.

Tradeoffs:

- Better Auth's required email field still needs generated placeholder values for username-only accounts.
- Better Auth APIs and docs still refer to the conceptual user/account models, even though the physical tables are
  `accounts` and `logins`.
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
- `src/db/schema.ts`
- `drizzle/0022_simplify_auth_account_tables.sql`
- `tests/auth/validation.test.ts`
- `tests/auth/role-policy.test.ts`
- Story: `PF-412` / `KAN-56`

## Follow-Ups

- Add action/session integration tests around signup, signin, role payloads, and generated placeholder email rejection.
- Make moderation, CMS authoring, and permission-gated island payloads call the shared server role helpers before exposing
  privileged controls.
