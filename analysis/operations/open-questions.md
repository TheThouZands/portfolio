# Open Questions

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira

## Purpose

This register keeps unresolved questions visible so they can become decisions, ADRs, Jira stories, or explicit deferrals
instead of disappearing into the background.

## Question Statuses

| Status | Meaning |
| --- | --- |
| Open | Needs future decision. |
| Watching | Not urgent, but should be revisited when related work starts. |
| Deferred | Intentionally postponed. |
| Answered | Resolved in a decision, ADR, or requirement. |

## Questions

| ID | Question | Status | Default until answered | Related docs |
| --- | --- | --- | --- | --- |
| OQ-001 | Should implemented retrospective stories import into Jira as Done or Backlog? | Open | Decide during first Jira import. | `analysis/jira/import-history.md` |
| OQ-002 | Should comments support reader edit, delete, or report actions? | Open | Owner moderation first. | `analysis/product/interaction-policy.md` |
| OQ-003 | Should CMS authoring start as an authenticated admin route or local tooling? | Open | Admin route only after owner auth stabilizes. | `analysis/product/cms-authoring-workflow.md` |
| OQ-004 | Should client/private accounts exist in the portfolio? | Deferred | No client accounts until a real collaboration use case exists. | `analysis/product/auth-account-roadmap.md` |
| OQ-005 | Should a public OpenAPI spec be created? | Deferred | No spec until a stable public contract exists. | ADR 0006, `analysis/technical/openapi.md` |
| OQ-006 | Should pricing be public? | Watching | Service offers are defined, but public pricing remains deferred until offer boundaries repeat with lead feedback. | `analysis/product/service-offer-catalog.md`, `analysis/product/conversion-path.md` |
| OQ-007 | Should Confluence sync back to Git manually or automatically? | Watching | Manual until page structure stabilizes. | `analysis/confluence/publishing-runbook.md` |

## Review Rule

Review this register during monthly product review and before starting any story that touches comments, CMS authoring,
auth scope, public APIs, pricing, or external tool synchronization.
