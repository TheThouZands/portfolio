"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AUTH_STATE_ENDPOINT,
  type AuthSessionSnapshot,
  type AuthSessionState,
  type AuthSessionUser,
} from "@/auth/session-state";

type AuthSessionContextValue = {
  refreshSession: () => Promise<void>;
  setAuthenticated: (user: AuthSessionUser) => void;
  setUnauthenticated: () => void;
  state: AuthSessionState;
};

type AuthSessionProviderProps = {
  children: ReactNode;
};

const unauthenticatedSession = {
  status: "unauthenticated",
  user: null,
} satisfies AuthSessionSnapshot;

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const requestIdRef = useRef(0);
  const [state, setState] = useState<AuthSessionState>({
    status: "loading",
    user: null,
  });

  const refreshSession = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    try {
      const response = await fetch(AUTH_STATE_ENDPOINT, {
        cache: "no-store",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Could not resolve auth state.");
      }

      const snapshot = (await response.json()) as AuthSessionSnapshot;

      if (requestIdRef.current === requestId) {
        setState(snapshot);
      }
    } catch {
      if (requestIdRef.current === requestId) {
        setState(unauthenticatedSession);
      }
    }
  }, []);

  const setAuthenticated = useCallback((user: AuthSessionUser) => {
    requestIdRef.current += 1;
    setState({
      status: "authenticated",
      user,
    });
  }, []);

  const setUnauthenticated = useCallback(() => {
    requestIdRef.current += 1;
    setState(unauthenticatedSession);
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      refreshSession,
      setAuthenticated,
      setUnauthenticated,
      state,
    }),
    [refreshSession, setAuthenticated, setUnauthenticated, state],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuthSession must be used within AuthSessionProvider.");
  }

  return context;
}
