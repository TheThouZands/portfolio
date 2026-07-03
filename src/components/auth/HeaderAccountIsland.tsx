"use client";

import Link from "next/link";

import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import { LogoutButton } from "@/components/auth/LogoutButton";

export type HeaderAccountLabels = {
  account: string;
  login: string;
  logout: string;
  logoutPending: string;
};

type HeaderAccountIslandProps = {
  labels: HeaderAccountLabels;
  locale: string;
};

export function HeaderAccountIsland({
  labels,
  locale,
}: HeaderAccountIslandProps) {
  const { state } = useAuthSession();

  if (state.status === "loading") {
    return <span aria-busy="true" aria-live="polite" />;
  }

  if (state.status !== "authenticated") {
    return <Link href={`/${locale}/auth`}>{labels.login}</Link>;
  }

  return (
    <div aria-live="polite">
      <Link href={`/${locale}/auth`}>{labels.account}</Link>
      <LogoutButton label={labels.logout} pendingLabel={labels.logoutPending} />
    </div>
  );
}
