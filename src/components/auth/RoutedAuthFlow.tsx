"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { AuthActionState } from "@/auth/actions";
import { useAuthFlow } from "@/components/auth/AuthFlowProvider";
import { IdentifierForm } from "@/components/auth/IdentifierForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

type RoutedIdentifierFormProps = {
  locale: string;
};

export function RoutedIdentifierForm({ locale }: RoutedIdentifierFormProps) {
  const router = useRouter();
  const { setIdentifier } = useAuthFlow();
  const handleResolved = useCallback(
    (state: AuthActionState) => {
      if (!state.identifier || !state.nextPath) {
        return;
      }

      setIdentifier(state.identifier, state.identifierType);
      router.push(`/${locale}/auth/${state.nextPath}`);
    },
    [locale, router, setIdentifier],
  );

  return <IdentifierForm onResolved={handleResolved} />;
}

export function RoutedLoginForm() {
  const { identifier, identifierType } = useAuthFlow();

  return (
    <LoginForm
      initialIdentifier={identifier}
      initialIdentifierType={identifierType}
    />
  );
}

export function RoutedSignUpForm() {
  const { identifier, identifierType } = useAuthFlow();

  return (
    <SignUpForm
      initialIdentifier={identifier}
      initialIdentifierType={identifierType}
    />
  );
}
