# Permission-Gated Reactive Islands

Status: Draft
Owner: Thouzands
Last updated: 2026-07-01
Target home: Confluence/Jira/FigJam

## Purpose

Define the architecture pattern for privileged UI islands that should feel reactive without making client state
authoritative. The pattern grows from the current auth session islands: the client can show or hide a shell quickly, but
the server remains responsible for privileged payloads and every mutation.

## Planning Links

| Artifact | Link |
| --- | --- |
| Story | `PF-413` / `KAN-57` |
| Role model | `PF-412` / `KAN-56` |
| Diagram | `PF-DIAG-009` |
| FigJam | `https://www.figma.com/board/s6bFSjN2FQ0mTvs75itGkW/Portfolio-Analysis-Diagrams?node-id=27-929` |
| Related implementation proof | `KAN-24` reactive session islands |
| Existing owner guard decision | ADR 0010 |

## Core Model

The island has two layers:

| Layer | Responsibility | Trust boundary |
| --- | --- | --- |
| Client shell | Reacts to session state, coarse role state, loading state, and user interaction. | Convenience only; never grants authority. |
| Server capability payload | Returns privileged options, current values, and allowed actions for the specific user and object. | Authoritative for data visibility. |
| Server mutation | Re-checks session, role, object capability, and requested transition before changing state. | Authoritative for writes. |

For a post status selector, the client-rendered shell can be an empty `<select>` until the server confirms that the
current account can view and use the control for the specific post.

## Route Boundary Rule

Prefer permission-gated reactive islands when the base page is valid without the privileged capability. Public blog
posts, public project pages, and other read-only surfaces can stay quick while optional controls fill themselves from a
server-authorized payload after mount or after a login modal succeeds.

Use route-level server guards when the route itself is the protected resource. Writer pages, owner dashboards,
authenticated previews, and other privileged workspaces should resolve the session and role before render, then return
the appropriate page, redirect, `403`, or `404`. In those cases a navigation or refresh after login is expected because
the whole route identity depends on authorization.

The default client-side refresh mechanism for islands should be a small authenticated payload read, not `router.refresh`.
Use `router.refresh` only when several server-rendered regions need to be recalculated as a route tree.

## Flow

1. Static or server-rendered page delivers public content quickly.
2. A small client island mounts next to the relevant object.
3. The island reads the shared auth session state.
4. If there is no session, the island renders nothing.
5. If the session is clearly ineligible, the island renders nothing.
6. If the session might be eligible, the island renders an empty/loading shell and requests a server-filtered payload.
7. The server resolves the session, role, object capability, and current object state.
8. If authorized, the server returns the available control data.
9. If unauthorized, the server returns `403` or a neutral unavailable response and the island hides.
10. Every submitted change goes through a server action or authenticated route that repeats authorization before writing.

## Server Responsibilities

- Resolve the active session from request cookies or server action headers.
- Treat client role/session state as a hint, not evidence.
- Return privileged data only after checking the account and target object.
- Re-authorize every mutation, even if the payload was previously returned to the same browser.
- Revalidate affected paths or tags after successful mutations.
- Return boring denial states so unauthorized users do not learn extra object metadata.

## Client Responsibilities

- Keep the island small and scoped to the object it controls.
- Render `null` for anonymous or clearly ineligible states.
- Show a loading shell only while awaiting an authorized payload.
- Disable controls while mutation is pending.
- Treat `401`, `403`, and unavailable payloads as a cue to hide or reset the island.
- Never embed privileged options in the static page for users who have not been authorized.

## SSR And Hybrid Entry

If a user enters the page already logged in, a server component may provide an initial authorized payload for the island,
but only where accepting that dynamic boundary is worth it. The default posture remains mostly static pages with small
client islands that fetch privileged payloads after mount or after auth state changes. This keeps public views quick
while still allowing logged-in owner or moderator tools to feel responsive without refreshing the whole route.

## Example: Post Status Selector

| Step | Behavior |
| --- | --- |
| Page render | Public blog post renders from normal CMS queries. |
| Island mount | `PostStatusSelectorIsland` checks shared session state. |
| Coarse gate | Reader or anonymous accounts render nothing; moderator/owner-shaped sessions may request payload. |
| Payload fetch | Server returns current status and allowed statuses only when the account can edit the post. |
| Mutation | Selecting a status calls a server action that re-checks capability before updating `status_cms`. |
| Revalidation | Successful change refreshes the island and invalidates affected post/list views. |

## Acceptance Notes

- This pattern does not replace server guards; it makes the UI feel immediate while preserving server trust.
- Role checks should evolve into capability checks: role says a user may have a class of authority, capability says the
  user may act on this specific object now.
- The first implementation should reuse the existing session provider where possible and introduce a reusable permission
  gate only when multiple islands need the same role/capability clauses.

## Update Trigger

Update this page when role storage, capability helpers, privileged payload endpoints, server actions, SSR payload
hydration, or CMS post-status controls are designed or implemented.
