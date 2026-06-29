# Release And Review Cadence

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence/Jira

## Purpose

This document defines a lightweight cadence for reviewing the portfolio product, its analysis suite, and future delivery
slices. It keeps the project from returning to aimless feature accumulation.

## Cadence Summary

| Cadence | Review | Output |
| --- | --- | --- |
| Per slice | Validate the completed change. | Updated docs, tests/checks, commit, and residual risks if any. |
| Weekly or work-session based | Review active stories and risks. | Ready next slice and updated risk notes. |
| Monthly | Review positioning, conversion path, content, and backlog direction. | Updated roadmap, priorities, and open questions. |
| Before external tool sync | Review Confluence/Jira/FigJam mappings. | Updated publishing/import logs. |
| Before public feature launch | Review requirements, trust, security, docs, and validation evidence. | Launch checklist and go/no-go decision. |

## Per-Slice Review

Use this for each small commit or implementation step:

- What requirement, story, risk, or decision does this serve?
- Did the change stay within the intended scope?
- What verification was run?
- Did any docs, ADRs, schema notes, diagrams, or backlog rows need updates?
- Is there a residual risk or follow-up story?

For implementation slices, use `analysis/github/change-traceability-template.md` or include equivalent details in the
PR/story notes.

Use `analysis/operations/artifact-maintenance-matrix.md` to decide which neighboring artifacts must be updated.

## Monthly Product Review

Review:

- Positioning: does the service wedge still match the portfolio?
- Conversion: is the next action clear and useful?
- Content: do projects, posts, skills, and experience support service proof?
- Backlog: are planned stories still relevant?
- Risks: did likelihood or impact change?
- Tooling: are Confluence, Jira, and FigJam mappings current?

## Launch Review

Use before a feature becomes public-facing or materially changes user trust.

| Area | Check |
| --- | --- |
| Product | Persona, requirement, and story are clear. |
| UX/content | User-facing copy and states are understandable. |
| Security/trust | Validation, authorization, rate limits, moderation, or privacy implications are handled. |
| Data | Schema, migrations, seed/demo data, and cleanup behavior are reviewed. |
| Tests | Risk-appropriate tests or manual verification are recorded. |
| Docs | Requirements, traceability, ADRs, and diagrams are updated as needed. |

## Review Artifacts

| Artifact | When to update |
| --- | --- |
| `analysis/planning/roadmap.md` | Direction or stage changes. |
| `analysis/planning/risk-register.md` | Risk likelihood, impact, mitigation, or ownership changes. |
| `analysis/operations/artifact-maintenance-matrix.md` | Artifact ownership, source-of-truth, trigger, or validation rule changes. |
| `analysis/operations/decision-log.md` | Product or delivery decision does not need a full ADR but should be remembered. |
| `analysis/operations/open-questions.md` | A decision is not ready but must remain visible. |
| `analysis/jira/user-stories.md` and `backlog.csv` | Story, priority, acceptance, or evidence changes. |
| `analysis/technical/adr` | Technical decision changes architecture, data, security, or contract behavior. |
