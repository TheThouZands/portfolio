# Auth And Account Roadmap

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
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
- Multi-role teams.
- Public community profiles.
- Social networking behavior.

## Account Types

| Account type | Status | Product reason |
| --- | --- | --- |
| Reader account | Implemented/in progress | Allows authenticated comments and future reader trust controls. |
| Owner account | Planned; authorization model accepted in ADR 0010 | Needed for moderation and CMS authoring. |
| Client account | Needs decision | Could support private collaboration, but not yet justified. |
| Collaborator account | Needs decision | Could support future development/content collaboration. |
| Public profile | Deferred | Not needed for current service positioning. |

## Roadmap Phases

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| A1 Reader auth baseline | Sign up, sign in, sign out, session refresh, validation, rate limiting. | Reader can comment and session state is reliable. |
| A2 Owner controls | Owner can moderate comments and access protected owner tools. | Owner-only authorization model exists in ADR 0010; implementation still pending. |
| A3 CMS authoring auth | Owner can draft, preview, and publish CMS content. | Authoring workflow has protected routes and audit fields if needed. |
| A4 Client/private collaboration decision | Decide whether client accounts belong in this portfolio. | Decision recorded in ADR or product doc before implementation. |

## Authorization Model

First planned authorization model, accepted in ADR 0010:

- Reader: can manage their own session and post comments.
- Owner: is matched by an explicit server-side allowlist after Better Auth session resolution.
- Anonymous visitor: can read public content.

Avoid adding a complex role table until collaborator, client, or multi-owner needs become real. Owner-only moderation
and authoring tools should call one server-only authorization helper rather than checking ownership ad hoc.

## Security And Trust Implications

| Concern | Current or planned control |
| --- | --- |
| Credential quality | Validation and Argon2 password handling. |
| Abuse attempts | Auth rate limiting by scope and client IP. |
| Account enumeration | Username/email flow separates behavior and avoids exposing email account existence. |
| Session accuracy | Session state refresh and Better Auth session storage. |
| Comment trust | Authenticated comments plus planned moderation. |
| Owner tools | Use the ADR 0010 explicit owner allowlist and server-only guard before protected tools ship. |

## Requirements Impact

| Requirement | Status |
| --- | --- |
| `FR-010` visitors can sign up, sign in, and sign out | Implemented. |
| `FR-011` auth flows validate and rate limit | Implemented. |
| `FR-012` sessions are durable and refresh locally | Implemented/in progress. |
| `FR-018` owner can moderate comments | Planned. |
| `FR-020` owner-only account capabilities protect moderation and authoring tools | Planned; owner authorization decision accepted in ADR 0010. |
| `NFR-015` auth scope should grow only when tied to product needs | Planned; ADR 0010 keeps role scope minimal. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-409` | Define owner authorization model before protected tools. |
| `PF-410` | Decide whether client/private accounts belong in the portfolio. |
| `PF-411` | Connect owner auth to moderation and CMS authoring workflows. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| How is the owner identified? | ADR 0010: use explicit server-side owner allowlist, with Better Auth user ids preferred. |
| Should reader accounts have profiles? | No. Keep reader accounts minimal. |
| Should client accounts exist? | Defer until a client collaboration use case is real. |
| Should OAuth providers be added? | Defer until password/identifier flow proves insufficient. |
