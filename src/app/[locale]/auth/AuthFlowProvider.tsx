"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import type { AuthActionState } from "@/app/[locale]/auth/actions";

type AuthIdentifierType = AuthActionState["identifierType"];

type AuthFlowContextValue = {
  identifier: string;
  identifierType?: AuthIdentifierType;
  setIdentifier: (identifier: string, identifierType?: AuthIdentifierType) => void;
};

const AuthFlowContext = createContext<AuthFlowContextValue | null>(null);

type AuthFlowProviderProps = {
  children: ReactNode;
};

export function AuthFlowProvider({ children }: AuthFlowProviderProps) {
  const [identifier, setStoredIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState<AuthIdentifierType>();
  const setIdentifier = useCallback(
    (nextIdentifier: string, nextIdentifierType?: AuthIdentifierType) => {
      setStoredIdentifier(nextIdentifier);
      setIdentifierType(nextIdentifierType);
    },
    [],
  );

  const value = useMemo<AuthFlowContextValue>(
    () => ({
      identifier,
      identifierType,
      setIdentifier,
    }),
    [identifier, identifierType, setIdentifier],
  );

  return (
    <AuthFlowContext.Provider value={value}>
      {children}
    </AuthFlowContext.Provider>
  );
}

export function useAuthFlow() {
  const context = useContext(AuthFlowContext);

  if (!context) {
    throw new Error("useAuthFlow must be used within AuthFlowProvider.");
  }

  return context;
}
