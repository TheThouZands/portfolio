import "server-only";

import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";
import { z } from "zod";

import { resolveAuthIdentifierForFlow } from "@/auth/identity";

const resolveIdentifierBody = z.object({
  identifier: z.string(),
});

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
    },
  }) satisfies BetterAuthPlugin;
