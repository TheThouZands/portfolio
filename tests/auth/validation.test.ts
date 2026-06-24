import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import type { z } from "zod";

import type * as AuthValidation from "../../src/auth/validation";

const require = createRequire(import.meta.url);
const {
  authEmailSchema,
  authIdentifierSchema,
  authPasswordSchema,
  authUsernameSchema,
  signInIdentifierBody,
  signUpIdentifierBody,
} = require("../../src/auth/validation.ts") as typeof AuthValidation;

function assertFirstIssue<T>(
  schema: z.ZodType<T>,
  input: unknown,
  expectedMessage: string,
) {
  const parsed = schema.safeParse(input);

  assert.equal(parsed.success, false);

  if (!parsed.success) {
    assert.equal(parsed.error.issues[0]?.message, expectedMessage);
  }
}

test("username validation trims input and rejects email-shaped usernames", () => {
  assert.equal(authUsernameSchema.parse("  author  "), "author");

  assertFirstIssue(
    authUsernameSchema,
    "ab",
    "Username must be at least 3 characters.",
  );
  assertFirstIssue(
    authUsernameSchema,
    "author@example",
    "Username cannot contain @.",
  );
});

test("email and identifier validation enforce the selected identifier shape", () => {
  assert.equal(authEmailSchema.parse("  author@example.com  "), "author@example.com");
  assert.equal(authIdentifierSchema.parse("  author  "), "author");
  assert.equal(
    authIdentifierSchema.parse("  author@example.com  "),
    "author@example.com",
  );

  assertFirstIssue(
    authIdentifierSchema,
    "author@",
    "Enter a valid email address.",
  );
});

test("password validation requires length, a letter, and a number", () => {
  assert.equal(authPasswordSchema.parse("abc12345"), "abc12345");

  assertFirstIssue(
    authPasswordSchema,
    "abc1234",
    "Password must be at least 8 characters.",
  );
  assertFirstIssue(
    authPasswordSchema,
    "abcdefgh",
    "Password must include at least one number.",
  );
  assertFirstIssue(
    authPasswordSchema,
    "12345678",
    "Password must include at least one letter.",
  );
});

test("sign-in allows existing passwords to fail verification outside validation", () => {
  assert.deepEqual(
    signInIdentifierBody.parse({
      identifier: "author",
      password: "short",
    }),
    {
      identifier: "author",
      password: "short",
    },
  );

  assertFirstIssue(signInIdentifierBody, {
    identifier: "author",
    password: "",
  }, "Password is required.");
});

test("sign-up requires the missing counterpart for email-first identifiers", () => {
  assert.deepEqual(
    signUpIdentifierBody.parse({
      identifier: "author@example.com",
      otherIdentifier: "author",
      password: "abc12345",
    }),
    {
      identifier: "author@example.com",
      otherIdentifier: "author",
      password: "abc12345",
    },
  );

  assertFirstIssue(
    signUpIdentifierBody,
    {
      identifier: "author@example.com",
      password: "abc12345",
    },
    "Username is required.",
  );
});

test("sign-up keeps email optional for username-first identifiers", () => {
  assert.deepEqual(
    signUpIdentifierBody.parse({
      identifier: "author",
      password: "abc12345",
    }),
    {
      identifier: "author",
      password: "abc12345",
    },
  );

  assertFirstIssue(
    signUpIdentifierBody,
    {
      identifier: "author",
      otherIdentifier: "not-an-email",
      password: "abc12345",
    },
    "Enter a valid email address.",
  );
});
