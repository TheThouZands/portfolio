import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

import type * as AuthRolePolicy from "../../src/auth/role-policy";

const require = createRequire(import.meta.url);
const {
  authRoleMeetsMinimum,
  canModerate,
  canOwn,
  isAuthRole,
  normalizeAuthRole,
} = require("../../src/auth/role-policy.ts") as typeof AuthRolePolicy;

test("auth roles are recognized and normalized conservatively", () => {
  assert.equal(isAuthRole("reader"), true);
  assert.equal(isAuthRole("moderator"), true);
  assert.equal(isAuthRole("owner"), true);
  assert.equal(isAuthRole("admin"), false);
  assert.equal(normalizeAuthRole("owner"), "owner");
  assert.equal(normalizeAuthRole("admin"), "reader");
});

test("auth role checks follow reader moderator owner order", () => {
  assert.equal(authRoleMeetsMinimum("reader", "reader"), true);
  assert.equal(authRoleMeetsMinimum("reader", "moderator"), false);
  assert.equal(authRoleMeetsMinimum("moderator", "reader"), true);
  assert.equal(authRoleMeetsMinimum("moderator", "owner"), false);
  assert.equal(authRoleMeetsMinimum("owner", "moderator"), true);
  assert.equal(canModerate("moderator"), true);
  assert.equal(canModerate("reader"), false);
  assert.equal(canOwn("owner"), true);
  assert.equal(canOwn("moderator"), false);
});
