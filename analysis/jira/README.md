# Jira Backlog Notes

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Jira/Confluence

## Import Strategy

The local backlog has two forms:

- [user-stories.md](user-stories.md): readable working backlog with epics, stories, acceptance criteria, and evidence.
- [backlog.csv](backlog.csv): starter Jira CSV import with one row per issue.
- [project-setup.md](project-setup.md): proposed Jira project settings, issue types, components, workflow, and import order.

Use the Markdown file as the source for refinement. Use the CSV when the Jira project exists and the issue field mapping
is known.

## Suggested Jira Fields

| Local field | Jira field |
| --- | --- |
| Story id | Issue key after import or custom field before import |
| Epic | Epic Name or Parent |
| Summary | Summary |
| Story | Description |
| Acceptance criteria | Description or custom field |
| Priority | Priority |
| Status | Status |
| Evidence commits | Description, Links, or custom field |
| Labels | Labels |

## Suggested Labels

| Label | Meaning |
| --- | --- |
| `portfolio` | Core public portfolio experience |
| `cms` | CMS data, content modeling, and rendering |
| `i18n` | Locale routing and translations |
| `auth` | Account, session, and identity behavior |
| `blog` | Blog publishing and comments |
| `db` | Schema, migrations, seed data, and database operations |
| `security` | Validation, rate limiting, headers, and abuse controls |
| `docs` | Analysis, ADRs, architecture, and planning artifacts |
| `requirements` | Requirement mapping, traceability, and acceptance coverage |
| `ops` | Deployment, Neon, CI, and workflow operations |

## Status Meanings

| Local status | Meaning |
| --- | --- |
| Implemented | Existing commits satisfy the story at baseline level. |
| Implemented/in progress | Existing commits exist, but related local uncommitted work is present. |
| Planned | Not implemented, but supported by current product direction. |
| Needs decision | A product or architecture choice is required before implementation. |
