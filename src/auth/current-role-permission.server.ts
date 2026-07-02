import "server-only";

import type { CurrentRolePermissionData } from "@/auth/current-role-permission";
import {
  hiddenPermissionPayload,
  type PermissionPayload,
} from "@/auth/permission-island";
import { getCurrentAuthAccount } from "@/auth/roles";

export async function getCurrentRolePermissionPayload(): Promise<
  PermissionPayload<CurrentRolePermissionData>
> {
  const account = await getCurrentAuthAccount();

  if (!account) {
    return hiddenPermissionPayload();
  }

  return {
    visible: true,
    data: {
      role: account.role,
      userId: account.id,
      username: account.username,
    },
  };
}
