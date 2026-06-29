# ADR 0009: Use Soft-State Comment Moderation

Status: Accepted
Date: 2026-06-29
Owner: Thouzands

## Context

The portfolio already supports account-backed blog comments and preserves discussion context after account deletion.
That behavior is captured in ADR 0005. The next trust gap is moderation: the owner needs a way to hide or remove
abusive, spammy, or irrelevant comments without breaking nested thread structure.

The current `comments` table stores blog post, optional user, optional parent comment, body, and timestamps. It does not
represent moderation state, reports, edit history, or owner actions yet.

The product policy recommends owner-only hide/remove as the first moderation step. Reader edit, delete, and report
actions are useful later but would add more workflow and abuse cases than the portfolio needs for the first trust
control.

## Decision

Represent future comment moderation as soft state on comment records instead of deleting comment rows for normal
moderation actions.

The first moderation migration should add a small owner-controlled visibility model:

- `visible`: the default public state.
- `hidden`: the owner hides the comment from public display while keeping it reviewable.
- `removed`: the public thread keeps a placeholder or redacted state so replies and chronology remain understandable.

The first migration may also include nullable moderation metadata, such as:

- `moderated_at`
- `moderated_by_user_id`
- `moderation_reason`

Do not add reader report records, reader edit history, trust tiers, or pre-moderation queues in the first moderation
slice. Revisit those only when there is enough public interaction to justify the extra workflow.

## Consequences

Positive:

- Thread structure survives moderation because normal owner actions do not delete parent rows.
- The model aligns with ADR 0005's decision to preserve discussion context.
- Owner moderation can ship before a heavier community workflow.
- Future rendering can clearly distinguish hidden content from removed or redacted content.

Tradeoffs:

- Public rendering must filter or transform comment bodies based on visibility state.
- The owner UI needs a protected authorization model before moderation actions are safe.
- Soft-state moderation means database records can contain non-public comment text, so owner access and privacy copy
  matter.
- Reports, reader edits, and reader deletions remain unresolved product features.

## Evidence

- `src/db/schema.ts`
- `tests/blog/comments.test.ts`
- `analysis/product/interaction-policy.md`
- `analysis/product/auth-account-roadmap.md`
- `analysis/technical/adr/0005-preserve-comments-after-user-deletion.md`
- `analysis/planning/requirements-traceability-matrix.md`
- Stories: `PF-406`, `PF-407`, `PF-408`, `PF-409`, `PF-411`

## Follow-Ups

- Add a Drizzle migration for the visibility model before implementing owner moderation actions.
- Update `analysis/technical/schema-table-catalog.md`, `schema-and-migrations.md`, and `migration-catalog.md` when the
  migration exists.
- Add tests for public filtering, owner review visibility, and hidden/removed placeholder rendering.
- Implement the ADR 0010 owner guard before exposing moderation routes or actions.
- Revisit reader edit, delete, and report controls after real comment usage creates evidence for them.
