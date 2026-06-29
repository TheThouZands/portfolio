# Jira Import History

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Jira/Confluence

## Purpose

This file records how local story ids map to Jira issue keys after import or manual creation. Local ids such as `PF-404`
should remain stable even after Jira assigns keys.

## Import Runs

| Run id | Date | Jira project | Source files | Source commit | Imported by | Result |
| --- | --- | --- | --- | --- | --- | --- |
| JIRA-IMPORT-001 | 2026-06-29 | `KAN` | `analysis/jira/epics.csv`, `analysis/jira/backlog.csv` | `86a2d97`, `b980ebb`, `e50da91` | Thouzands | Partial import: seven epics and the `PF-E01`/`PF-E02` story batches were created in Jira. Thirty-six stories remain pending. Jira defaulted created issues to `To Do` with `Medium` priority, so local priority values remain preserved in each issue description until priority mapping is applied. |
| JIRA-STATUS-001 | 2026-06-29 | `KAN` | `analysis/jira/import-history.md`, `analysis/jira/backlog.csv` | `3bc7001` | Thouzands | Status reconciliation: created story issues with local status `Implemented` were transitioned to `Done`; created story issues with local status `Planned` remained `To Do`. |
| JIRA-IMPORT-002 | 2026-06-29 | `KAN` | `analysis/jira/backlog.csv` | `1a94d4e` | Thouzands | Imported the `PF-E03` Internationalized Content story batch as `KAN-20` through `KAN-22` under `KAN-3`; all three implemented stories were transitioned to `Done`. Thirty-three stories remain pending. |
| JIRA-IMPORT-003 | 2026-06-29 | `KAN` | `analysis/jira/backlog.csv` | `4024a94` | Thouzands | Imported the `PF-E04` Authenticated Interaction story batch as `KAN-23` through `KAN-33` under `KAN-4`; implemented stories were transitioned to `Done`, current-worktree stories to `In Progress`, and planned stories remained `To Do`. Twenty-two stories remain pending. |

## Status Mapping Decision

| Local retrospective status | Jira status | Applies to | Notes |
| --- | --- | --- | --- |
| Implemented | Done | Created story issues `KAN-8` through `KAN-16`, `KAN-18`, `KAN-20` through `KAN-23`, `KAN-25`, `KAN-27`, `KAN-28`, and `KAN-31`. | These stories represent completed public portfolio, backend, CMS, i18n, auth, blog, and decision work extracted from existing code or accepted docs. |
| Implemented/in progress | In Progress | Created story issues `KAN-24` and `KAN-26`. | These stories include committed behavior plus current worktree follow-up changes, so they stay active until the current work is verified and committed. |
| Planned | To Do | Created story issues `KAN-17`, `KAN-19`, `KAN-29`, `KAN-30`, `KAN-32`, and `KAN-33`, plus future planned story imports. | These are writer/content-producer implementation tasks, moderation follow-ups, account-scope follow-ups, or other future work, so they stay open. |

Epic statuses stay open until child story batches are imported and reconciled. The status pass only changed story issues that
already existed in Jira.

## Epic Mapping

| Local epic id | Epic name | Jira key | Notes |
| --- | --- | --- | --- |
| PF-E01 | Public Portfolio Discovery | [KAN-1](https://thouzands.atlassian.net/browse/KAN-1) | Created from `analysis/jira/epics.csv`; labels: `portfolio`. |
| PF-E02 | CMS Content Foundation | [KAN-2](https://thouzands.atlassian.net/browse/KAN-2) | Created from `analysis/jira/epics.csv`; labels: `cms`, `db`. |
| PF-E03 | Internationalized Content | [KAN-3](https://thouzands.atlassian.net/browse/KAN-3) | Created from `analysis/jira/epics.csv`; labels: `i18n`, `cms`. |
| PF-E04 | Authenticated Interaction | [KAN-4](https://thouzands.atlassian.net/browse/KAN-4) | Created from `analysis/jira/epics.csv`; labels: `auth`, `blog`, `security`. |
| PF-E05 | Quality, Operations, And Architecture | [KAN-5](https://thouzands.atlassian.net/browse/KAN-5) | Created from `analysis/jira/epics.csv`; labels: `db`, `ops`, `docs`. |
| PF-E06 | Forward Planning | [KAN-6](https://thouzands.atlassian.net/browse/KAN-6) | Created from `analysis/jira/epics.csv`; labels: `docs`, `requirements`, `ops`. |
| PF-E07 | Service Conversion | [KAN-7](https://thouzands.atlassian.net/browse/KAN-7) | Created from `analysis/jira/epics.csv`; labels: `portfolio`, `docs`. |

## Story Mapping

| Local story id | Jira key | Summary | Import run | Status after import | Notes |
| --- | --- | --- | --- | --- | --- |
| PF-101 | [KAN-8](https://thouzands.atlassian.net/browse/KAN-8) | Homepage communicates portfolio identity | JIRA-IMPORT-001 | Done | Parent: [KAN-1](https://thouzands.atlassian.net/browse/KAN-1). Local status: Implemented; local priority: High. |
| PF-102 | [KAN-9](https://thouzands.atlassian.net/browse/KAN-9) | Browse professional experience | JIRA-IMPORT-001 | Done | Parent: [KAN-1](https://thouzands.atlassian.net/browse/KAN-1). Local status: Implemented; local priority: High. |
| PF-103 | [KAN-10](https://thouzands.atlassian.net/browse/KAN-10) | Browse skills and related work | JIRA-IMPORT-001 | Done | Parent: [KAN-1](https://thouzands.atlassian.net/browse/KAN-1). Local status: Implemented; local priority: High. |
| PF-104 | [KAN-11](https://thouzands.atlassian.net/browse/KAN-11) | Browse project evidence | JIRA-IMPORT-001 | Done | Parent: [KAN-1](https://thouzands.atlassian.net/browse/KAN-1). Local status: Implemented; local priority: High. |
| PF-201 | [KAN-12](https://thouzands.atlassian.net/browse/KAN-12) | Store content as structured records | JIRA-IMPORT-001 | Done | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Implemented; local priority: High. |
| PF-202 | [KAN-13](https://thouzands.atlassian.net/browse/KAN-13) | Support CMS content lifecycle statuses | JIRA-IMPORT-001 | Done | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Implemented; local priority: Medium. |
| PF-203 | [KAN-14](https://thouzands.atlassian.net/browse/KAN-14) | Render safe structural content | JIRA-IMPORT-001 | Done | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Implemented; local priority: High. |
| PF-204 | [KAN-15](https://thouzands.atlassian.net/browse/KAN-15) | Seed repeatable demo content | JIRA-IMPORT-001 | Done | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Implemented; local priority: Medium. |
| PF-205 | [KAN-16](https://thouzands.atlassian.net/browse/KAN-16) | Define CMS authoring workflow | JIRA-IMPORT-001 | Done | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Implemented; local priority: High. |
| PF-206 | [KAN-17](https://thouzands.atlassian.net/browse/KAN-17) | Design owner draft preview publish flow | JIRA-IMPORT-001 | To Do | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Planned; local priority: High. |
| PF-207 | [KAN-18](https://thouzands.atlassian.net/browse/KAN-18) | Define media lifecycle decisions | JIRA-IMPORT-001 | Done | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Implemented; local priority: Medium. |
| PF-208 | [KAN-19](https://thouzands.atlassian.net/browse/KAN-19) | Implement owner media upload lifecycle | JIRA-IMPORT-001 | To Do | Parent: [KAN-2](https://thouzands.atlassian.net/browse/KAN-2). Local status: Planned; local priority: Medium. |
| PF-301 | [KAN-20](https://thouzands.atlassian.net/browse/KAN-20) | Browse localized routes | JIRA-IMPORT-002 | Done | Parent: [KAN-3](https://thouzands.atlassian.net/browse/KAN-3). Local status: Implemented; local priority: High. |
| PF-302 | [KAN-21](https://thouzands.atlassian.net/browse/KAN-21) | Redirect bare blog URLs canonically | JIRA-IMPORT-002 | Done | Parent: [KAN-3](https://thouzands.atlassian.net/browse/KAN-3). Local status: Implemented; local priority: Medium. |
| PF-303 | [KAN-22](https://thouzands.atlassian.net/browse/KAN-22) | Resolve localized metadata | JIRA-IMPORT-002 | Done | Parent: [KAN-3](https://thouzands.atlassian.net/browse/KAN-3). Local status: Implemented; local priority: Medium. |
| PF-401 | [KAN-23](https://thouzands.atlassian.net/browse/KAN-23) | Sign up with portfolio identifier flow | JIRA-IMPORT-003 | Done | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented; local priority: High. |
| PF-402 | [KAN-24](https://thouzands.atlassian.net/browse/KAN-24) | Sign in and sign out reliably | JIRA-IMPORT-003 | In Progress | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented/in progress; local priority: High. |
| PF-403 | [KAN-25](https://thouzands.atlassian.net/browse/KAN-25) | Validate and rate-limit auth flows | JIRA-IMPORT-003 | Done | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented; local priority: High. |
| PF-404 | [KAN-26](https://thouzands.atlassian.net/browse/KAN-26) | Comment on blog posts | JIRA-IMPORT-003 | In Progress | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented/in progress; local priority: High. |
| PF-405 | [KAN-27](https://thouzands.atlassian.net/browse/KAN-27) | Preserve discussion after account deletion | JIRA-IMPORT-003 | Done | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented; local priority: Medium. |
| PF-406 | [KAN-28](https://thouzands.atlassian.net/browse/KAN-28) | Define comment moderation states | JIRA-IMPORT-003 | Done | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented; local priority: High. |
| PF-407 | [KAN-29](https://thouzands.atlassian.net/browse/KAN-29) | Hide or remove abusive comments | JIRA-IMPORT-003 | To Do | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Planned; local priority: High. |
| PF-408 | [KAN-30](https://thouzands.atlassian.net/browse/KAN-30) | Define reader comment controls | JIRA-IMPORT-003 | To Do | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Planned; local priority: Medium. |
| PF-409 | [KAN-31](https://thouzands.atlassian.net/browse/KAN-31) | Define owner authorization model | JIRA-IMPORT-003 | Done | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Implemented; local priority: High. |
| PF-410 | [KAN-32](https://thouzands.atlassian.net/browse/KAN-32) | Decide client account scope | JIRA-IMPORT-003 | To Do | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Planned; local priority: Medium. |
| PF-411 | [KAN-33](https://thouzands.atlassian.net/browse/KAN-33) | Connect owner auth to protected workflows | JIRA-IMPORT-003 | To Do | Parent: [KAN-4](https://thouzands.atlassian.net/browse/KAN-4). Local status: Planned; local priority: High. |
| PF-505 | Pending | Maintain retrospective analysis suite | JIRA-IMPORT-001 | Pending | Planning story. |
| PF-701 | Pending | Define service entry points | JIRA-IMPORT-001 | Pending | Planned story. |

## Pending Story Batches

| Parent epic | Jira epic | Pending stories |
| --- | --- | --- |
| PF-E05 Quality Operations And Architecture | [KAN-5](https://thouzands.atlassian.net/browse/KAN-5) | 7 |
| PF-E06 Forward Planning | [KAN-6](https://thouzands.atlassian.net/browse/KAN-6) | 10 |
| PF-E07 Service Conversion | [KAN-7](https://thouzands.atlassian.net/browse/KAN-7) | 5 |

## Import Checklist

Before story import:

- Confirm `analysis/jira/backlog.csv` parses locally.
- Confirm `analysis/jira/epics.csv` parses locally.
- Confirm project key is `KAN` and local ids remain `PF-*` after import.
- Epics are created; use the Jira keys in the epic mapping table for story parent links.
- Apply the status mapping decision: implemented created stories transition to `Done`; current-worktree stories transition
  to `In Progress`; planned work remains `To Do`.

After story import:

- Fill in story Jira keys for all imported stories.
- Confirm labels, priorities, statuses, and parent epics.
- Add GitHub commit links where useful.
- Update Confluence story pages with Jira links.

## Mapping Rules

- Never replace local ids with Jira keys in source docs.
- Add Jira keys beside local ids after import.
- Keep import run ids stable.
- Keep the Jira status aligned with the local retrospective status after each import batch.
- If a story is split in Jira, record the split in Notes instead of deleting the local story id.
