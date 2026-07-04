# Auth And Account Roadmap

Status: Draft  
Owner: Thouzands  
Last updated: 2026-07-03
Target home: Confluence/Jira

## Purpose

The portfolio already has auth foundations and account-backed comments. This roadmap defines what auth is for, what it
is not for yet, and how account scope can grow without turning the portfolio into an unrelated account product.

## Current Auth Purpose

Auth currently exists to support:

- Reader identity for comments.
- Portfolio-specific username/email flow.
- Session-backed UI state.
- Simple real-email verification for accounts that provide an email.
- Planned Better Auth-backed email OTP or email-link authentication for real email accounts.
- Planned narrow account profile pictures for comment/account surfaces.
- Future owner-only tools such as CMS authoring or moderation.

Auth does not yet exist to support:

- Paid client portals.
- Private project collaboration.
- Multi-role teams beyond the planned Reader/Moderator/Owner model.
- Public community profiles.
- Social networking behavior.

## Account Types

| Account type | Status | Product reason |
| --- | --- | --- |
| Reader account | Implemented baseline; email/profile enhancements planned | Allows authenticated comments and future reader trust controls. |
| Moderator account | Role storage implemented in `PF-412` / `KAN-56` | Allows moderation tools without treating every privileged action as owner-only. |
| Owner account | Role storage and route guard implemented; fuller protected workflows planned | Needed for moderation and CMS authoring. |
| Client account | Needs decision | Could support private collaboration, but not yet justified. |
| Collaborator account | Needs decision | Could support future development/content collaboration. |
| Public profile | Deferred | Not needed for current service positioning. |

## Roadmap Phases

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| A1 Reader auth baseline | Sign up, sign in, sign out, session refresh, validation, rate limiting. | Reader can comment and session state is reliable. |
| A1.5 Email identity and verification semantics | Keep username-first accounts compatible with Better Auth's required email field while treating generated placeholder emails as internal-only. | App-facing account helpers hide generated `.invalid` emails, login and verification reject placeholder identifiers before Better Auth handoff, and real emails can be verified through Better Auth's verification table and `emailVerified` flag. |
| A1.6 Shared email delivery foundation | Add a server-only sender that can support auth email and opt-in notifications without duplicate transport code. | Planned in `PF-414` / `KAN-58`; provider config, sandbox behavior, failure handling, and anti-enumeration posture are defined before OTP/link auth. |
| A1.7 Better Auth email OTP/link auth | Let real-email accounts authenticate through OTP or email-link flows powered by Better Auth where possible. | Planned in `PF-415` / `KAN-59`; placeholder emails are rejected before handoff, responses remain enumeration-safe, and successful auth updates reactive session state where the route remains valid. |
| A1.8 Minimal account profile media | Allow a reader to manage a profile picture without expanding into public community profiles. | Planned in `PF-416` / `KAN-60`; image handling should align with the managed media lifecycle. |
| A1.9 Opt-in email notification preferences | Store explicit consent for narrow portfolio notification categories. | Planned in `PF-417` / `KAN-61`; sends require real verified email and opt-in state. |
| A2 Role vocabulary and privileged-action boundaries | Define and begin implementing the first role model before privileged UI. | Reader, Moderator, and Owner responsibilities are documented in `PF-412` / `KAN-56`; role storage and shared server role helpers now exist and are adopted by first privileged moderation, guard, and island proofs. |
| A2.5 Permission-gated reactive islands | Define how privileged UI shells can appear reactively while fetching privileged payloads and submitting mutations through server authorization. | Pattern is documented in `PF-413` / `KAN-57`; FigJam flow `PF-DIAG-009` shows shell, payload, mutation, and rejection paths; the shared hook, current-role tester, persistent account header, nested owner create link, comment delete button, and post status selector prove the initial pattern. |
| A3 Owner and moderation controls | Moderator can perform moderation actions; owner can access protected owner tools. | First Moderator-or-higher hard-delete comment action and shell exist as a simple RBAC proof; fuller soft-state moderation still follows ADR 0009. |
| A4 CMS authoring auth | Owner can draft, preview, and publish CMS content. | ADR 0011 defines owner-only source-aware authoring; protected routes and audit fields remain implementation work. |
| A5 Client/private collaboration decision | Decide whether client accounts belong in this portfolio. | Decision recorded in ADR or product doc before implementation. |

## Authorization Model

Current authorization model, originally accepted in ADR 0010 and now evolving through `PF-412`:

- Reader: can manage their own session and post comments.
- Moderator: can be distinguished from Reader before moderation actions are exposed.
- Owner: is represented by the centralized `accounts.role` field; the explicit allowlist remains a bootstrap/fallback
  consideration for first owner-tool rollout.
- Anonymous visitor: can read public content.

Active first role vocabulary, tracked by `PF-412` / `KAN-56`:

| Role | Planned authority |
| --- | --- |
| Reader | Authenticated baseline role. Can manage their own session and post comments. |
| Moderator | Reader capabilities plus future comment moderation actions. |
| Owner | Moderator capabilities plus owner-only CMS authoring, admin decisions, and protected portfolio tools. |

Role checks must stay server-authoritative. Client session state can show or hide affordances, but cannot grant a
privileged action. Runtime helpers now resolve the Better Auth session into an app account, normalize unknown roles to
Reader, and check Reader/Moderator/Owner ordering on the server without breaking reader auth or comment behavior.

## Permission-Gated Island Pattern

The first privileged UI controls should follow the reactive island model proven by logout and comment composer behavior,
but add a server-authorized data layer:

- The client island can render `null`, an empty shell, or a loading shell from shared session/role state.
- Privileged options, current object state, and allowed transitions must come from a server-authenticated payload.
- Every write must re-check session, role, object capability, and requested transition in a server action or route.
- Server-rendered initial payloads are allowed for already authenticated entry when the dynamic boundary is intentional.
- If the browser renders or tampers with the shell, no privileged data or mutation authority is gained without server
  approval.
- Use the island model when the base route remains valid without the privileged control; use route-level server guards
  for writer pages, owner workspaces, authenticated previews, and any route whose identity depends on authorization.
- Owner-only pages use `requireOwnerOrNotFound()` from `src/auth/roles.ts`; more general protected pages can use
  `requireAuthRoleOrNotFound(...)` with the minimum role and receive the authorized account for page-specific work.
- Prefer small authenticated payload reads for post-login island updates; reserve `router.refresh` for cases where the
  route tree itself needs to be recalculated.
- The first implementation foothold is `usePermissionIsland` plus a current-role tester near logout controls; the
  locale layout header now proves a persistent parent account island without introducing static header navigation, and
  its owner-only create link proves a nested no-fetch RBAC child island.
- Simple no-fetch RBAC shells can use the shared session role hint through `useRoleGate`, but the server action or
  route still repeats the role/capability check before doing anything authoritative.
- The temporary create page is intentionally empty but already uses the owner-only route guard; the future writer still
  needs object-level authorization before privileged authoring behavior ships.

## Email Identity And Verification Flow

Better Auth's core user model requires an email string. Username-only portfolio accounts may therefore keep a generated
internal `.invalid` email in the `accounts` row, but product code must treat that value as absent.

App-facing rules:

- Store real usernames and real emails in canonical lower-case form.
- Treat generated `.invalid` emails as `null` in account/session/profile payloads.
- Reject sign-in, lookup, OTP, OTL, and verification attempts that supply a generated placeholder domain before handing
  the request to Better Auth email-oriented helpers.
- Never send verification messages to placeholder emails.
- Keep Better Auth's `emailVerified` boolean as the source of truth for real account email verification.
- A username-only account starts with `emailVerified = false`; adding or changing a real email should reset it to
  `false`, create a Better Auth verification value, and set it to `true` only after the verification callback succeeds.
- Placeholder emails are persistence compatibility values only; they are not login identifiers, public profile data, or
  contact data.

## Security And Trust Implications

| Concern | Current or planned control |
| --- | --- |
| Credential quality | Validation and Argon2 password handling. |
| Abuse attempts | Auth rate limiting by scope and client IP. |
| Account enumeration | Username/email flow separates behavior and avoids exposing email account existence. |
| Session accuracy | Session state refresh and Better Auth session storage. |
| Internal placeholder email leakage | Generated `.invalid` emails remain persistence-only; app-facing helpers map them to no email and auth entrypoints reject them before Better Auth handoff. |
| Email verification and passwordless auth | Use Better Auth verification values, OTP/link helpers where possible, and `emailVerified` for real emails only; username-only placeholder emails cannot be verified or used for email-oriented auth. |
| Email sending | Planned shared sender must keep provider configuration server-only, support sandbox/dry-run behavior, and return enumeration-safe errors. |
| Comment trust | Authenticated comments plus planned moderation. |
| Owner tools | Use the ADR 0010 explicit owner allowlist and server-only guard before protected tools ship; use ADR 0011 for the first CMS authoring boundary. |
| Role escalation | Keep role resolution and guard decisions server-side; reject privileged writes without a valid session and role. |

## Requirements Impact

| Requirement | Status |
| --- | --- |
| `FR-010` visitors can sign up, sign in, and sign out | Implemented. |
| `FR-011` auth flows validate and rate limit | Implemented. |
| `FR-012` sessions are durable and refresh locally | Implemented/in progress. |
| `FR-018` owner can moderate comments | Planned. |
| `FR-020` owner-only account capabilities protect moderation and authoring tools | Planned; owner authorization decision accepted in ADR 0010. |
| Future role-gated privileged actions | In progress in `PF-412` / `KAN-56`; schema and guard implementation must preserve server-authoritative checks. |
| `NFR-015` auth scope should grow only when tied to product needs | Planned; ADR 0010 keeps role scope minimal. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-409` | Define owner authorization model before protected tools. |
| `PF-410` | Decide whether client/private accounts belong in the portfolio. |
| `PF-411` | Connect owner auth to moderation and CMS authoring workflows. |
| `PF-412` / `KAN-56` | Define the first user-role model for privileged actions. |
| `PF-413` / `KAN-57` | Define permission-gated reactive island architecture for role/capability-gated controls. |
| `PF-414` / `KAN-58` | Set up the shared server-only email sending foundation. |
| `PF-415` / `KAN-59` | Add Better Auth-backed email OTP or email-link authentication. |
| `PF-416` / `KAN-60` | Add profile pictures through the managed upload flow. |
| `PF-417` / `KAN-61` | Add explicit opt-in email notification preferences. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| How is the owner identified? | ADR 0010: use explicit server-side owner allowlist, with Better Auth user ids preferred. |
| Should reader accounts have profiles? | Keep reader accounts minimal; profile pictures are planned as a narrow avatar surface, not a public profile product. |
| Should client accounts exist? | Defer until a client collaboration use case is real. |
| Should OAuth providers be added? | Defer until password/identifier flow proves insufficient. |
| Where should roles be stored? | Roles are stored on the Better Auth user model in `accounts.role`; migration `0022_simplify_auth_account_tables.sql` removed legacy `auth_identities` and renamed credential/provider rows to `logins`. |
| Should Moderator remain separate from Owner? | Start with a planned role vocabulary; validate against real moderation tooling before implementation. |
