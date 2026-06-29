# OpenAPI Planning Notes

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: GitHub

## Current Position

The portfolio does not yet expose a formal public API contract. The current server surface is mostly Next.js route
handlers, Better Auth endpoints, and server actions. An OpenAPI document should be introduced only when the product
commits to stable HTTP behavior for consumers outside the app.

Decision record: [ADR 0006](adr/0006-defer-openapi-until-public-contract.md).

## Existing HTTP Surface

| Route | Method | Current purpose | Contract status |
| --- | --- | --- | --- |
| `/api/auth/[...all]` | `GET`, `POST` | Better Auth route handler generated through `toNextJsHandler(auth)`. | External contract owned mostly by Better Auth configuration. |
| `/api/auth-state` | `GET` | Session-state endpoint for local UI refresh after auth state changes. | Internal app contract; can be documented later if kept. |
| `/blog/{slug}` | `GET` | Bare blog slug resolver that redirects to the canonical localized article route. | Public behavior, but tiny redirect contract. |

## Server Actions

The app also uses server actions for behavior such as auth flow actions and blog comment creation. These are not
OpenAPI endpoints by default because they are coupled to Next.js form/action mechanics.

Relevant areas:

- `src/auth/actions.ts`
- `src/blog/actions.ts`

## OpenAPI Decision Criteria

Create an OpenAPI spec when at least one of these is true:

- A route is intended for external clients, not only the Next.js app.
- Another service or automation needs stable request/response contracts.
- The portfolio exposes public data such as projects, skills, blog metadata, or comments through API routes.
- Contract tests would prevent meaningful regressions.

Do not create a full OpenAPI spec just to document framework-owned internals.

## Candidate Future Contracts

| Candidate | Why it might matter | Decision needed |
| --- | --- | --- |
| Public portfolio content API | Could expose projects, skills, experience, or blog metadata for integrations. | Is the portfolio meant to be a content API or only a web app? |
| Comment creation API | Could make blog interaction testable and explicit. | Should comments move from server actions to stable route handlers? |
| Auth state API | Could formalize session-aware UI behavior. | Is `/api/auth-state` a durable app contract? |
| Health/readiness endpoint | Useful for deployment monitoring. | What should it verify without exposing sensitive data? |

## Proposed File Layout If Adopted

```text
analysis/technical/openapi.md
openapi/
  portfolio.v1.yaml
tests/
  api/
```

## Initial Recommendation

Keep this as a planning note for now. Add `openapi/portfolio.v1.yaml` only after the product decides which routes are
stable public contracts.
