import "server-only";

import { headers as nextHeaders } from "next/headers";

import { toAppEmail } from "@/auth/identifier";
import {
  authRoleMeetsMinimum,
  normalizeAuthRole,
  type AuthRole,
} from "@/auth/role-policy";
import { auth } from "@/auth/server";

type RequestHeaders = Headers;

type CurrentSessionUser = {
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  role?: unknown;
  username?: unknown;
};

export type AuthAccountSession = {
  email: string | null;
  emailVerified: boolean;
  id: string;
  name: string;
  role: AuthRole;
  username: string;
};

export type AuthRoleDecision =
  | {
      account: AuthAccountSession;
      authorized: true;
      reason: "authorized";
    }
  | {
      account: AuthAccountSession;
      authorized: false;
      reason: "forbidden";
    }
  | {
      account: null;
      authorized: false;
      reason: "unauthenticated";
    };

type GetCurrentAuthAccountOptions = {
  disableCookieCache?: boolean;
  headers?: RequestHeaders;
};

function toAuthAccountSession(user: CurrentSessionUser): AuthAccountSession {
  const username = typeof user.username === "string" ? user.username : user.name;

  return {
    email: toAppEmail(user.email),
    emailVerified: user.emailVerified,
    id: user.id,
    name: user.name,
    role: normalizeAuthRole(user.role),
    username,
  };
}

export async function getCurrentAuthAccount({
  disableCookieCache = true,
  headers,
}: GetCurrentAuthAccountOptions = {}): Promise<AuthAccountSession | null> {
  const currentSession = await auth.api.getSession({
    headers: headers ?? (await nextHeaders()),
    query: {
      disableCookieCache,
    },
  });

  if (!currentSession) {
    return null;
  }

  return toAuthAccountSession(currentSession.user as CurrentSessionUser);
}

export async function authorizeCurrentAuthRole(
  minimumRole: AuthRole,
  options: GetCurrentAuthAccountOptions = {},
): Promise<AuthRoleDecision> {
  const account = await getCurrentAuthAccount(options);

  if (!account) {
    return {
      account: null,
      authorized: false,
      reason: "unauthenticated",
    };
  }

  if (!authRoleMeetsMinimum(account.role, minimumRole)) {
    return {
      account,
      authorized: false,
      reason: "forbidden",
    };
  }

  return {
    account,
    authorized: true,
    reason: "authorized",
  };
}
