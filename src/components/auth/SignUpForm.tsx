"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { type AuthActionState, signUpAction } from "@/auth/actions";
import { useAuthSession } from "@/components/auth/AuthSessionProvider";

type IdentifierType = NonNullable<AuthActionState["identifierType"]>;

type SignUpFormProps = {
  initialIdentifier?: string;
  initialIdentifierType?: AuthActionState["identifierType"];
  onSuccess?: (state: AuthActionState) => void;
};

function getIdentifierType(identifier: string): IdentifierType {
  return identifier.includes("@") ? "email" : "username";
}

function getOtherIdentifierLabel(identifierType: IdentifierType): string {
  return identifierType === "email" ? "Username" : "Email";
}

export function SignUpForm({
  initialIdentifier = "",
  initialIdentifierType,
  onSuccess,
}: SignUpFormProps) {
  const { refreshSession, setAuthenticated } = useAuthSession();
  const handledStateRef = useRef<AuthActionState | null>(null);
  const [identifierInput, setIdentifierInput] = useState(initialIdentifier);
  const identifierType = identifierInput
    ? getIdentifierType(identifierInput)
    : initialIdentifierType ?? "username";
  const [state, formAction, isPending] = useActionState(signUpAction, {
    status: "idle",
    message: "",
    identifier: initialIdentifier,
    identifierType,
  } satisfies AuthActionState);

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    if (handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    if (state.userId) {
      setAuthenticated({
        id: state.userId,
        name: state.username ?? state.identifier ?? "Signed in",
        username: state.username ?? null,
      });
    } else {
      void refreshSession();
    }

    onSuccess?.(state);
  }, [onSuccess, refreshSession, setAuthenticated, state]);

  return (
    <form action={formAction}>
      <label htmlFor="identifier">Email or username</label>
      <input
        autoComplete="username"
        autoFocus={!identifierInput}
        id="identifier"
        name="identifier"
        onChange={(event) => setIdentifierInput(event.currentTarget.value)}
        type="text"
        value={identifierInput}
      />

      <label htmlFor="otherIdentifier">
        {getOtherIdentifierLabel(identifierType)}
      </label>
      <input
        autoComplete={identifierType === "email" ? "username" : "email"}
        autoFocus={Boolean(identifierInput)}
        id="otherIdentifier"
        name="otherIdentifier"
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="new-password"
        id="password"
        name="password"
        type="password"
      />

      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        autoComplete="new-password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
      />

      <button disabled={isPending} type="submit">
        {isPending ? "Creating..." : "Create account"}
      </button>

      {state.status !== "idle" ? (
        <p aria-live="polite">
          {state.message}
          {state.status === "success" && state.username
            ? ` Signed in as ${state.username}.`
            : ""}
        </p>
      ) : null}
    </form>
  );
}
