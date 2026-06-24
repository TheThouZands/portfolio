import "server-only";

import { eq } from "drizzle-orm";

import {
  getAuthIdentifierKind,
  normalizeAuthIdentifier,
  type AuthIdentifierKind,
} from "@/auth/identifier";
import { db } from "@/db/client";
import { authIdentities } from "@/db/schema";

export {
  getAuthIdentifierKind,
  normalizeAuthIdentifier,
  type AuthIdentifierKind,
} from "@/auth/identifier";

export type AuthIdentifierNextStep = "email-otp" | "sign-in" | "sign-up";

type AuthIdentity = typeof authIdentities.$inferSelect;

export type AuthIdentifierFlowResolution = {
  kind: AuthIdentifierKind;
  normalizedIdentifier: string;
  identity: AuthIdentity | null;
  exposesExistence: boolean;
  nextStep: AuthIdentifierNextStep;
};

export async function findAuthIdentityByIdentifier(
  identifier: string,
): Promise<AuthIdentity | null> {
  const normalizedIdentifier = normalizeAuthIdentifier(identifier);
  const kind = getAuthIdentifierKind(normalizedIdentifier);

  const where =
    kind === "email"
      ? eq(authIdentities.emailNormalized, normalizedIdentifier)
      : eq(authIdentities.usernameNormalized, normalizedIdentifier);

  const [identity] = await db.select().from(authIdentities).where(where).limit(1);

  return identity ?? null;
}

export async function resolveAuthIdentifierForFlow(
  identifier: string,
): Promise<AuthIdentifierFlowResolution> {
  const normalizedIdentifier = normalizeAuthIdentifier(identifier);
  const kind = getAuthIdentifierKind(normalizedIdentifier);

  const identity = await findAuthIdentityByIdentifier(normalizedIdentifier);

  return {
    kind,
    normalizedIdentifier,
    identity,
    exposesExistence: true,
    nextStep: identity ? "sign-in" : "sign-up",
  };
}
