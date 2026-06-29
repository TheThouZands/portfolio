# Jira Import History

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Jira/Confluence

## Purpose

This file records how local story ids map to Jira issue keys after import or manual creation. Local ids such as `PF-404`
should remain stable even after Jira assigns keys.

## Import Runs

| Run id | Date | Jira project | Source file | Source commit | Imported by | Result |
| --- | --- | --- | --- | --- | --- | --- |
| JIRA-IMPORT-001 | Pending | `PF` | `analysis/jira/backlog.csv` | Pending | Thouzands | Pending |

## Epic Mapping

| Local epic id | Epic name | Jira key | Notes |
| --- | --- | --- | --- |
| PF-E01 | Public Portfolio Discovery | Pending | Pending |
| PF-E02 | CMS Content Foundation | Pending | Pending |
| PF-E03 | Internationalized Content | Pending | Pending |
| PF-E04 | Authenticated Interaction | Pending | Pending |
| PF-E05 | Quality, Operations, And Architecture | Pending | Pending |
| PF-E06 | Forward Planning | Pending | Pending |
| PF-E07 | Service Conversion | Pending | Pending |

## Story Mapping

| Local story id | Jira key | Summary | Import run | Status after import | Notes |
| --- | --- | --- | --- | --- | --- |
| PF-101 | Pending | Homepage communicates portfolio identity | JIRA-IMPORT-001 | Pending | Implemented story. |
| PF-201 | Pending | Store content as structured records | JIRA-IMPORT-001 | Pending | Implemented story. |
| PF-401 | Pending | Sign up with portfolio identifier flow | JIRA-IMPORT-001 | Pending | Implemented story. |
| PF-505 | Pending | Maintain retrospective analysis suite | JIRA-IMPORT-001 | Pending | Planning story. |
| PF-701 | Pending | Define service entry points | JIRA-IMPORT-001 | Pending | Planned story. |

## Import Checklist

Before import:

- Confirm `analysis/jira/backlog.csv` parses locally.
- Confirm project key is `PF` or update this file before import.
- Create epics first if Jira CSV import cannot create parent links.
- Decide whether implemented retrospective stories import as Done or Backlog.

After import:

- Fill in epic Jira keys.
- Fill in story Jira keys for all imported stories.
- Confirm labels, priorities, statuses, and parent epics.
- Add GitHub commit links where useful.
- Update Confluence story pages with Jira links.

## Mapping Rules

- Never replace local ids with Jira keys in source docs.
- Add Jira keys beside local ids after import.
- Keep import run ids stable.
- If a story is split in Jira, record the split in Notes instead of deleting the local story id.

