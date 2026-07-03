import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import type * as PermissionIsland from "../../src/auth/permission-island";
import type * as BlogPostStatusPermission from "../../src/auth/blog-post-status-permission";
import type * as DbSchema from "../../src/db/schema";

const require = createRequire(import.meta.url);
const {
  BLOG_POST_STATUS_PERMISSION_ENDPOINT_BASE,
  createBlogPostStatusOptionItems,
  getBlogPostStatusLabel,
  getBlogPostStatusPermissionEndpoint,
  isBlogPostCmsStatus,
} = require("../../src/auth/blog-post-status-permission.ts") as typeof BlogPostStatusPermission;
const { statusCMS } = require("../../src/db/schema.ts") as typeof DbSchema;
const {
  hiddenPermissionPayload,
  isPermissionPayload,
  normalizePermissionPayload,
} = require("../../src/auth/permission-island.ts") as typeof PermissionIsland;

test("permission payload helpers accept visible and hidden payload shapes", () => {
  assert.equal(isPermissionPayload({ visible: false }), true);
  assert.equal(
    isPermissionPayload({
      visible: true,
      data: {
        role: "reader",
      },
    }),
    true,
  );
});

test("permission payload helpers hide malformed route responses", () => {
  assert.equal(isPermissionPayload(null), false);
  assert.equal(isPermissionPayload({ visible: true }), false);
  assert.equal(isPermissionPayload({ data: { role: "owner" } }), false);
  assert.deepEqual(normalizePermissionPayload(null), hiddenPermissionPayload());
});

test("blog post status permission helpers expose schema enum status options", () => {
  const optionItems = createBlogPostStatusOptionItems(statusCMS.enumValues);

  assert.equal(isBlogPostCmsStatus("testing", statusCMS.enumValues), true);
  assert.equal(isBlogPostCmsStatus("archived", statusCMS.enumValues), false);
  assert.deepEqual(
    optionItems.map((option) => option.value),
    ["published", "hidden", "draft", "testing"],
  );
  assert.equal(getBlogPostStatusLabel("hidden"), "Hidden");
  assert.equal(
    getBlogPostStatusPermissionEndpoint(123),
    `${BLOG_POST_STATUS_PERMISSION_ENDPOINT_BASE}/123`,
  );
});
