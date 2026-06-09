Heroes are prominent page-opening sections.

They may be visually bold and can coordinate with route/page context, but they should still behave like reusable
components rather than route files. Use a hero when the first viewport needs a strong identity, message, or object focus.

Heroes can be heavier than a card because they often carry animation, media, or header coordination. Keep their public
API intentional, and keep route validation, redirects, metadata, and locale setup in `src/app`.

If a component is not meant for the top of a page, prefer a partial or a smaller component category.
