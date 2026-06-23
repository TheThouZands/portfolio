"use client";

import { useActionState } from "react";

import {
  type AuthActionState,
  signInAction,
} from "@/app/[locale]/auth/actions";
import { useAuthFlow } from "@/app/[locale]/auth/AuthFlowProvider";

export default function LoginForm() {
  const { identifier } = useAuthFlow();

  const [state, formAction, isPending] = useActionState(signInAction, {
    status: "idle",
    message: "",
    identifier,
  } satisfies AuthActionState);
  const initialIdentifier = state.identifier ?? identifier;

  return (
    <form action={formAction}>
      <label htmlFor="identifier">Email or username</label>
      <input
        autoComplete="username"
        autoFocus={!initialIdentifier}
        defaultValue={initialIdentifier}
        id="identifier"
        name="identifier"
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="current-password"
        autoFocus={Boolean(initialIdentifier)}
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
