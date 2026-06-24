import type { ReactNode } from "react";

import { AuthFlowProvider } from "@/components/auth/AuthFlowProvider";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthFlowProvider>{children}</AuthFlowProvider>;
}
