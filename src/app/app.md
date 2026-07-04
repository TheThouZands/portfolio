Files under `src/app` are route boundaries.

Use them to describe what a route is made of, not to implement the full behavior of every section. Route files should
stay close to layout and routing concerns:

- locale validation and `setRequestLocale`
- metadata, redirects, `notFound`, and route params
- route-level caching or dynamic/static policy
- page/layout composition
- light synchronization needed by the route itself
- development-only well-known integrations that must live at a specific URL

Prefer moving section behavior into `components/partials`. Partials may fetch data, join CMS tables, decide empty
states, and render reusable regions. Smaller repeated display pieces should live in `components/repeatables` and be
passed shaped data.

The Chrome DevTools workspace route at `/.well-known/appspecific/com.chrome.devtools.json` is intentionally kept here
because the URL is prescribed by DevTools. It should return data only in local development.

Specialized resolver routes outside `[locale]`, such as `/blog/[slug]`, should only redirect or return protocol-level
responses. Because `next-intl` middleware runs before route matching, these routes also need an explicit proxy
exception before they can inspect their own URL.

A route should read like a table of contents for the page.
