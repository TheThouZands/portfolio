# Architecture Decision Records

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: GitHub

## Convention

ADRs live in this directory and use sequential four-digit ids.

```text
0001-record-retrospective-analysis-suite.md
0002-example-future-decision.md
```

Each ADR should include:

- Status
- Context
- Decision
- Consequences
- Evidence

## Index

| ID | Title | Status |
| --- | --- | --- |
| [0001](0001-record-retrospective-analysis-suite.md) | Record retrospective analysis suite in the repository | Accepted |
| [0002](0002-use-drizzle-schema-and-migrations.md) | Use Drizzle schema and migrations as database source of truth | Accepted |
| [0003](0003-use-structural-content-json.md) | Use structural content JSON instead of stored rendered HTML | Accepted |
| [0004](0004-separate-portfolio-identity-from-auth-provider-records.md) | Separate portfolio identity from auth provider records | Accepted |
| [0005](0005-preserve-comments-after-user-deletion.md) | Preserve blog comments after user deletion | Accepted |
| [0006](0006-defer-openapi-until-public-contract.md) | Defer OpenAPI until a stable public contract exists | Accepted |
| [0007](0007-compose-routes-from-partials-and-repeatables.md) | Compose routes from partials and repeatables | Accepted |
| [0008](0008-use-git-owned-manifests-for-external-tool-setup.md) | Use Git-owned manifests for external tool setup | Accepted |
| [0009](0009-use-soft-state-comment-moderation.md) | Use soft-state comment moderation | Accepted |
| [0010](0010-use-explicit-owner-allowlist-for-protected-tools.md) | Use explicit owner allowlist for protected tools | Accepted |

## Candidate ADRs

| Candidate | Reason |
| --- | --- |
| Define CMS authoring workflow ownership | Needed before adding an editor/admin surface. |
