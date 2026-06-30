# Diagram Inventory

Status: Draft  
Owner: Thouzands  
Last updated: 2026-06-29  
Target home: Figma/FigJam and Confluence

## Purpose

This inventory defines the diagrams worth generating and maintaining through the Figma/FigJam connector. It keeps each
diagram tied to a product or technical question, so visual work supports analysis instead of becoming decorative
documentation.

Use `analysis/design/figjam-section-manifest.csv` as the section creation checklist when creating or updating generated
FigJam diagrams. Record generated URLs in both the manifest and `analysis/design/figjam-creation-log.md`.

## Naming Convention

Use this format for FigJam files or sections:

```text
PF-DIAG-<number> - <short title>
```

Example:

```text
PF-DIAG-001 - Visitor Discovery Journey
```

## Diagram List

| ID | Title | Type | Primary audience | Source docs | Status |
| --- | --- | --- | --- | --- | --- |
| PF-DIAG-001 | Visitor Discovery Journey | Journey map | Product, Confluence | `problem-statement.md`, `scope-and-requirements.md`, `conversion-path.md` | Generated |
| PF-DIAG-002 | Portfolio Content Model | Entity relationship map | Technical, product | `schema-and-migrations.md`, `src/db/schema.ts`, ADR 0012 | Generated |
| PF-DIAG-003 | Auth Identifier And Session Flow | Flowchart | Technical, security | `src/auth/auth.md`, auth stories, ADR 0010 | Generated |
| PF-DIAG-004 | Blog Comment Flow | Flowchart | Product, technical | comment stories, `interaction-policy.md`, ADR 0009, `src/blog/actions.ts` | Generated |
| PF-DIAG-005 | Deployment And Neon Branch Workflow | Sequence/process map | Operations | `README.md`, `scripts/sync-neon-branch.mjs` | Generated |
| PF-DIAG-006 | Structural Content Rendering Contract | System map | Technical, content | `src/cms/structural-content/types.ts`, rendering tests, ADR 0003, ADR 0011 | Generated |
| PF-DIAG-007 | Documentation Toolchain | System/process map | Owner, collaborators | `analysis/README.md`, this suite | Generated |

## Diagram Specs

### PF-DIAG-001 - Visitor Discovery Journey

Goal: show how a potential client or reviewer moves from first impression to proof of capability.

Include:

- Entry point: localized homepage.
- Decision points: hero, experience, skills, projects, blog.
- Proof moments: project details, related skills/jobs, technical writing.
- Conversion path: service wedge, trust check, and scoped discovery/build action.

Update trigger: homepage positioning, project storytelling, or conversion path changes.

### PF-DIAG-002 - Portfolio Content Model

Goal: explain how CMS records relate without requiring readers to inspect `schema.ts`.

Include:

- Content entities as the shared identity layer.
- Companies, experience, skills, projects, blog posts, media assets.
- Translation tables and revision tables.
- Mentions and skill joins.
- Comments as blog interaction data.

Update trigger: new table, relationship, content lifecycle state, or major migration.

### PF-DIAG-003 - Auth Identifier And Session Flow

Goal: explain the portfolio-specific auth flow and where Better Auth owns behavior.

Include:

- Identifier entry.
- Username path and email path.
- Sign-up and sign-in decisions.
- Validation and rate-limit checks.
- Better Auth session creation.
- Local UI session refresh.

Update trigger: auth route/action changes, session state changes, or identity model changes.

### PF-DIAG-004 - Blog Comment Flow

Goal: show how authenticated commenting works from UI to database and back.

Include:

- Blog post page.
- Session-aware comment composer.
- Comment server action.
- Blog post and optional user association.
- Parent/child comments.
- Account deletion preserving comments through fallback author display.

Update trigger: moderation, editing, deletion, reporting, or notification behavior.

### PF-DIAG-005 - Deployment And Neon Branch Workflow

Goal: make database branch behavior understandable before local, preview, or production migrations.

Include:

- Current git branch.
- Neon branch sync script.
- Shared `preview/<git-branch>` Neon branch naming for local and Vercel preview workflows.
- `.env.local` update.
- Drizzle migration.
- Vercel build migration step.
- Warning about stale process environment values.

Update trigger: build script, Neon workflow, Vercel deployment model, or env handling changes.

### PF-DIAG-006 - Structural Content Rendering Contract

Goal: explain how stored content becomes rendered React output without trusting raw HTML.

Include:

- Structural content document.
- Allowlisted element types.
- Allowlisted attributes and token styles.
- Asset manifest.
- Renderer.
- Fallback behavior and tests.

Update trigger: structural schema version, renderer behavior, supported attributes, or security filtering changes.

### PF-DIAG-007 - Documentation Toolchain

Goal: show how local docs feed Confluence, Jira, FigJam, and GitHub.

Include:

- `analysis/` as local source.
- Confluence product/business pages.
- Jira stories and CSV imports.
- FigJam diagrams.
- GitHub ADRs, schema notes, OpenAPI contracts.
- Traceability links back to commits and code paths.

Update trigger: tool setup changes, source-of-truth changes, or import/sync workflow changes.

## FigJam Generation Rules

- Keep the Mermaid files in `analysis/design/diagrams` as the source of truth.
- Use the Figma MCP `generate_diagram` path to create or refresh FigJam visuals from Mermaid.
- If the generated path cannot represent a diagram type, leave the FigJam URL pending and keep the Mermaid source in Git.
- Put the diagram id and source docs in the generated diagram name or nearby note when the tool allows it.
- Keep product journey diagrams visually separate from technical architecture diagrams.
- Link Confluence pages back to the diagram sections after creation.
- Do not treat the diagram as authoritative unless its source docs are updated too.
- Record created file and section URLs in [figjam-creation-log.md](figjam-creation-log.md).
- Keep section status and URLs aligned with [figjam-section-manifest.csv](figjam-section-manifest.csv).
- Avoid manual FigJam-only maintenance; update Mermaid/source docs first when meaning changes, then regenerate.

## Generated FigJam Sections

| Section | Why generated |
| --- | --- |
| PF-DIAG-007 Documentation Toolchain | Helps set up the working system for all future docs. |
| PF-DIAG-001 Visitor Discovery Journey | Clarifies product value and missing conversion path. |
| PF-DIAG-002 Portfolio Content Model | Gives technical reviewers a fast schema overview. |
| PF-DIAG-003 Auth Identifier And Session Flow | Captures the most security-sensitive user flow. |
| PF-DIAG-004 Blog Comment Flow | Shows current comment behavior and future moderation boundary. |
| PF-DIAG-005 Deployment And Neon Branch Workflow | Makes database branch and migration operations reviewable. |
| PF-DIAG-006 Structural Content Rendering Contract | Explains safe rendering without raw HTML trust. |

## Local Source Sketches

| ID | Source file |
| --- | --- |
| PF-DIAG-001 | [diagrams/pf-diag-001-visitor-discovery-journey.md](diagrams/pf-diag-001-visitor-discovery-journey.md) |
| PF-DIAG-002 | [diagrams/pf-diag-002-portfolio-content-model.md](diagrams/pf-diag-002-portfolio-content-model.md) |
| PF-DIAG-003 | [diagrams/pf-diag-003-auth-identifier-session-flow.md](diagrams/pf-diag-003-auth-identifier-session-flow.md) |
| PF-DIAG-004 | [diagrams/pf-diag-004-blog-comment-flow.md](diagrams/pf-diag-004-blog-comment-flow.md) |
| PF-DIAG-005 | [diagrams/pf-diag-005-deployment-neon-branch-workflow.md](diagrams/pf-diag-005-deployment-neon-branch-workflow.md) |
| PF-DIAG-006 | [diagrams/pf-diag-006-structural-content-rendering-contract.md](diagrams/pf-diag-006-structural-content-rendering-contract.md) |
| PF-DIAG-007 | [diagrams/pf-diag-007-documentation-toolchain.md](diagrams/pf-diag-007-documentation-toolchain.md) |
