# API Surface Inventory

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: GitHub/Confluence

## Purpose

This inventory records the current HTTP routes and server actions that behave like API boundaries, even though the
portfolio does not yet expose a formal public OpenAPI contract.

It supports ADR 0006 by separating three things:

- Current server surface that exists today.
- Internal app contracts that should stay documented but not public.
- Candidate public contracts that may later justify `openapi/portfolio.v1.yaml`.

## Contract Status Model

| Status | Meaning |
| --- | --- |
| Framework/provider owned | Behavior is mostly owned by Next.js, Better Auth, or another library. |
| Internal app contract | The app depends on the shape, but it is not promised to outside clients. |
| Public app behavior | Visitors can rely on behavior through the web app, but it is not a public API product. |
| Candidate public contract | Could become OpenAPI after a product decision and versioning boundary. |
| Server action | Next.js server action coupled to forms or app UI, not a standalone HTTP contract. |

## HTTP Route Handlers

| ID | Route | Methods | Source | Current purpose | Contract status | OpenAPI action |
| --- | --- | --- | --- | --- | --- | --- |
| API-001 | `/api/auth/[...all]` | `GET`, `POST` | `src/app/api/auth/[...all]/route.ts` | Better Auth route handler generated with `toNextJsHandler(auth)`. | Framework/provider owned | Do not document as portfolio OpenAPI unless auth integration becomes an explicit public contract. |
| API-002 | `/api/auth-state` | `GET` | `src/app/api/auth-state/route.ts` | Returns a small authenticated/unauthenticated session snapshot for local UI refresh. | Current-worktree internal app contract | Keep narrative inventory; do not treat as a stable public contract until the auth-state slice is committed and reused beyond local UI refresh. |
| API-003 | `/blog/{slug}` | `GET` | `src/app/blog/[slug]/route.ts` | Redirects bare blog slugs to canonical localized post routes. | Public app behavior | Document as route behavior; OpenAPI is likely unnecessary unless redirect behavior becomes integration-facing. |

## Server Actions

| ID | Action | Source | Current purpose | Contract status | OpenAPI action |
| --- | --- | --- | --- | --- | --- |
| ACT-001 | `resolveIdentifierAction` | `src/auth/actions.ts` | Resolves username/email identifier and chooses sign-in or sign-up path with rate limiting. | Server action | Keep internal; do not convert to OpenAPI without an external auth-flow reason. |
| ACT-002 | `signInAction` | `src/auth/actions.ts` | Signs in through Better Auth identifier flow with validation and rate limiting. | Server action | Keep internal; Better Auth owns lower-level route contract. |
| ACT-003 | `signUpAction` | `src/auth/actions.ts` | Creates account through portfolio-specific signup flow with validation and rate limiting. | Server action | Keep internal until account API needs external clients. |
| ACT-004 | `signOutAction` | `src/auth/actions.ts` | Signs out the current Better Auth session and clears browser session state. | Server action | Keep internal; do not expose as public contract. |
| ACT-005 | `createBlogCommentAction` | `src/blog/actions.ts` | Creates an authenticated blog comment for the current post. | Server action / candidate public contract | Candidate if comments move to route handlers for API tests, moderation workflows, or external clients. |

## Candidate Future Public Contracts

| Candidate | Current local evidence | Product decision needed | First spec trigger |
| --- | --- | --- | --- |
| Public portfolio content API | CMS queries, localized routes, project/skill/experience/blog models | Should the portfolio expose content as data, or only render pages? | External consumer or automation needs stable content JSON. |
| Comment creation/moderation API | `createBlogCommentAction`, comments table, interaction policy, ADR 0005 | Should comments remain form-backed server actions or become stable route handlers? | Moderation UI, mobile/client integration, or contract tests require HTTP route semantics. |
| Auth state API | `/api/auth-state`, `AuthSessionSnapshot`, current auth-state worktree files | Is this endpoint a durable app contract or just a UI refresh helper? | The auth-state slice is committed and multiple clients or tests depend on the snapshot shape. |
| Health/readiness endpoint | Deployment workflow, Neon migration workflow, Vercel build process | What should readiness verify without exposing sensitive internals? | Deployment monitoring needs an HTTP status contract. |

## OpenAPI Readiness Checklist

Before creating `openapi/portfolio.v1.yaml`, confirm:

- The route is intended for consumers outside the current Next.js UI.
- Request and response shapes are stable enough to version.
- Auth, rate limit, validation, and error semantics are documented.
- Contract tests or generated clients would create real value.
- The route has a related requirement, Jira story, and ADR if it changes architecture.
- Internal framework/provider-owned routes are excluded unless the portfolio explicitly owns their public behavior.

## Update Triggers

Update this inventory when:

- A new file is added under `src/app/api`.
- A route handler is added outside localized page routes.
- A server action becomes a route handler.
- Auth/session/comment behavior changes shape.
- A public API decision is made.
- OpenAPI planning notes or ADR 0006 are revised.
