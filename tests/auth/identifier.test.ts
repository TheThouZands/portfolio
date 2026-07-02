import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import type * as AuthIdentifier from "../../src/auth/identifier";

const require = createRequire(import.meta.url);
const {
  isInternalAuthEmail,
  normalizeAuthIdentifier,
  toAppEmail,
} = require("../../src/auth/identifier.ts") as typeof AuthIdentifier;

test("auth identifiers normalize to canonical lower-case values", () => {
  assert.equal(normalizeAuthIdentifier("  Reader.Name  "), "reader.name");
  assert.equal(
    normalizeAuthIdentifier("  READER@example.COM  "),
    "reader@example.com",
  );
});

test("internal auth emails are persistence-only app-facing nulls", () => {
  assert.equal(isInternalAuthEmail("account@users.invalid"), true);
  assert.equal(isInternalAuthEmail("ACCOUNT@users.invalid"), true);
  assert.equal(isInternalAuthEmail("reader@example.com"), false);
  assert.equal(toAppEmail("ACCOUNT@users.invalid"), null);
  assert.equal(toAppEmail(" Reader@Example.COM "), "reader@example.com");
});
