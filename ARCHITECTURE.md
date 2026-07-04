# Architecture

This file is a concise map to the repo's local architecture notes. Use it as the first stop when deciding where a change
belongs.

- [README.md](README.md) - project setup, local development, database migration workflow, and operational commands.
- [src/app/app.md](src/app/app.md) - route boundaries, locale setup, metadata, redirects, `notFound`, and page composition.
- [src/auth/auth.md](src/auth/auth.md) - server-only account, credential, and session-oriented behavior.
- [src/cms/cms.md](src/cms/cms.md) - CMS coordination layer for route resolution, canonical URLs, fallback rules, and visibility decisions.
- [src/db/db.md](src/db/db.md) - database ownership, schema/migration workflow, Neon branch notes, and demo seed guidance.
- [src/components/heroes/heroes.md](src/components/heroes/heroes.md) - prominent page-opening sections and when they differ from partials.
- [src/components/partials/partials.md](src/components/partials/partials.md) - section-level components that own data fetching, joins, empty states, and local behavior.
- [src/components/repeatables/repeatables.md](src/components/repeatables/repeatables.md) - mostly-presentational repeated content units, split into `singles` and `collections`.

General layering: routes compose pages, partials own section behavior, repeatables render reusable repeated content, CMS
modules coordinate higher-level content rules, and DB query modules keep SQL-heavy access close to the schema.
