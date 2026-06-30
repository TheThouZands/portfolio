"use client";

import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function HomeLogoutSlot() {
  const { state } = useAuthSession();

  if (state.status !== "authenticated") {
    return null;
  }

  return (
    <section>
      <LogoutButton />
    </section>
  );
}
