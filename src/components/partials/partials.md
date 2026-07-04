Partials are section-level components: larger than one repeatable item or button, smaller than a page.

They are allowed to own the gross behavior for a page region, including data fetching, joins, empty states, and local
interaction. A partial should usually answer: "what does this section need to show, and how does this section behave?"

Good fits:

- CMS-backed sections such as featured blog posts or an experience chart
- reusable page regions that may appear on more than one route
- components that coordinate several smaller repeatables, controls, or display units
- section-level loading, empty, and preview behavior

Avoid using partials for one repeated item. A single blog card, project card, badge, date label, or purely visual grid
belongs in `components/repeatables` and can be consumed by a partial.

Routes in `src/app` should compose partials and handle route concerns. Partials can then focus on section behavior.

When a section renders repeated content, the partial should choose the records and pass them into a smaller repeatable
collection. Progressive loading, pagination, and client-side cache behavior should be added at the partial/feed layer
rather than inside the presentational grid.
