import "server-only";

import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { z } from "zod";

import { hashPassword } from "@/auth/password";
import {
  findAuthIdentityByIdentifier,
  normalizeAuthIdentifier,
  resolveAuthIdentifierForFlow,
} from "@/auth/identity";
import { db } from "@/db/client";
import { authIdentities } from "@/db/schema";

const resolveIdentifierBody = z.object({
  identifier: z.string(),
});

const signUpUsernameBody = z.object({
  username: z.string(),
  password: z.string(),
});

const USERNAME_TAKEN = {
  code: "USERNAME_TAKEN",
  message: "That username is already taken.",
} as const;

const SIGN_UP_FAILED = {
  code: "SIGN_UP_FAILED",
  message: "Could not create the account.",
} as const;

export const portfolioAuthFlow = () =>
  ({
    id: "portfolio-auth-flow",
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
      signUpUsername: createAuthEndpoint.serverOnly(
        {
          method: "POST",
          body: signUpUsernameBody,
        },
        async (ctx) => {
          const username = ctx.body.username.trim();
          const usernameNormalized = normalizeAuthIdentifier(username);
          const password = ctx.body.password;

          if (!username || usernameNormalized.includes("@") || !password) {
            throw APIError.from("BAD_REQUEST", {
              code: "INVALID_SIGN_UP",
              message: "Username and password are required.",
            });
          }

          if (await findAuthIdentityByIdentifier(usernameNormalized)) {
            throw APIError.from("CONFLICT", USERNAME_TAKEN);
          }

          const userId = crypto.randomUUID();
          let createdUserId: string | null = null;

          try {
            const createdUser = await ctx.context.internalAdapter.createUser({
              id: userId,
              name: username,
              email: `${userId}@users.invalid`,
              emailVerified: false,
            });
            createdUserId = createdUser.id;

            await ctx.context.internalAdapter.linkAccount({
              userId: createdUser.id,
              providerId: "credential",
              accountId: createdUser.id,
              password: await hashPassword(password),
            });

            await db.insert(authIdentities).values({
              userId: createdUser.id,
              username,
              usernameNormalized,
            });

            const session = await ctx.context.internalAdapter.createSession(
              createdUser.id,
            );

            await setSessionCookie(ctx, {
              session,
              user: createdUser,
            });

            return {
              userId: createdUser.id,
              username,
            };
          } catch (error) {
            if (createdUserId) {
              await ctx.context.internalAdapter.deleteUser(createdUserId);
            }

            if (error instanceof APIError) {
              throw error;
            }

            ctx.context.logger.error("Failed to create username account", error);
            throw APIError.from("BAD_REQUEST", SIGN_UP_FAILED);
          }
        },
      ),
    },
  }) satisfies BetterAuthPlugin;
