"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  type AuthActionState,
  resolveIdentifierAction,
} from "@/auth/actions";

type IdentifierFormProps = {
  initialIdentifier?: string;
  onResolved?: (state: AuthActionState) => void;
};

export function IdentifierForm({
  initialIdentifier = "",
  onResolved,
}: IdentifierFormProps) {
  const handledStateRef = useRef<AuthActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    resolveIdentifierAction,
    {
      status: "idle",
      message: "",
      identifier: initialIdentifier,
    } satisfies AuthActionState,
  );

  useEffect(() => {
    if (state.status !== "success" || !state.nextPath || !state.identifier) {
      return;
    }

    if (handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    onResolved?.(state);
  }, [onResolved, state]);

  return (
    <form action={formAction}>
      <label htmlFor="identifier">Email or username</label>
      <input
        autoComplete="username"
        autoFocus
        defaultValue={state.identifier ?? initialIdentifier}
        id="identifier"
        name="identifier"
        placeholder="Email or username"
        type="text"
      />

      <button disabled={isPending} type="submit">
        {isPending ? "Checking..." : "Continue"}
      </button>

      {state.status === "error" ? (
        <p aria-live="polite">{state.message}</p>
      ) : null}
    </form>
  );
}
