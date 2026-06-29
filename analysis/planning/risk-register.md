# Risk Register

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira

## Purpose

This risk register captures product, technical, planning, and tool-adoption risks for the portfolio analysis suite and
the portfolio product it describes. It should be reviewed when requirements, Jira stories, ADRs, schema, or public
interaction behavior changes.

## Risk Scale

| Value | Meaning |
| --- | --- |
| Low | Manageable with normal review. |
| Medium | Needs explicit mitigation or follow-up story. |
| High | Can materially weaken product value, trust, or delivery safety. |

## Current Risks

| ID | Risk | Area | Likelihood | Impact | Mitigation | Related docs/stories |
| --- | --- | --- | --- | --- | --- | --- |
| RISK-001 | The portfolio still reads as a feature collection instead of a service offer. | Product | Medium | High | Use positioning, conversion path, and service-linked proof content. | `positioning-brief.md`, `conversion-path.md`, `PF-701` |
| RISK-002 | Demo content proves the CMS shape but not enough real business credibility. | Content | Medium | High | Add real case-study backlog and replace or supplement synthetic examples. | `content-strategy.md`, future case-study stories |
| RISK-003 | Comments become public interaction without moderation tools. | Trust/safety | Medium | High | Implement the ADR 0009 owner hide/remove soft-state workflow before inviting broader use. | `interaction-policy.md`, ADR 0009, `PF-407` |
| RISK-004 | Auth scope grows into account product complexity too early. | Product/technical | Medium | Medium | Keep auth tied to reader comments until client/private account use is analyzed. | `interaction-policy.md`, future auth roadmap |
| RISK-005 | Analysis docs drift from implementation after app changes. | Process | Medium | High | Require traceability updates when requirements, schema, routes, or ADR-level decisions change. | `documentation-rules.md`, `traceability.md` |
| RISK-006 | Jira import loses local ids or context. | Tooling | Low | Medium | Keep local ids stable and record import mappings/history. | `jira/project-setup.md`, `jira/backlog.csv` |
| RISK-007 | Confluence becomes a stale copy of Git docs. | Tooling | Medium | Medium | Keep Git as source for ADRs/schema/API and include source file plus commit references in Confluence. | `confluence/page-tree.md`, `github/documentation-rules.md` |
| RISK-008 | FigJam diagrams become decorative rather than source-backed. | Tooling/design | Medium | Medium | Maintain diagram inventory, source docs, update triggers, and local Mermaid sketches. | `design/diagram-inventory.md`, `design/diagrams` |
| RISK-009 | Database migrations are applied to the wrong Neon branch because of stale environment values. | Operations | Medium | High | Keep README warning visible; prefer clean terminal/env before migration. | `schema-and-migrations.md`, ADR 0002 |
| RISK-010 | OpenAPI is created before a stable public API exists. | Architecture | Low | Medium | Keep OpenAPI deferred until a public contract decision is made. | `openapi.md`, ADR 0006 |
| RISK-011 | Structural content contract changes without migration or renderer strategy. | Technical | Low | High | Treat schema version changes as ADR/migration-worthy and update renderer tests. | ADR 0003, PF-DIAG-006 |
| RISK-012 | Contact/intake path collects too much or too little information. | Product | Medium | Medium | Start with minimal intake questions and validate whether leads map to service wedges. | `conversion-path.md`, `PF-702` |
| RISK-013 | CMS authoring starts as isolated admin forms instead of a coherent workflow. | Product/technical | Medium | High | Use CMS authoring workflow before adding editor routes or migrations. | `cms-authoring-workflow.md`, `PF-205`, `PF-206` |
| RISK-014 | Account scope grows beyond reader and owner needs without product justification. | Product/security | Medium | Medium | Use auth/account roadmap and defer client/private accounts until a real use case exists. | `auth-account-roadmap.md`, `PF-409`, `PF-410`, `PF-411` |

## Review Cadence

Review this register:

- Before importing backlog into Jira.
- Before adding moderation schema.
- Before adding a public contact/intake route.
- Before creating a public OpenAPI contract.
- After any significant schema or auth change.
- Before copying analysis docs into Confluence.

## Escalation Rules

| Condition | Action |
| --- | --- |
| A high-impact risk has no mitigation story | Add or update a Jira story before implementation. |
| A mitigation requires a technical decision | Add or update an ADR. |
| A risk affects user trust or privacy | Update product policy before implementation. |
| A risk affects schema or migrations | Update schema notes and migration plan. |
