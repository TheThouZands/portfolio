import type { ReactNode } from "react";

import { getCurrentRolePermissionPayload } from "@/auth/current-role-permission.server";
import { AuthenticatedLogoutSlot } from "@/components/auth/AuthenticatedLogoutSlot";
import { AuthFlowProvider } from "@/components/auth/AuthFlowProvider";

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const initialRolePayload = await getCurrentRolePermissionPayload();

  return (
    <AuthFlowProvider>
      {children}
      <AuthenticatedLogoutSlot initialRolePayload={initialRolePayload} />
    </AuthFlowProvider>
  );
}
