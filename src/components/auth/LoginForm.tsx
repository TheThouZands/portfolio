"use client";

import { useActionState, useEffect, useRef } from "react";

import { type AuthActionState, signInAction } from "@/auth/actions";

type LoginFormProps = {
  initialIdentifier?: string;
  initialIdentifierType?: AuthActionState["identifierType"];
  onSuccess?: (state: AuthActionState) => void;
};

export function LoginForm({
  initialIdentifier = "",
  initialIdentifierType,
  onSuccess,
}: LoginFormProps) {
  const handledStateRef = useRef<AuthActionState | null>(null);
  const [state, formAction, isPending] = useActionState(signInAction, {
    status: "idle",
    message: "",
    identifier: initialIdentifier,
    identifierType: initialIdentifierType,
  } satisfies AuthActionState);
  const resolvedIdentifier = state.identifier ?? initialIdentifier;

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    if (handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    onSuccess?.(state);
  }, [onSuccess, state]);

  return (
    <form action={formAction}>
      <label htmlFor="identifier">Email or username</label>
      <input
        autoComplete="username"
        autoFocus={!resolvedIdentifier}
        defaultValue={resolvedIdentifier}
        id="identifier"
        name="identifier"
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="current-password"
        autoFocus={Boolean(resolvedIdentifier)}
        id="password"
        name="password"
        type="password"
      />

      <button disabled={isPending} type="submit">
        {isPending ? "Signing in..." : "Sign in"}
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
