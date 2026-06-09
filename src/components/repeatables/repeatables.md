Repeatables are reusable content display units for items that appear more than once.

They sit between primitive UI and section partials. Repeatables should stay mostly presentational: they can format
dates, expose semantic HTML, and arrange repeated content, but they should not usually fetch their own data or decide
which records belong in a section.

Use `singles` for one repeated item:

- one blog post preview
- one project preview
- one experience summary item
- one media/search/result item

Use `collections` for a presentational arrangement of repeated items:

- a grid of blog post previews
- an ordered list of experience summaries
- a horizontal rail of projects
- a compact list of media results

Partials should usually fetch, filter, provide headings, and handle empty/loading states before passing records into a
repeatable single or collection.
