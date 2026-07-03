import "server-only";

import {
  getCurrentAuthAccount,
  type AuthAccountSession,
} from "@/auth/roles";
import type { AuthSessionSnapshot } from "@/auth/session-state";

export function toAuthSessionSnapshot(
  account: AuthAccountSession | null,
): AuthSessionSnapshot {
  if (!account) {
    return {
      status: "unauthenticated",
      user: null,
    };
  }

  return {
    status: "authenticated",
    user: {
      id: account.id,
      name: account.name,
      role: account.role,
      username: account.username,
    },
  };
}

export async function getCurrentAuthSessionSnapshot(): Promise<AuthSessionSnapshot> {
  return toAuthSessionSnapshot(await getCurrentAuthAccount());
}
