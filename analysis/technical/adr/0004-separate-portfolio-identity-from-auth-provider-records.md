# ADR 0004: Separate Portfolio Identity From Auth Provider Records

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

The portfolio needs account-backed interaction, but it also needs a product-specific identifier flow. Better Auth owns
core user, account, session, and verification behavior. The portfolio needs its own username/email decisions and should
not expose unnecessary account existence details.

The current auth notes describe a CMS-owned flow where username/email decisions live in `authIdentities`, separate from
Better Auth's default user table shape.

## Decision

Use Better Auth for core authentication records and session behavior, while keeping portfolio-specific identity
resolution in a separate `auth_identities` table.

The portfolio identity table owns:

- Username.
- Normalized username.
- Optional email.
- Normalized email.
- Portfolio-specific identifier decisions.

Better Auth owns:

- User id.
- Provider/credential account records.
- Sessions.
- Verification records.

## Consequences

Positive:

- The portfolio can shape username/email flows without fighting provider internals.
- Email-first flows can avoid exposing whether an account already exists.
- Future auth methods can attach to the same Better Auth user id.
- CMS and auth concerns stay readable in the schema.

Tradeoffs:

- The system must keep Better Auth users and portfolio identities consistent.
- More tables exist than a default auth setup would require.
- Future account management flows need to understand both layers.

## Evidence

- `src/auth/auth.md`
- `src/auth/identity.ts`
- `src/auth/identifier.ts`
- `src/auth/actions.ts`
- `src/auth/server.ts`
- `src/db/schema.ts`
- Commits: `85d63d3`, `30739e4`, `e9077c4`, `42d0cb8`, `1c96224`, `2c0f322`, `d6e1fc6`

## Follow-Ups

- Document account recovery and email verification decisions before exposing them publicly.
- Add integration tests around identifier resolution and session creation.
- Add diagram `PF-DIAG-003` for auth identifier and session flow.

