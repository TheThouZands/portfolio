import type { AuthRole } from "@/auth/role-policy";

export type AuthSessionUser = {
  id: string;
  name: string;
  role: AuthRole;
  username?: string | null;
};

export type AuthSessionSnapshot =
  | {
      status: "authenticated";
      user: AuthSessionUser;
    }
  | {
      status: "unauthenticated";
      user: null;
    };

export type AuthSessionState =
  | AuthSessionSnapshot
  | {
      status: "loading";
      user: null;
    };

export const AUTH_STATE_ENDPOINT = "/api/auth-state";
