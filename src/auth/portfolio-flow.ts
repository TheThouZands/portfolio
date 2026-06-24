import "server-only";

import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import type { z } from "zod";

import { hashPassword, verifyPassword } from "@/auth/password";
import {
  getAuthIdentifierKind,
  findAuthIdentityByIdentifier,
  normalizeAuthIdentifier,
  resolveAuthIdentifierForFlow,
} from "@/auth/identity";
import { AUTH_RATE_LIMIT } from "@/auth/rate-limit";
import {
  authEmailSchema,
  authPasswordSchema,
  authUsernameSchema,
  resolveIdentifierBody,
  signInIdentifierBody,
  signUpIdentifierBody,
  signUpUsernameBody,
} from "@/auth/validation";
import { db } from "@/db/client";
import { authIdentities } from "@/db/schema";

const USERNAME_TAKEN = {
  code: "USERNAME_TAKEN",
  message: "That username is already taken.",
} as const;

const EMAIL_TAKEN = {
  code: "EMAIL_TAKEN",
  message: "That email is already taken.",
} as const;

const SIGN_UP_FAILED = {
  code: "SIGN_UP_FAILED",
  message: "Could not create the account.",
} as const;

const SIGN_IN_FAILED = {
  code: "SIGN_IN_FAILED",
  message: "Could not sign in.",
} as const;

// Better Auth gives us the session/database primitives. This plugin keeps the
// product-specific identifier shape outside app routes: username/email lookup,
// Argon2id password verification, session creation, and cookie setting.
type AuthEndpointContext = Parameters<typeof setSessionCookie>[0];

type CreateIdentifierAccountInput = {
  username: string;
  email: string | null;
  password: string;
  ctx: AuthEndpointContext;
};

function parseAuthInput<T>(schema: z.ZodType<T>, input: unknown): T {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    throw APIError.from("BAD_REQUEST", {
      code: "INVALID_AUTH_INPUT",
      message: parsed.error.issues[0]?.message ?? "Invalid auth input.",
    });
  }

  return parsed.data;
}

async function getCurrentSessionToken(ctx: AuthEndpointContext) {
  const sessionToken = await ctx.getSignedCookie(
    ctx.context.authCookies.sessionToken.name,
    ctx.context.secret,
  );

  return sessionToken || null;
}

async function deleteCurrentBrowserSession(
  ctx: AuthEndpointContext,
  sessionToken: string | null,
  replacementToken: string,
) {
  if (!sessionToken || sessionToken === replacementToken) {
    return;
  }

  try {
    const existingSession =
      await ctx.context.internalAdapter.findSession(sessionToken);

    if (!existingSession || existingSession.session.expiresAt <= new Date()) {
      return;
    }

    await ctx.context.internalAdapter.deleteSession(sessionToken);
  } catch (error) {
    ctx.context.logger.error("Failed to replace current browser session", error);
  }
}

async function createIdentifierAccount({
  username,
  email,
  password,
  ctx,
}: CreateIdentifierAccountInput) {
  const parsedUsername = parseAuthInput(authUsernameSchema, username);
  const parsedEmail = email ? parseAuthInput(authEmailSchema, email) : null;
  const parsedPassword = parseAuthInput(authPasswordSchema, password);
  const usernameNormalized = normalizeAuthIdentifier(parsedUsername);
  const emailNormalized = parsedEmail ? normalizeAuthIdentifier(parsedEmail) : null;

  if (await findAuthIdentityByIdentifier(usernameNormalized)) {
    throw APIError.from("CONFLICT", USERNAME_TAKEN);
  }

  if (emailNormalized && (await findAuthIdentityByIdentifier(emailNormalized))) {
    throw APIError.from("CONFLICT", EMAIL_TAKEN);
  }

  const userId = crypto.randomUUID();
  let createdUserId: string | null = null;

  try {
    const createdUser = await ctx.context.internalAdapter.createUser({
      id: userId,
      name: parsedUsername,
      email: parsedEmail ?? `${userId}@users.invalid`,
      emailVerified: false,
    });
    createdUserId = createdUser.id;

    await ctx.context.internalAdapter.linkAccount({
      userId: createdUser.id,
      providerId: "credential",
      accountId: createdUser.id,
      password: await hashPassword(parsedPassword),
    });

    await db.insert(authIdentities).values({
      userId: createdUser.id,
      username: parsedUsername,
      usernameNormalized,
      email: parsedEmail,
      emailNormalized,
    });

    const session = await ctx.context.internalAdapter.createSession(createdUser.id);

    await setSessionCookie(ctx, {
      session,
      user: createdUser,
    });

    return {
      userId: createdUser.id,
      username: parsedUsername,
    };
  } catch (error) {
    if (createdUserId) {
      await ctx.context.internalAdapter.deleteUser(createdUserId);
    }

    if (error instanceof APIError) {
      throw error;
    }

    ctx.context.logger.error("Failed to create identifier account", error);
    throw APIError.from("BAD_REQUEST", SIGN_UP_FAILED);
  }
}

export const portfolioAuthFlow = () =>
  ({
    id: "portfolio-auth-flow",
    rateLimit: [
      {
        window: AUTH_RATE_LIMIT.identifier.window,
        max: AUTH_RATE_LIMIT.identifier.max,
        pathMatcher: (path) => path === "/portfolio-auth/resolve-identifier",
      },
    ],
    endpoints: {
      resolveIdentifier: createAuthEndpoint(
        "/portfolio-auth/resolve-identifier",
        {
          method: "POST",
          body: resolveIdentifierBody,
        },
        async (ctx) => {
          const resolution = await resolveAuthIdentifierForFlow(ctx.body.identifier);

          return ctx.json({
            identifierType: resolution.kind,
            exists: resolution.exposesExistence
              ? Boolean(resolution.identity)
              : null,
            nextStep: resolution.nextStep,
          });
        },
      ),
      signInIdentifier: createAuthEndpoint.serverOnly(
        {
          method: "POST",
          body: signInIdentifierBody,
        },
        async (ctx) => {
          const identity = await findAuthIdentityByIdentifier(ctx.body.identifier);
          const password = ctx.body.password;

          if (!identity || !password) {
            throw APIError.from("UNAUTHORIZED", SIGN_IN_FAILED);
          }

          const credentialAccount = (
            await ctx.context.internalAdapter.findAccounts(identity.userId)
          ).find((account) => account.providerId === "credential");

          if (
            !credentialAccount?.password ||
            !(await verifyPassword({
              password,
              passwordHash: credentialAccount.password,
            }))
          ) {
            throw APIError.from("UNAUTHORIZED", SIGN_IN_FAILED);
          }

          const user = await ctx.context.internalAdapter.findUserById(identity.userId);

          if (!user) {
            throw APIError.from("UNAUTHORIZED", SIGN_IN_FAILED);
          }

          const currentSessionToken = await getCurrentSessionToken(ctx);
          const session = await ctx.context.internalAdapter.createSession(user.id);

          // Re-login from the same browser should replace only the session
          // referenced by this browser's previous cookie. Other devices keep
          // their sessions, and invalid/expired cookie tokens are ignored.
          await deleteCurrentBrowserSession(
            ctx,
            currentSessionToken,
            session.token,
          );

          await setSessionCookie(ctx, {
            session,
            user,
          });

          return {
            userId: identity.userId,
            username: identity.username,
          };
        },
      ),
      signUpIdentifier: createAuthEndpoint.serverOnly(
        {
          method: "POST",
          body: signUpIdentifierBody,
        },
        async (ctx) => {
          const identifier = ctx.body.identifier.trim();
          const otherIdentifier = ctx.body.otherIdentifier?.trim() ?? "";
          const identifierKind = getAuthIdentifierKind(identifier);
          const username =
            identifierKind === "username" ? identifier : otherIdentifier;
          const email = identifierKind === "email" ? identifier : otherIdentifier;

          return createIdentifierAccount({
            username,
            email: email || null,
            password: ctx.body.password,
            ctx,
          });
        },
      ),
      signUpUsername: createAuthEndpoint.serverOnly(
        {
          method: "POST",
          body: signUpUsernameBody,
        },
        async (ctx) => {
          return createIdentifierAccount({
            username: ctx.body.username.trim(),
            email: null,
            password: ctx.body.password,
            ctx,
          });
        },
      ),
    },
  }) satisfies BetterAuthPlugin;
