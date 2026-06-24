"use client";

import { useCallback, useState } from "react";

import type { AuthActionState } from "@/auth/actions";
import { IdentifierForm } from "@/components/auth/IdentifierForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

export type AuthFlowStep = "identifier" | "login" | "signup";

type AuthFlowProps = {
  initialStep?: AuthFlowStep;
  initialIdentifier?: string;
  initialIdentifierType?: AuthActionState["identifierType"];
  onSuccess?: (state: AuthActionState) => void;
  onStepChange?: (step: AuthFlowStep, state: AuthActionState) => void;
};

export function AuthFlow({
  initialStep = "identifier",
  initialIdentifier = "",
  initialIdentifierType,
  onSuccess,
  onStepChange,
}: AuthFlowProps) {
  const [step, setStep] = useState<AuthFlowStep>(initialStep);
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [identifierType, setIdentifierType] = useState(initialIdentifierType);
  const handleResolved = useCallback(
    (state: AuthActionState) => {
      if (!state.nextPath) {
        return;
      }

      setIdentifier(state.identifier ?? "");
      setIdentifierType(state.identifierType);
      setStep(state.nextPath);
      onStepChange?.(state.nextPath, state);
    },
    [onStepChange],
  );

  if (step === "login") {
    return (
      <LoginForm
        key={`login:${identifier}`}
        initialIdentifier={identifier}
        initialIdentifierType={identifierType}
        onSuccess={onSuccess}
      />
    );
  }

  if (step === "signup") {
    return (
      <SignUpForm
        key={`signup:${identifier}`}
        initialIdentifier={identifier}
        initialIdentifierType={identifierType}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <IdentifierForm
      key={`identifier:${identifier}`}
      initialIdentifier={identifier}
      onResolved={handleResolved}
    />
  );
}
