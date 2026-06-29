# Interaction Policy

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Confluence

## Purpose

The portfolio now has account-backed blog comments. This policy explains what that interaction is for, how it should
behave, and what must be decided before comments become a more public product surface.

This is a product policy, not yet a complete moderation implementation. It gives future stories and schema changes a
clear reason to exist.

## Policy Summary

Comments exist to support technical discussion around portfolio writing. They are secondary to the portfolio's service
goal: proving fullstack product judgment. The system should therefore make commenting useful, respectful, recoverable,
and safe without turning the portfolio into a general social platform.

## Interaction Goals

| Goal | Product reason |
| --- | --- |
| Let authenticated readers respond to technical writing. | Shows the portfolio can support account-backed interaction. |
| Preserve discussion context after account deletion. | Keeps threads readable and matches ADR 0005. |
| Keep abuse controls lightweight but real. | Auth, validation, rate limits, and future moderation should protect the owner and readers. |
| Avoid overbuilding community features too early. | Comments prove interaction capability; they are not the core business model. |

## User Roles

| Role | Current behavior | Future policy need |
| --- | --- | --- |
| Anonymous visitor | Can read public comments where rendered. | Decide whether anonymous visitors can ever post. |
| Authenticated reader | Can post comments on blog posts. | Add editing/deletion/reporting rules. |
| Portfolio owner | Owns the site and can act as moderator. | Add moderation tools or admin workflow. |
| Deleted account | Comments remain as thread content with fallback author display. | Define visible copy and privacy language. |

## Comment Lifecycle

| State | Meaning | Current support |
| --- | --- | --- |
| Drafting | Reader writes a comment before submission. | Comment composer exists. |
| Submitted | Comment is saved to the blog post. | Implemented/in progress. |
| Visible | Comment renders in the thread. | Implemented. |
| Orphaned account | Comment remains after user deletion. | Implemented by nullable user reference and fallback author rendering. |
| Hidden | Comment exists but is not public. | Planned. |
| Removed | Comment is deleted or redacted. | Needs decision. |
| Reported | Comment is flagged for review. | Planned. |

## Moderation Principles

| Principle | Policy |
| --- | --- |
| Minimal surface | Add moderation features only when they protect real interaction quality. |
| Owner control | The portfolio owner must be able to hide or remove abusive or irrelevant comments. |
| Context preservation | Prefer hiding or redacting over breaking thread structure when possible. |
| Reader clarity | Readers should know whether a comment is visible, pending, hidden, or removed. |
| Privacy respect | Account deletion should remove account association while preserving thread context when appropriate. |

## Acceptable Use Baseline

Comments should support:

- Questions about the post.
- Technical corrections or clarifications.
- Experience reports related to the topic.
- Constructive disagreement.
- Follow-up ideas for future posts or projects.

Comments should not support:

- Harassment or personal attacks.
- Spam, link farming, or credential phishing.
- Sensitive personal data.
- Illegal content.
- Automated abuse or high-volume posting.

## Deletion And Preservation Policy

Current implementation preserves comments after user deletion. The product meaning is:

- A comment becomes part of the public discussion once posted.
- Removing the account should remove the live user association.
- Thread structure should remain readable.
- Future UI copy should make the fallback author state clear without exposing private history.

Open decision: whether users should be able to delete or edit individual comments independently from account deletion.

## Moderation Model Options

| Option | Description | Tradeoff |
| --- | --- | --- |
| Owner-only hide/remove | Owner can hide or remove comments manually. | Smallest useful moderation surface. |
| Pre-moderation | New comments require approval before display. | Strong control, weaker immediacy. |
| Report and review | Readers can report comments for owner review. | More community-friendly, more workflow. |
| Trust tiers | New accounts have stricter limits or review. | Useful later if traffic grows. |

Recommended first step: owner-only hide/remove plus clear hidden/removed rendering behavior.

## Data Model Implications

Future moderation likely needs fields or tables for:

- Visibility state: visible, hidden, removed, pending.
- Moderator note or reason.
- Moderated timestamp.
- Moderated by user id.
- Optional report records.
- Optional edited timestamp and edit history.

These should be analyzed before adding migrations so the schema does not grow one isolated flag at a time.

## Requirements Impact

| Requirement | Status |
| --- | --- |
| `FR-013` authenticated readers can comment | Implemented/in progress. |
| `FR-014` discussion survives account deletion | Implemented. |
| `FR-018` owner can moderate comments | Planned. |
| `NFR-011` comments should preserve trust and safety | Planned. |

## Jira Impact

| Story | Need |
| --- | --- |
| `PF-406` | Define comment moderation states and owner actions. |
| `PF-407` | Add owner hide/remove moderation workflow. |
| `PF-408` | Define reader comment edit/delete/report rules. |

## Open Questions

| Question | Default until answered |
| --- | --- |
| Can anonymous users ever post? | No. Keep posting authenticated. |
| Can users edit comments? | Not until edit history and abuse implications are clear. |
| Can users delete comments? | Needs separate decision because thread context may be affected. |
| Should comments be pre-moderated? | No for now; use owner moderation first. |
| Should preserved comments show "deleted account" or a generic fallback? | Generic fallback until privacy copy is written. |

