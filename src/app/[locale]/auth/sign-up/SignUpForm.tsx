"use client";

import { useActionState } from "react";

import {
  type SignUpActionState,
  signUpAction,
} from "@/app/[locale]/auth/sign-up/actions";

const initialState: SignUpActionState = {
  status: "idle",
  message: "",
};

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState,
  );

  return (
    <form action={formAction}>
      <label htmlFor="username">Username</label>
      <input
        autoComplete="username"
        id="username"
        name="username"
        required
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="new-password"
        id="password"
        name="password"
        required
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
