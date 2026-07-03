"use client";

import Link from "next/link";

import { useRoleGate } from "@/components/auth/useRoleGate";

type HeaderCreateLinkProps = {
  label: string;
  locale: string;
};

export function HeaderCreateLink({ label, locale }: HeaderCreateLinkProps) {
  const gate = useRoleGate("owner");

  if (!gate.visible) {
    return null;
  }

  return <Link href={`/${locale}/create`}>{label}</Link>;
}
