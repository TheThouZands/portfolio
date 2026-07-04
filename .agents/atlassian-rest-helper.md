# Atlassian REST Helper

Use this note when Jira or Confluence needs a stable REST operation that the Atlassian connector can read but cannot
write, especially native Jira remote links that power the issue **Confluence content** panel.

## Local Helper

The helper is intentionally local-only:

```powershell
.local-tools\atlassian\jira-confluence-remote-link.mjs
```

`.local-tools/` is gitignored. Do not commit the helper or any credentials. Recreate or adjust it locally when needed,
then record the external action in `analysis/jira/import-history.md` or the matching manifest/log.

## Expected Environment

The current helper uses Jira Cloud Basic auth:

```text
JIRA_API_KEY
ATLASSIAN_EMAIL=thouzands@thouzands.co
ATLASSIAN_SITE_URL=https://thouzands.atlassian.net
```

The helper can default the email and site URL, but future agents should verify with `probe` before writing.

## Safe Commands

Probe configuration without printing secrets:

```powershell
node .local-tools\atlassian\jira-confluence-remote-link.mjs probe
```

List native Confluence remote links on an issue:

```powershell
node .local-tools\atlassian\jira-confluence-remote-link.mjs list --issue KAN-62
```

Create an idempotent native Confluence page link:

```powershell
node .local-tools\atlassian\jira-confluence-remote-link.mjs link --issue KAN-62 --page-id 1343502 --title "Scope And Requirements" --app-id 3982a5da-fab3-36a9-aa68-b1f1dc53267e
```

List Jira comments before cleanup:

```powershell
node .local-tools\atlassian\jira-confluence-remote-link.mjs comments --issue KAN-62
```

Delete only a known, verified comment id:

```powershell
node .local-tools\atlassian\jira-confluence-remote-link.mjs delete-comment --issue KAN-62 --comment-id 10083
```

## Safety Rules

- Prefer the Atlassian connector for normal Jira, Confluence, and search work.
- Use the REST helper only for missing connector operations, such as Jira remote-link creation.
- Read existing comments or links before deleting or creating anything.
- Create remote links with `application.type` set to `com.atlassian.confluence` and `relationship` set to `Wiki Page`.
- Keep the `globalId` stable: `appId=<confluence-app-id>&pageId=<page-id>`.
- After external writes, verify through both the helper and the Atlassian connector when practical.
- Update local sync records in the same small slice.
