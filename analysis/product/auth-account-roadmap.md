# Auth And Account Roadmap

Status: Draft  
Owner: Thouzands  
Last updated: 2026-07-01  
Target home: Confluence/Jira

## Purpose

The portfolio already has auth foundations and account-backed comments. This roadmap defines what auth is for, what it
is not for yet, and how account scope can grow without turning the portfolio into an unrelated account product.

## Current Auth Purpose

Auth currently exists to support:

- Reader identity for comments.
- Portfolio-specific username/email flow.
- Session-backed UI state.
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
| Reader account | Implemented/in progress | Allows authenticated comments and future reader trust controls. |
| Moderator account | Planned in `PF-412` / `KAN-56` | Allows future moderation tools without treating every privileged action as owner-only. |
| Owner account | Planned; authorization model accepted in ADR 0010 | Needed for moderation and CMS authoring. |
| Client account | Needs decision | Could support private collaboration, but not yet justified. |
| Collaborator account | Needs decision | Could support future development/content collaboration. |
| Public profile | Deferred | Not needed for current service positioning. |

## Roadmap Phases

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| A1 Reader auth baseline | Sign up, sign in, sign out, session refresh, validation, rate limiting. | Reader can comment and session state is reliable. |
| A2 Role vocabulary and privileged-action boundaries | Define the first role model before adding schema, guards, or privileged UI. | Reader, Moderator, and Owner responsibilities are documented in `PF-412` / `KAN-56`; implementation remains deferred. |
| A2.5 Permission-gated reactive islands | Define how privileged UI shells can appear reactively while fetching privileged payloads and submitting mutations through server authorization. | Pattern is documented in `PF-413` / `KAN-57`; FigJam flow `PF-DIAG-009` shows shell, payload, mutation, and rejection paths. |
| A3 Owner and moderation controls | Moderator can perform moderation actions; owner can access protected owner tools. | Role-aware server guards exist and preserve the ADR 0010 owner allowlist migration path. |
| A4 CMS authoring auth | Owner can draft, preview, and publish CMS content. | ADR 0011 defines owner-only source-aware authoring; protected routes and audit fields remain implementation work. |
| A5 Client/private collaboration decision | Decide whether client accounts belong in this portfolio. | Decision recorded in ADR or product doc before implementation. |

## Authorization Model

Current authorization model, accepted in ADR 0010:

- Reader: can manage their own session and post comments.
- Owner: is matched by an explicit server-side allowlist after Better Auth session resolution.
- Anonymous visitor: can read public content.

Planned first role vocabulary, tracked by `PF-412` / `KAN-56`:

| Role | Planned authority |
| --- | --- |
| Reader | Authenticated baseline role. Can manage their own session and post comments. |
| Moderator | Reader capabilities plus future comment moderation actions. |
| Owner | Moderator capabilities plus owner-only CMS authoring, admin decisions, and protected portfolio tools. |

Role checks must stay server-authoritative. Client session state can show or hide affordances, but cannot grant a
privileged action. The first implementation should explain how it evolves from the ADR 0010 owner allowlist without
breaking existing reader auth or comment behavior.

## Permission-Gated Island Pattern

The first privileged UI controls should follow the reactive island model proven by logout and comment composer behavior,
but add a server-authorized data layer:

- The client island can render `null`, an empty shell, or a loading shell from shared session/role state.
- Privileged options, current object state, and allowed transitions must come from a server-authenticated payload.
- Every write must re-check session, role, object capability, and requested transition in a server action or route.
- Server-rendered initial payloads are allowed for already authenticated entry when the dynamic boundary is intentional.
- If the browser renders or tampers with the shell, no privileged data or mutation authority is gained without server
  approval.

## Security And Trust Implications

| Concern | Current or planned control |
| --- | --- |
| Credential quality | Validation and Argon2 password handling. |
| Abuse attempts | Auth rate limiting by scope and client IP. |
| Account enumeration | Username/email flow separates behavior and avoids exposing email account existence. |
| Session accuracy | Session state refresh and Better Auth session storage. |
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
| Future role-gated privileged actions | Planned in `PF-412` / `KAN-56` before schema and guard implementation. |
| `NFR-015` auth scope should grow only when tied to product needs | Planned; ADR 0010 keeps role scope minimal. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-409` | Define owner authorization model before protected tools. |
| `PF-410` | Decide whether client/private accounts belong in the portfolio. |
| `PF-411` | Connect owner auth to moderation and CMS authoring workflows. |
| `PF-412` / `KAN-56` | Define the first user-role model for privileged actions. |
| `PF-413` / `KAN-57` | Define permission-gated reactive island architecture for role/capability-gated controls. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| How is the owner identified? | ADR 0010: use explicit server-side owner allowlist, with Better Auth user ids preferred. |
| Should reader accounts have profiles? | No. Keep reader accounts minimal. |
| Should client accounts exist? | Defer until a client collaboration use case is real. |
| Should OAuth providers be added? | Defer until password/identifier flow proves insufficient. |
| Where should roles be stored? | Defer until `PF-412` reviews migration and guard design. |
| Should Moderator remain separate from Owner? | Start with a planned role vocabulary; validate against real moderation tooling before implementation. |
