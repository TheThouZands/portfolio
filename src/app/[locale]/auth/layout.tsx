import type { ReactNode } from "react";

import { AuthenticatedLogoutSlot } from "@/components/auth/AuthenticatedLogoutSlot";
import { AuthFlowProvider } from "@/components/auth/AuthFlowProvider";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthFlowProvider>
      {children}
      <AuthenticatedLogoutSlot />
    </AuthFlowProvider>
  );
}
