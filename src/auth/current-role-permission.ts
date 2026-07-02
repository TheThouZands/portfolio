import type { AuthRole } from "@/auth/role-policy";

export const CURRENT_ROLE_PERMISSION_ENDPOINT =
  "/api/permission-islands/current-role";

export type CurrentRolePermissionData = {
  role: AuthRole;
  userId: string;
  username: string;
};
