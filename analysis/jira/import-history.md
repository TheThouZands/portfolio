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

## Status Mapping Decision

| Local retrospective status | Jira status | Applies to | Notes |
| --- | --- | --- | --- |
| Implemented | Done | Created story issues `KAN-8` through `KAN-16` and `KAN-18`. | These stories represent completed public portfolio, backend, CMS, and CMS decision work extracted from existing code or accepted docs. |
| Planned | To Do | Created story issues `KAN-17` and `KAN-19`, plus future planned story imports. | These are writer/content-producer implementation tasks or other future work, so they stay open. |
| Implemented/in progress | Leave open until verified | Pending story batches that reference current worktree or partly complete behavior. | Import only after deciding whether the current slice should be `In Progress` or `Done`. |

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
| PF-401 | Pending | Sign up with portfolio identifier flow | JIRA-IMPORT-001 | Pending | Implemented story. |
| PF-505 | Pending | Maintain retrospective analysis suite | JIRA-IMPORT-001 | Pending | Planning story. |
| PF-701 | Pending | Define service entry points | JIRA-IMPORT-001 | Pending | Planned story. |

## Pending Story Batches

| Parent epic | Jira epic | Pending stories |
| --- | --- | --- |
| PF-E03 Internationalized Content | [KAN-3](https://thouzands.atlassian.net/browse/KAN-3) | 3 |
| PF-E04 Authenticated Interaction | [KAN-4](https://thouzands.atlassian.net/browse/KAN-4) | 11 |
| PF-E05 Quality Operations And Architecture | [KAN-5](https://thouzands.atlassian.net/browse/KAN-5) | 7 |
| PF-E06 Forward Planning | [KAN-6](https://thouzands.atlassian.net/browse/KAN-6) | 10 |
| PF-E07 Service Conversion | [KAN-7](https://thouzands.atlassian.net/browse/KAN-7) | 5 |

## Import Checklist

Before story import:

- Confirm `analysis/jira/backlog.csv` parses locally.
- Confirm `analysis/jira/epics.csv` parses locally.
- Confirm project key is `KAN` and local ids remain `PF-*` after import.
- Epics are created; use the Jira keys in the epic mapping table for story parent links.
- Apply the status mapping decision: implemented created stories transition to `Done`; planned work remains `To Do`.

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
