CMS modules contain behavior that coordinates lower-level CMS data.

Use this layer for decisions that are more than one direct query: route resolution, canonical URL choices, fallback
rules, publishing visibility composition, and later language alternate maps.

Keep SQL-heavy data access in `src/db/queries`. A CMS module can call those query functions and organize the result for
routes, partials, or actions.

For blog URLs, the CMS layer owns the difference between a bare slug resolver and a localized canonical article route.
The bare resolver can infer the target locale from the slug, then redirect into the locale-prefixed route tree.
