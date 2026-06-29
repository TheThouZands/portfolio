# Verification Catalog

Status: Draft
Owner: Thouzands
Last updated: 2026-06-29
Target home: GitHub/Confluence/Jira

## Purpose

This catalog names the current verification surface for the portfolio: package scripts, CI behavior, focused unit tests,
and the gaps that still need manual or future coverage.

Use this with `analysis/planning/validation-strategy.md`. The validation strategy defines what "done" means; this file
defines which concrete checks are available and when they are useful.

## CI Baseline

| Surface | Current behavior | Coverage | Not covered |
| --- | --- | --- | --- |
| `.github/workflows/ci.yml` | Runs on pull requests and pushes to `main` or `feature/backend`; installs with `npm ci`; runs `npm run test:ci`. | ESLint, TypeScript, and unit tests through `npm run lint`, `npm run typecheck`, and `npm run test`. | `npm run lint:scss`, `npm run db:check`, `npm run build`, `npm run build:vercel`, route screenshots, external Confluence/Jira/FigJam setup. |
| `npm run test:ci` | Local equivalent of the CI check set. | General app code health for TypeScript, lint rules, and current unit tests. | Database branch safety, visual/layout behavior, external tool imports, and public API contract checks. |

## Command Catalog

Windows PowerShell note: if `npm` resolves to a blocked `npm.ps1`, run the same script through `npm.cmd`, for example
`npm.cmd run test`. Treat it as the same verification command.

| Command | Use when | Primary evidence | Notes |
| --- | --- | --- | --- |
| `rg --files analysis` | Analysis package shape changes. | Confirms source files exist in the expected suite. | Use with manifest source-path checks. |
| `rg --pcre2 "[^\x00-\x7F]" analysis` | Analysis docs change. | Confirms docs stay ASCII unless there is a deliberate reason. | Current suite uses ASCII. |
| `rg "TO[D]O|TB[D]|FIX[M]E|anali[s]ys" analysis` | Analysis docs change. | Finds unresolved placeholders and the original analysis misspelling. | Use pattern escapes when writing docs that mention the terms. |
| `Import-Csv analysis\jira\epics.csv` | Jira epic import data changes. | Confirms CSV parses before import. | Pair with row count and spot-check field mapping. |
| `Import-Csv analysis\jira\backlog.csv` | Jira story import data changes. | Confirms CSV parses before import. | Pair with acceptance/evidence spot checks. |
| `Import-Csv analysis\confluence\page-manifest.csv` | Confluence page package changes. | Confirms page manifest parses. | Also check local source paths resolve. |
| `Import-Csv analysis\design\figjam-section-manifest.csv` | FigJam package changes. | Confirms section manifest parses. | Also check local source paths resolve. |
| `npm run lint` | TS/TSX/Next source changes or pre-PR checks. | ESLint passes. | Included in CI. |
| `npm run lint:scss` | CSS/SCSS changes. | Stylelint passes on `src/**/*.{css,scss}`. | Not included in current CI baseline. |
| `npm run typecheck` | TypeScript source, route, action, schema, or component changes. | `tsc --noEmit` passes. | Included in CI. |
| `npm run test` | Auth, comment, structural content, or shared behavior changes. | Current Node test suite passes. | Alias for `npm run test:unit`. |
| `npm run db:check` | Schema, migration, Drizzle config, or database workflow docs change. | Drizzle schema check passes. | Not included in current CI baseline. |
| `npm run build` | Route, metadata, layout, config, or deploy-sensitive changes. | Next build succeeds. | Use when runtime integration risk is higher than a unit slice. |
| `npm run build:vercel` | Deployment pipeline or migration-on-build behavior changes. | Migrations run before Next build. | Requires correct database environment; avoid casual local use against the wrong Neon branch. |
| `npm run db:branch:sync` | Preview branch environment or Neon branch workflow changes. | Neon branch/env sync succeeds. | Requires authenticated/valid Neon and Vercel environment. |
| `npm run db:branch:migrate` | Preview branch migration flow changes. | Sync then migration succeeds. | Use only after confirming the target branch/environment. |

## Focused Test Inventory

| Test file | Requirements | Stories | Behavior covered | Current gaps |
| --- | --- | --- | --- | --- |
| `tests/auth/validation.test.ts` | `FR-011`, `NFR-003` | `PF-403` | Username/email/identifier trimming, password strength, sign-in validation, sign-up counterpart rules. | Does not exercise full server actions, Better Auth session persistence, or browser form behavior. |
| `tests/auth/rate-limit-keys.test.ts` | `FR-011`, `NFR-004` | `PF-403` | Forwarded IP precedence, trusted proxy fallbacks, and scoped auth rate-limit key format. | Does not exercise rate-limit storage, expiry, or action-level enforcement. |
| `tests/blog/comments.test.ts` | `FR-013`, `FR-014` | `PF-404`, `PF-405` | Reply tree nesting, orphaned replies, fallback author names, and nested comment markup. | Does not exercise comment server actions, authentication gates, moderation, or persistence. |
| `tests/structural-content/rendering.test.ts` | `FR-008`, `NFR-014` | `PF-203` | Nested structural content rendering, known elements, unknown fallback elements, unsafe attribute filtering, and null placeholders. | Does not exercise CMS authoring, preview workflows, localization, or database-backed content fixtures. |

## Capability Coverage

| Capability | Current verification | Follow-up coverage when touched |
| --- | --- | --- |
| Public portfolio pages | Manual route review, lint/typecheck, future build when route composition changes. | Add route, visual, accessibility, or metadata checks when service conversion pages become core. |
| Internationalized routes and metadata | Manual locale route checks plus typecheck. | Add route/metadata regression tests if locale behavior changes frequently. |
| CMS schema and migrations | `npm run db:check`, migration catalog review, schema table catalog review. | Add query or fixture tests when authoring flows depend on specific data relationships. |
| Structural content rendering | `tests/structural-content/rendering.test.ts`. | Add authoring/preview tests aligned to ADR 0011 before owner CMS editing ships. |
| Auth validation and rate-limit keys | `tests/auth/validation.test.ts`, `tests/auth/rate-limit-keys.test.ts`. | Add action/session integration tests before owner-only tools or expanded account scope. |
| Blog comments | `tests/blog/comments.test.ts`. | Add action, persistence, moderation, and auth-gate tests before broader public use. |
| Database branch operations | Manual env review, `npm run db:branch:sync`, `npm run db:branch:migrate` when relevant. | Keep branch-target checks explicit in PR notes before migration or deployment changes. |
| External tool setup | CSV parse checks and source-path checks. | Record Confluence URLs, Jira keys, FigJam URLs, and source commits after each external batch. |
| Public API contract | API surface inventory review and ADR 0006. | Create OpenAPI spec only after a stable external API contract is accepted. |

## Run Selection Rules

| Change type | Minimum local verification |
| --- | --- |
| Analysis-only docs | Text hygiene checks plus affected CSV parse/source-path checks. |
| Jira backlog/epic changes | `Import-Csv analysis\jira\epics.csv`, `Import-Csv analysis\jira\backlog.csv`, and story acceptance/evidence review. |
| Confluence package changes | `Import-Csv analysis\confluence\page-manifest.csv` and source-path resolution. |
| FigJam package changes | `Import-Csv analysis\design\figjam-section-manifest.csv` and source-path resolution. |
| Auth validation or rate-limit changes | `node --import tsx --test tests/auth/validation.test.ts tests/auth/rate-limit-keys.test.ts` for a focused run, or `npm run test` for the suite; add `npm run typecheck` when source types change. |
| Comment rendering or discussion model changes | `node --import tsx --test tests/blog/comments.test.ts` for a focused run, or `npm run test` for the suite; update interaction policy/ADR if trust behavior changes. |
| Structural content renderer changes | `node --import tsx --test tests/structural-content/rendering.test.ts` for a focused run, or `npm run test` for the suite; update ADR 0003 if the contract changes. |
| Schema or migration changes | `npm run db:check`, schema table catalog review, migration catalog review, and ADR review if product meaning changes. |
| Route/layout/metadata changes | `npm run lint`, `npm run typecheck`, route manual review, and `npm run build` when integration risk is material. |
| Pre-PR or release candidate | `npm run test:ci` plus the risk-specific checks above. |

## Evidence Recording

Record verification in PR notes, Jira comments, or local execution logs with:

| Field | Example |
| --- | --- |
| Command or check | `npm run test:ci` |
| Result | Passed, failed, skipped, or blocked. |
| Scope | Auth validation, comments, schema, route, Confluence manifest, Jira import. |
| Date/source | Date and commit or branch where the check was run. |
| Known gaps | Manual checks not run, external setup pending, environment unavailable, or coverage not yet implemented. |

Do not treat a passing command as proof for behavior it does not cover. If a check is skipped because the slice does not
touch that risk area, say that directly rather than letting the absence look like proof.
