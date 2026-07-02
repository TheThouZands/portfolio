import { z } from "zod";

import {
  getAuthIdentifierKind,
  isInternalAuthEmail,
  normalizeAuthIdentifier,
} from "@/auth/identifier";

export const authUsernameSchema = z
  .string()
  .trim()
  .min(1, "Username is required.")
  .min(3, "Username must be at least 3 characters.")
  .refine((username) => !username.includes("@"), {
    message: "Username cannot contain @.",
  })
  .transform(normalizeAuthIdentifier);

export const authEmailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .refine((email) => !isInternalAuthEmail(email), {
    message: "Enter a valid email address.",
  })
  .transform(normalizeAuthIdentifier);

export const authIdentifierSchema = z
  .string()
  .trim()
  .min(1, "Email or username is required.")
  .superRefine((identifier, ctx) => {
    const parsedIdentifier =
      getAuthIdentifierKind(identifier) === "email"
        ? authEmailSchema.safeParse(identifier)
        : authUsernameSchema.safeParse(identifier);

    if (!parsedIdentifier.success) {
      ctx.addIssue({
        code: "custom",
        message:
          parsedIdentifier.error.issues[0]?.message ??
          "Enter a valid email or username.",
      });
    }
  })
  .transform(normalizeAuthIdentifier);

export const authPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .refine((password) => /[A-Za-z]/.test(password), {
    message: "Password must include at least one letter.",
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must include at least one number.",
  });

export const signInPasswordSchema = z.string().min(1, "Password is required.");

export const resolveIdentifierBody = z.object({
  identifier: authIdentifierSchema,
});

export const signUpUsernameBody = z.object({
  username: authUsernameSchema,
  password: authPasswordSchema,
});

export const signUpIdentifierBody = z
  .object({
    identifier: authIdentifierSchema,
    otherIdentifier: z
      .string()
      .trim()
      .transform((identifier) =>
        identifier ? normalizeAuthIdentifier(identifier) : identifier,
      )
      .optional(),
    password: authPasswordSchema,
  })
  .superRefine(({ identifier, otherIdentifier }, ctx) => {
    const identifierKind = getAuthIdentifierKind(identifier);
    const otherIdentifierValue = otherIdentifier ?? "";

    if (identifierKind === "email") {
      const parsedUsername = authUsernameSchema.safeParse(otherIdentifierValue);

      if (!parsedUsername.success) {
        ctx.addIssue({
          code: "custom",
          path: ["otherIdentifier"],
          message:
            parsedUsername.error.issues[0]?.message ??
            "Enter a valid username.",
        });
      }

      return;
    }

    if (otherIdentifierValue) {
      const parsedEmail = authEmailSchema.safeParse(otherIdentifierValue);

      if (!parsedEmail.success) {
        ctx.addIssue({
          code: "custom",
          path: ["otherIdentifier"],
          message:
            parsedEmail.error.issues[0]?.message ??
            "Enter a valid email address.",
        });
      }
    }
  });

export const signInIdentifierBody = z.object({
  identifier: authIdentifierSchema,
  password: signInPasswordSchema,
});
