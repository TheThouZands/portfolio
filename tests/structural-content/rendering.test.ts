import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import type ContentComponent from "../../src/components/repeatables/structural-content/Content";
import type * as StructuralAttributes from "../../src/components/repeatables/structural-content/elements/attributes";

const require = createRequire(import.meta.url);
const { default: Content } = require(
  "../../src/components/repeatables/structural-content/Content.tsx",
) as { default: typeof ContentComponent };
const { getHtmlAttributes } = require(
  "../../src/components/repeatables/structural-content/elements/attributes.ts",
) as typeof StructuralAttributes;

function renderContent(value: unknown) {
  return renderToStaticMarkup(createElement(Content, { value }));
}

test("structural content renders nested text and known elements", () => {
  const html = renderContent([
    {
      type: "p",
      attrs: {
        class: "lead",
        id: "intro",
      },
      content: [
        {
          type: "text",
          content: "Hello ",
        },
        "world",
      ],
    },
    {
      type: "figure",
      content: [
        {
          type: "img",
          attrs: {
            src: "/images/poster.jpg",
            alt: "Poster",
            width: 320,
            height: 180,
          },
        },
      ],
    },
  ]);

  assert.match(
    html,
    /<p class="lead" id="intro" data-structural-type="p">Hello world<\/p>/,
  );
  assert.match(html, /<figure data-structural-type="figure">/);
  assert.match(
    html,
    /<img src="\/images\/poster.jpg" alt="Poster" width="320" height="180" data-structural-type="img"\/>/,
  );
});

test("unknown structural elements fall back to divs without losing their type", () => {
  const html = renderContent({
    type: "callout",
    attrs: {
      class: "notice",
      "data-kind": "info",
    },
    content: "Read this",
  });

  assert.equal(
    html,
    '<div class="notice" data-kind="info" data-structural-type="callout">Read this</div>',
  );
});

test("structural attributes filter unsafe or non-HTML values", () => {
  const attrs = getHtmlAttributes({
    class: "notice",
    onClick: "alert(1)",
    style: "color: red",
    dangerouslySetInnerHTML: "<script></script>",
    children: "bad",
    tabIndex: 2,
    hidden: true,
    complex: {
      value: "not renderable",
    },
  });

  assert.deepEqual(attrs, {
    className: "notice",
    tabIndex: 2,
    hidden: true,
  });
});

test("null structural content renders an explicit empty placeholder element", () => {
  assert.equal(renderContent(null), '<div data-structural-type="empty"></div>');
});
