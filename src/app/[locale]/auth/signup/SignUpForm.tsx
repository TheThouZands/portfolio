"use client";

import { useActionState, useState } from "react";

import {
  type AuthActionState,
  signUpAction,
} from "@/app/[locale]/auth/actions";
import { useAuthFlow } from "@/app/[locale]/auth/AuthFlowProvider";

type IdentifierType = NonNullable<AuthActionState["identifierType"]>;

function getIdentifierType(identifier: string): IdentifierType {
  return identifier.includes("@") ? "email" : "username";
}

function getOtherIdentifierLabel(identifierType: IdentifierType): string {
  return identifierType === "email" ? "Username" : "Email";
}

export default function SignUpForm() {
  const { identifier, identifierType: storedIdentifierType } = useAuthFlow();
  const [identifierInput, setIdentifierInput] = useState(identifier);
  const identifierType = identifierInput
    ? getIdentifierType(identifierInput)
    : storedIdentifierType ?? "username";
  const [state, formAction, isPending] = useActionState(signUpAction, {
    status: "idle",
    message: "",
    identifier,
    identifierType,
  } satisfies AuthActionState);

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
