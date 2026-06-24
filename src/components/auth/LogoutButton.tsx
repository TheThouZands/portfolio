"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

import {
  signOutAction,
  type SignOutActionState,
} from "@/auth/actions";

const initialState: SignOutActionState = {
  status: "idle",
  message: "",
};

export function LogoutButton() {
  const router = useRouter();
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
    // Keep logout local to this browser: refresh this route's server data, but
    // do not invalidate shared path caches for every visitor.
    router.refresh();
  }, [router, state]);

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
