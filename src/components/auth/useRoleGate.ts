"use client";

import { authRoleMeetsMinimum, type AuthRole } from "@/auth/role-policy";
import { useAuthSession } from "@/components/auth/AuthSessionProvider";

export type RoleGateStatus = "hidden" | "loading" | "visible";

export function useRoleGate(minimumRole: AuthRole) {
  const { state } = useAuthSession();

  if (state.status === "loading") {
    return {
      status: "loading" as const,
      visible: false,
    };
  }

  if (
    state.status === "authenticated" &&
    authRoleMeetsMinimum(state.user.role, minimumRole)
  ) {
    return {
      status: "visible" as const,
      visible: true,
    };
  }

  return {
    status: "hidden" as const,
    visible: false,
  };
}
