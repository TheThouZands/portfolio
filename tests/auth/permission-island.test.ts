import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import type * as PermissionIsland from "../../src/auth/permission-island";

const require = createRequire(import.meta.url);
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
