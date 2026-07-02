import "server-only";

import { eq } from "drizzle-orm";

import {
  getAuthIdentifierKind,
  isInternalAuthEmail,
  normalizeAuthIdentifier,
  type AuthIdentifierKind,
} from "@/auth/identifier";
import { db } from "@/db/client";
import { user as authUser } from "@/db/schema";

export {
  getAuthIdentifierKind,
  isInternalAuthEmail,
  normalizeAuthIdentifier,
  type AuthIdentifierKind,
} from "@/auth/identifier";

export type AuthIdentifierNextStep = "email-otp" | "sign-in" | "sign-up";

export type AuthAccount = typeof authUser.$inferSelect;

export type AuthIdentifierFlowResolution = {
  kind: AuthIdentifierKind;
  normalizedIdentifier: string;
  account: AuthAccount | null;
  exposesExistence: boolean;
  nextStep: AuthIdentifierNextStep;
};

export async function findAuthAccountByIdentifier(
  identifier: string,
): Promise<AuthAccount | null> {
  const normalizedIdentifier = normalizeAuthIdentifier(identifier);
  const kind = getAuthIdentifierKind(normalizedIdentifier);

  if (kind === "email" && isInternalAuthEmail(normalizedIdentifier)) {
    return null;
  }

  const where =
    kind === "email"
      ? eq(authUser.email, normalizedIdentifier)
      : eq(authUser.username, normalizedIdentifier);

  const [account] = await db.select().from(authUser).where(where).limit(1);

  return account ?? null;
}

export async function resolveAuthIdentifierForFlow(
  identifier: string,
): Promise<AuthIdentifierFlowResolution> {
  const normalizedIdentifier = normalizeAuthIdentifier(identifier);
  const kind = getAuthIdentifierKind(normalizedIdentifier);

  const account = await findAuthAccountByIdentifier(normalizedIdentifier);

  return {
    kind,
    normalizedIdentifier,
    account,
    exposesExistence: true,
    nextStep: account ? "sign-in" : "sign-up",
  };
}
