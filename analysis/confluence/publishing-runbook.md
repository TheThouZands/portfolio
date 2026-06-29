# Confluence Publishing Runbook

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

This runbook describes how to copy or import local analysis docs into Confluence without losing source traceability. It
does not make Confluence the source of truth for technical artifacts; it makes Confluence the readable product/business
home.

## Publishing Metadata

Every Confluence page copied from this repository should include this metadata block near the top:

| Field | Value |
| --- | --- |
| Status | Draft, Accepted, Active, Deferred, or Archived |
| Owner | Thouzands |
| Source file | Local path such as `analysis/product/problem-statement.md` |
| Source commit | Git commit hash used for the copy |
| Last local update | Date from the source file |
| External links | Related Jira issues, FigJam sections, GitHub files, or ADRs |

## Publishing Steps

1. Confirm the local source file is committed.
2. Copy the source file path and commit hash.
3. Create or update the matching Confluence page from `analysis/confluence/page-tree.md`.
4. Add the metadata block.
5. Copy the Markdown content and adjust formatting only where Confluence requires it.
6. Add links to related Jira issues, FigJam sections, and GitHub technical references.
7. Record the publication in the page mapping table below.
8. If Confluence edits change meaning, update the local source file in a follow-up commit.

## Page Mapping

| Confluence page | Local source | Source commit | Confluence URL | Last published | Notes |
| --- | --- | --- | --- | --- | --- |
| Portfolio Analysis Home | `analysis/README.md` | Pending | Pending | Pending | Root page. |
| Problem Statement | `analysis/product/problem-statement.md` | Pending | Pending | Pending | Product baseline. |
| Stakeholders And Personas | `analysis/product/stakeholders-and-personas.md` | Pending | Pending | Pending | Audience model. |
| Scope And Requirements | `analysis/product/scope-and-requirements.md` | Pending | Pending | Pending | Requirement ids must stay stable. |
| Positioning Brief | `analysis/product/positioning-brief.md` | Pending | Pending | Pending | Service position and proof strategy. |
| Service Offer Catalog | `analysis/product/service-offer-catalog.md` | Pending | Pending | Pending | Offer fit, outputs, proof, and pricing stance. |
| Content Strategy | `analysis/product/content-strategy.md` | Pending | Pending | Pending | Content pillars and publication workflow. |
| Conversion Path Brief | `analysis/product/conversion-path.md` | Pending | Pending | Pending | Visitor journey and intake path. |
| Roadmap | `analysis/planning/roadmap.md` | Pending | Pending | Pending | Stage map. |
| Risk Register | `analysis/planning/risk-register.md` | Pending | Pending | Pending | Review before implementation slices. |
| Validation Strategy | `analysis/planning/validation-strategy.md` | Pending | Pending | Pending | Done/verification expectations. |

## Formatting Notes

- Keep ids such as `FR-017`, `PF-701`, `ADR 0006`, and `PF-DIAG-001` unchanged.
- Keep status labels visible.
- Prefer Confluence tables for mapping pages, requirements, risks, and stories.
- Link ADRs and schema docs to GitHub source rather than duplicating them as editable Confluence authority.
- Keep Mermaid source in Git and FigJam; Confluence can embed or link the finished visual.

## Update Triggers

| Trigger | Action |
| --- | --- |
| Local product doc changes | Update the matching Confluence page and source commit metadata. |
| Jira import completes | Add Jira issue links to story and requirement pages. |
| FigJam diagram created | Add the FigJam section URL to relevant pages. |
| ADR accepted | Summarize in Confluence and link to GitHub ADR. |
| Schema meaning changes | Update schema summary page and link to migration/ADR evidence. |
