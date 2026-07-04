# ADR 0005: Preserve Blog Comments After User Deletion

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

Blog comments are part of reader interaction and technical discussion. If a user account is removed, deleting all of the
user's comments can damage discussion context, especially when replies depend on a parent comment.

The current schema lets comments reference a user id but does not require every comment to keep a live account forever.
Rendering supports fallback author names, and tests cover orphaned/nested comment behavior.

## Decision

Preserve comment records after user deletion by allowing the user reference to become null and rendering a fallback
author label.

Discussion content belongs to the blog thread once posted. The user association improves authorship display while the
account exists, but the thread should remain readable when an account is deleted.

## Consequences

Positive:

- Existing discussions remain coherent after account deletion.
- Replies do not disappear only because an account was removed.
- Anonymous or orphaned seed/comment states can be rendered consistently.

Tradeoffs:

- The product must define deletion, moderation, and privacy language carefully.
- A deleted account can no longer manage preserved comments unless future ownership rules are added.
- Moderation state is still a separate missing concept.

## Evidence

- `comments.userId` in `src/db/schema.ts`
- `tests/blog/comments.test.ts`
- `src/components/repeatables/collections/blog/Comments.tsx`
- `analysis/product/content-strategy.md`
- Commits: `4083894`, `1033065`, `cc9073d`, `3d145da`, `94566f8`

## Follow-Ups

- Define comment moderation, editing, deletion, and reporting policy.
- Decide whether preserved comments need visible "deleted account" copy versus generic fallback names.
- Add story coverage for comment moderation before public traffic grows.

