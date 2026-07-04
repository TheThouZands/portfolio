import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import type * as CommentPolicy from "../../src/blog/comment-policy";
import type * as BlogComments from "../../src/components/repeatables/collections/blog/Comments";

const require = createRequire(import.meta.url);
const {
  BLOG_COMMENT_BODY_MAX_LENGTH,
  validateBlogCommentBody,
} = require("../../src/blog/comment-policy.ts") as typeof CommentPolicy;
const {
  buildCommentTree,
  default: CommentThread,
} = require(
  "../../src/components/repeatables/collections/blog/Comments.tsx",
) as typeof BlogComments;

const createdAt = new Date("2026-06-24T12:00:00.000Z");

test("comment tree nests replies and keeps orphaned replies visible", () => {
  const thread = buildCommentTree([
    {
      authorName: "Ada",
      body: "Root",
      createdAt,
      id: 1,
      parentCommentId: null,
    },
    {
      authorName: "Grace",
      body: "Reply",
      createdAt,
      id: 2,
      parentCommentId: 1,
    },
    {
      authorName: null,
      body: "Orphan",
      createdAt,
      id: 3,
      parentCommentId: 999,
    },
  ]);

  assert.equal(thread.length, 2);
  assert.equal(thread[0]?.id, 1);
  assert.equal(thread[0]?.replies[0]?.id, 2);
  assert.equal(thread[1]?.id, 3);
});

test("comment body validation trims content and caps stored length", () => {
  assert.deepEqual(validateBlogCommentBody("  hello  "), {
    body: "hello",
    reason: null,
    valid: true,
  });
  assert.deepEqual(validateBlogCommentBody("   "), {
    body: "",
    reason: "empty",
    valid: false,
  });
  assert.equal(
    validateBlogCommentBody("x".repeat(BLOG_COMMENT_BODY_MAX_LENGTH)).valid,
    true,
  );
  assert.deepEqual(
    validateBlogCommentBody("x".repeat(BLOG_COMMENT_BODY_MAX_LENGTH + 1)),
    {
      body: "x".repeat(BLOG_COMMENT_BODY_MAX_LENGTH + 1),
      reason: "too_long",
      valid: false,
    },
  );
});

test("comment thread renders authors, fallback author names, and nested bodies", () => {
  const html = renderToStaticMarkup(
    createElement(CommentThread, {
      comments: [
        {
          authorName: "Ada",
          body: "Root",
          createdAt,
          id: 1,
          parentCommentId: null,
        },
        {
          authorName: null,
          body: "Reply",
          createdAt,
          id: 2,
          parentCommentId: 1,
        },
      ],
      fallbackAuthorName: "Someone",
      locale: "en",
    }),
  );

  assert.match(html, /Ada/);
  assert.match(html, /Someone/);
  assert.match(html, /Root/);
  assert.match(html, /Reply/);
  assert.match(html, /<ol><li><article>/);
  assert.match(html, /<ol><li><article>.*<ol><li><article>/);
});

test("comment thread renders optional actions for each comment", () => {
  const html = renderToStaticMarkup(
    createElement(CommentThread, {
      comments: [
        {
          authorName: "Ada",
          body: "Root",
          createdAt,
          id: 1,
          parentCommentId: null,
        },
        {
          authorName: "Grace",
          body: "Reply",
          createdAt,
          id: 2,
          parentCommentId: 1,
        },
      ],
      fallbackAuthorName: "Someone",
      locale: "en",
      renderActions: (comment) =>
        createElement(
          "button",
          { type: "button" },
          `Moderate ${comment.id}`,
        ),
    }),
  );

  assert.match(html, /Moderate 1/);
  assert.match(html, /Moderate 2/);
});
