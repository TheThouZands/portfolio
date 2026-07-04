"use client";

import type { CurrentRolePermissionData } from "@/auth/current-role-permission";
import type { PermissionPayload } from "@/auth/permission-island";
import { CurrentRoleIsland } from "@/components/auth/CurrentRoleIsland";
import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import { LogoutButton } from "@/components/auth/LogoutButton";

type AuthenticatedLogoutSlotProps = {
  initialRolePayload?: PermissionPayload<CurrentRolePermissionData>;
};

export function AuthenticatedLogoutSlot({
  initialRolePayload,
}: AuthenticatedLogoutSlotProps) {
  const { state } = useAuthSession();
  const hasInitialRolePayload = initialRolePayload?.visible === true;
  const shouldShowTools =
    state.status === "authenticated" ||
    (state.status === "loading" && hasInitialRolePayload);

  if (!shouldShowTools) {
    return null;
  }

  return (
    <section>
      <LogoutButton />
      <CurrentRoleIsland initialPayload={initialRolePayload} />
    </section>
  );
}
