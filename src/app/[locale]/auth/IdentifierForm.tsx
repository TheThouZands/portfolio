"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  type AuthActionState,
  resolveIdentifierAction,
} from "@/app/[locale]/auth/actions";
import { useAuthFlow } from "@/app/[locale]/auth/AuthFlowProvider";

const initialState: AuthActionState = {
  status: "idle",
  message: "",
};

type IdentifierFormProps = {
  locale: string;
};

export default function IdentifierForm({ locale }: IdentifierFormProps) {
  const router = useRouter();
  const { setIdentifier } = useAuthFlow();
  const [state, formAction, isPending] = useActionState(
    resolveIdentifierAction,
    initialState,
  );

  useEffect(() => {
    if (state.status !== "success" || !state.nextPath || !state.identifier) {
      return;
    }

    setIdentifier(state.identifier, state.identifierType);
    router.push(`/${locale}/auth/${state.nextPath}`);
  }, [
    locale,
    router,
    setIdentifier,
    state.identifier,
    state.identifierType,
    state.nextPath,
    state.status,
  ]);

  return (
    <form action={formAction}>
      <label htmlFor="identifier">Email or username</label>
      <input
        autoComplete="username"
        autoFocus
        defaultValue={state.identifier}
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
