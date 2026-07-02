"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  hiddenPermissionPayload,
  normalizePermissionPayload,
  type PermissionPayload,
} from "@/auth/permission-island";
import { useAuthSession } from "@/components/auth/AuthSessionProvider";

export type PermissionIslandStatus =
  | "error"
  | "hidden"
  | "loading"
  | "refreshing"
  | "visible";

type AuthenticatedSessionState = ReturnType<typeof useAuthSession>["state"] & {
  status: "authenticated";
};

type UsePermissionIslandOptions<T> = {
  enabledWhenSession?: (state: AuthenticatedSessionState) => boolean;
  endpoint: string;
  initialPayload?: PermissionPayload<T>;
};

type UsePermissionIslandResult<T> = {
  payload: PermissionPayload<T>;
  refetch: () => void;
  status: PermissionIslandStatus;
};

function defaultEnabledWhenSession() {
  return true;
}

export function usePermissionIsland<T>({
  enabledWhenSession = defaultEnabledWhenSession,
  endpoint,
  initialPayload = hiddenPermissionPayload<T>(),
}: UsePermissionIslandOptions<T>): UsePermissionIslandResult<T> {
  const { state } = useAuthSession();
  const requestIdRef = useRef(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [payload, setPayload] = useState(initialPayload);
  const [status, setStatus] = useState<PermissionIslandStatus>(
    initialPayload.visible ? "visible" : "hidden",
  );

  const refetch = useCallback(() => {
    setRefreshKey((currentKey) => currentKey + 1);
  }, []);

  useEffect(() => {
    if (state.status === "loading") {
      return;
    }

    if (
      state.status !== "authenticated" ||
      !enabledWhenSession(state as AuthenticatedSessionState)
    ) {
      requestIdRef.current += 1;
      setPayload(hiddenPermissionPayload<T>());
      setStatus("hidden");
      return;
    }

    const requestId = requestIdRef.current + 1;
    const controller = new AbortController();
    requestIdRef.current = requestId;
    setStatus((currentStatus) =>
      currentStatus === "visible" ? "refreshing" : "loading",
    );

    async function fetchPayload() {
      try {
        const response = await fetch(endpoint, {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        });

        if (response.status === 401 || response.status === 403) {
          return hiddenPermissionPayload<T>();
        }

        if (!response.ok) {
          throw new Error("Could not load permission payload.");
        }

        return normalizePermissionPayload<T>(await response.json());
      } catch (error) {
        if (controller.signal.aborted) {
          return null;
        }

        throw error;
      }
    }

    void fetchPayload()
      .then((nextPayload) => {
        if (!nextPayload || requestIdRef.current !== requestId) {
          return;
        }

        setPayload(nextPayload);
        setStatus(nextPayload.visible ? "visible" : "hidden");
      })
      .catch(() => {
        if (requestIdRef.current !== requestId) {
          return;
        }

        setPayload(hiddenPermissionPayload<T>());
        setStatus("error");
      });

    return () => {
      controller.abort();
    };
  }, [
    enabledWhenSession,
    endpoint,
    refreshKey,
    state,
    state.status,
    state.user?.id,
    state.user?.role,
  ]);

  return {
    payload,
    refetch,
    status,
  };
}
