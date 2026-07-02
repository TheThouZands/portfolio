"use client";

import {
  CURRENT_ROLE_PERMISSION_ENDPOINT,
  type CurrentRolePermissionData,
} from "@/auth/current-role-permission";
import type { PermissionPayload } from "@/auth/permission-island";
import { usePermissionIsland } from "@/components/auth/usePermissionIsland";

type CurrentRoleIslandProps = {
  initialPayload?: PermissionPayload<CurrentRolePermissionData>;
};

export function CurrentRoleIsland({ initialPayload }: CurrentRoleIslandProps) {
  const { payload, status } = usePermissionIsland<CurrentRolePermissionData>({
    endpoint: CURRENT_ROLE_PERMISSION_ENDPOINT,
    initialPayload,
  });

  if (status === "hidden") {
    return null;
  }

  return (
    <div aria-live="polite" data-permission-island="current-role">
      {payload.visible ? (
        <p>
          Current role: <strong>{payload.data.role}</strong>
        </p>
      ) : (
        <p>Loading role...</p>
      )}

      {status === "refreshing" ? <p>Refreshing role...</p> : null}
      {status === "error" ? <p>Role unavailable.</p> : null}
    </div>
  );
}
