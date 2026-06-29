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

## Candidate ADRs

| Candidate | Reason |
| --- | --- |
| Use Next.js App Router with route files as composition boundaries | Existing architecture docs already describe this separation. |
| Use Drizzle schema and migrations as the database source of truth | Important operational and review decision. |
| Use structural content JSON instead of rendered HTML storage | Central to CMS safety and rendering flexibility. |
| Use Better Auth plus portfolio-owned identity records | Explains separation between Better Auth user/session records and CMS-owned identifiers. |
| Preserve comments after user deletion | Product and data integrity decision around discussion history. |
| Keep OpenAPI deferred until a stable public API exists | Prevents false contract promises. |

