# Change Traceability Template

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: GitHub/Jira/Confluence

## Purpose

Use this template when preparing implementation commits, pull requests, or Jira updates that should connect back to the
analysis suite. It keeps future work from becoming another sequence of disconnected feature impulses.

## Change Summary

```text
Change:
Why:
Scope:
Out of scope:
```

## Traceability

| Field | Value |
| --- | --- |
| Requirement ids | `FR-###`, `NFR-###` |
| Story ids | `PF-###` |
| Persona/stakeholder | `PERS-###` or `SH-###` |
| Risk ids | `RISK-###` |
| ADR ids | `ADR ####` |
| Diagram ids | `PF-DIAG-###` |
| Schema/migration refs | Migration file or `N/A` |

## Verification

| Check | Result |
| --- | --- |
| Lint | Not run / Passed / Failed |
| Typecheck | Not run / Passed / Failed |
| Unit tests | Not run / Passed / Failed |
| DB check/migration | Not run / Passed / Failed |
| Manual route check | Not run / Passed / Failed |
| Docs validation | Not run / Passed / Failed |

## Documentation Updates

| Artifact | Updated? | Notes |
| --- | --- | --- |
| Requirements | Yes / No / N/A |  |
| Jira backlog | Yes / No / N/A |  |
| Traceability | Yes / No / N/A |  |
| ADR | Yes / No / N/A |  |
| Schema/migration docs | Yes / No / N/A |  |
| OpenAPI | Yes / No / N/A |  |
| Diagram inventory/source | Yes / No / N/A |  |
| Risk register | Yes / No / N/A |  |

## Residual Risk

```text
Residual risk:
Reason accepted:
Follow-up story:
Review trigger:
```

## Suggested PR Description Shape

```markdown
## Summary
- 

## Traceability
- Requirements:
- Stories:
- ADRs:
- Risks:

## Verification
- 

## Follow-ups
- 
```

