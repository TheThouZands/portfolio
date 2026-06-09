Files under `src/app` are route boundaries.

Use them to describe what a route is made of, not to implement the full behavior of every section. Route files should
stay close to layout and routing concerns:

- locale validation and `setRequestLocale`
- metadata, redirects, `notFound`, and route params
- route-level caching or dynamic/static policy
- page/layout composition
- light synchronization needed by the route itself

Prefer moving section behavior into `components/partials`. Partials may fetch data, join CMS tables, decide empty
states, and render reusable regions. Smaller presentational pieces such as cards should live outside partials and be
passed shaped data.

A route should read like a table of contents for the page.
