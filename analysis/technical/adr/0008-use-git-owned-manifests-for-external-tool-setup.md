# ADR 0008: Use Git-Owned Manifests For External Tool Setup

Status: Accepted
Date: 2026-06-29
Owner: Thouzands

## Context

The analysis suite is meant to move into Confluence, Jira, and FigJam, but those tools are not fully set up yet. The
project still needs stable local ids, reviewable setup batches, and a way to verify that page, issue, and diagram setup
matches the local analysis before external URLs and keys exist.

The suite now has structured local setup artifacts:

- `analysis/confluence/page-manifest.csv`
- `analysis/jira/epics.csv`
- `analysis/jira/backlog.csv`
- `analysis/design/figjam-section-manifest.csv`

Without a decision, these CSV files could drift into temporary helper files that nobody trusts, while Confluence, Jira,
and FigJam setup is still pending.

## Decision

Keep Git-owned manifests as the local source for external tool setup until the corresponding Confluence pages, Jira
issues, and FigJam sections exist.

Use the manifests to define:

- Stable local ids and names.
- Parent/page/epic/section relationships.
- Local source files.
- Creation order or priority.
- Status and external URL/key placeholders.
- Verification checks before and after external setup.

After external setup, Confluence, Jira, and FigJam can own their collaboration or execution state, but local manifests
must continue to record the external ids, URLs, and source commits needed for traceability.

## Consequences

Positive:

- External setup can happen in small, checkable batches.
- Local docs stay reviewable before tool access exists.
- The same ids can connect requirements, Jira issues, Confluence pages, FigJam sections, commits, and ADRs.
- CSV parsing and source-path checks give a lightweight validation gate.

Tradeoffs:

- Some setup data is duplicated between Git and external tools after import.
- External updates require a follow-up Git change when they create meaningful ids, URLs, or source-of-truth changes.
- The manifests are not a full automation layer; they are a controlled setup checklist unless automation is added later.

## Evidence

- `analysis/confluence/page-manifest.csv`
- `analysis/jira/epics.csv`
- `analysis/jira/backlog.csv`
- `analysis/design/figjam-section-manifest.csv`
- `analysis/planning/tool-setup-plan.md`
- `analysis/planning/validation-strategy.md`
- `analysis/github/documentation-rules.md`

## Follow-Ups

- Fill Confluence URLs in `analysis/confluence/page-manifest.csv` after page creation.
- Fill Jira keys in `analysis/jira/import-history.md` after issue import or manual creation.
- Fill FigJam section URLs in `analysis/design/figjam-section-manifest.csv` and `analysis/design/figjam-creation-log.md`.
- Revisit whether lightweight automation is worth adding after the first manual setup pass.
