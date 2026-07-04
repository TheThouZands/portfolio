"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import { HeaderCreateLink } from "@/components/auth/HeaderCreateLink";
import { LogoutButton } from "@/components/auth/LogoutButton";

export type HeaderAccountLabels = {
  account: string;
  create: string;
  login: string;
  logout: string;
  logoutPending: string;
};

type HeaderAccountIslandProps = {
  labels: HeaderAccountLabels;
  locale: string;
};

type HeaderAccountShellProps = {
  busy?: boolean;
  children: ReactNode;
  state: "authenticated" | "loading" | "unauthenticated";
};

function HeaderAccountShell({
  busy = false,
  children,
  state,
}: HeaderAccountShellProps) {
  return (
    <nav
      aria-busy={busy}
      aria-label="Account"
      aria-live="polite"
      data-auth-state={state}
    >
      {children}
    </nav>
  );
}

export function HeaderAccountIsland({
  labels,
  locale,
}: HeaderAccountIslandProps) {
  const { state } = useAuthSession();
  const loginLink = <Link href={`/${locale}/auth`}>{labels.login}</Link>;
  const loadingAccountText = <span data-auth-loading="true">Loading</span>;

  if (state.status === "loading") {
    return (
      <HeaderAccountShell busy state="loading">
        {loadingAccountText}
      </HeaderAccountShell>
    );
  }

  if (state.status !== "authenticated") {
    return (
      <HeaderAccountShell state="unauthenticated">
        {loginLink}
      </HeaderAccountShell>
    );
  }

  return (
    <HeaderAccountShell state="authenticated">
      <Link href={`/${locale}/auth`}>{labels.account}</Link>
      <HeaderCreateLink label={labels.create} locale={locale} />
      <LogoutButton label={labels.logout} pendingLabel={labels.logoutPending} />
    </HeaderAccountShell>
  );
}
