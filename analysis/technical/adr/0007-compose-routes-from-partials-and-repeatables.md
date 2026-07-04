# ADR 0007: Compose Routes From Partials And Repeatables

Status: Accepted  
Date: 2026-06-29  
Owner: Thouzands

## Context

The portfolio uses Next.js App Router. Early implementation could have allowed route files to accumulate page behavior,
data joins, empty states, and repeated display details directly. The existing local architecture notes instead describe
a layered component boundary:

- Routes own routing concerns and page composition.
- Partials own section-level behavior such as data fetching, joins, empty states, and local interaction.
- Repeatables render reusable repeated content units.
- CMS modules coordinate higher-level content rules.
- DB query modules keep SQL-heavy access close to the schema.

This boundary is already visible in the codebase and documentation, but it had not yet been recorded as an ADR.

## Decision

Use route files as composition boundaries. Route files should read like a table of contents for the page and stay close
to routing concerns:

- Locale validation and `setRequestLocale`.
- Metadata, redirects, `notFound`, and route params.
- Route-level caching or dynamic/static policy.
- Page/layout composition.
- Light route synchronization.
- Framework-prescribed routes that must live at a specific URL.

Move section behavior into partials. Move repeated display items and collections into repeatables.

## Consequences

Positive:

- Route files stay readable as page structure.
- Section behavior has a reusable home without forcing everything into route boundaries.
- Repeatable cards/lists remain mostly presentational.
- Data-heavy query logic can stay near the schema instead of leaking through UI layers.

Tradeoffs:

- Some behavior needs an extra module hop instead of living beside the route.
- Naming discipline matters; otherwise partials can become vague dumping grounds.
- Very small sections may not need immediate extraction until reuse or behavior justifies it.

## Evidence

- `ARCHITECTURE.md`
- `src/app/app.md`
- `src/components/partials/partials.md`
- `src/components/repeatables/repeatables.md`
- `src/cms/cms.md`
- `src/db/db.md`
- Commits: `0becf78`, `8a37c2b`, `ce8e785`, `0ee1b01`, `619d869`, `29f3709`, `7482d77`

## Follow-Ups

- Add a lint/test pattern only if route files start regressing into large behavior containers.
- Revisit component boundaries when CMS authoring or owner moderation routes are implemented.
- Keep module-local `.md` notes updated when a directory's ownership changes.

