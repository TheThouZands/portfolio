Cards render one repeated content item.

They should stay comparatively small and mostly presentational. A card can format dates, expose semantic HTML for one
entry, and render compact content, but it should not usually fetch its own data or decide which records belong in a
section.

Good fits:

- one blog post preview
- one project preview
- one experience summary item
- one media/search/result item

Partials should usually fetch and loop data, then pass each item into a card.
