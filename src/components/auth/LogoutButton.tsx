"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  signOutAction,
  type SignOutActionState,
} from "@/auth/actions";
import { useAuthSession } from "@/components/auth/AuthSessionProvider";

const initialState: SignOutActionState = {
  status: "idle",
  message: "",
};

export function LogoutButton() {
  const { setUnauthenticated } = useAuthSession();
  const handledStateRef = useRef<SignOutActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    signOutAction,
    initialState,
  );

  useEffect(() => {
    if (state.status !== "success" || handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    setUnauthenticated();
  }, [setUnauthenticated, state]);

  return (
    <form action={formAction}>
      <button disabled={isPending} type="submit">
        {isPending ? "Logging out..." : "Log out"}
      </button>

      {state.status === "error" ? (
        <p aria-live="polite">{state.message}</p>
      ) : null}
    </form>
  );
}
