"use server";

import { APIError } from "better-auth/api";

import {
  type AuthIdentifierKind,
  getAuthIdentifierKind,
  normalizeAuthIdentifier,
  resolveAuthIdentifierForFlow,
} from "@/auth/identity";
import { auth } from "@/auth/server";

export type AuthActionState = {
  status: "idle" | "success" | "error";
  message: string;
  identifier?: string;
  identifierType?: AuthIdentifierKind;
  nextPath?: "login" | "signup";
  userId?: string;
  username?: string;
};

function readFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function getAuthErrorMessage(error: unknown): string {
  if (error instanceof APIError && error.body?.message) {
    return error.body.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Could not continue.";
}

export async function resolveIdentifierAction(
  previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const identifier = readFormString(formData, "identifier").trim();

  try {
    const resolution = await resolveAuthIdentifierForFlow(identifier);

    return {
      status: "success",
      message: "",
      identifier,
      identifierType: resolution.kind,
      nextPath: resolution.nextStep === "sign-in" ? "login" : "signup",
    };
  } catch (error) {
    return {
      ...previousState,
      status: "error",
      message: getAuthErrorMessage(error),
      identifier,
    };
  }
}

export async function signInAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const identifier = readFormString(formData, "identifier").trim();
  const identifierType = identifier
    ? getAuthIdentifierKind(normalizeAuthIdentifier(identifier))
    : undefined;

  try {
    const result = await auth.api.signInIdentifier({
      body: {
        identifier,
        password: readFormString(formData, "password"),
      },
    });

    return {
      status: "success",
      message: "Signed in.",
      identifier,
      identifierType,
      userId: result.userId,
      username: result.username,
    };
  } catch (error) {
    return {
      status: "error",
      message: getAuthErrorMessage(error),
      identifier,
      identifierType,
    };
  }
}

export async function signUpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const identifier = readFormString(formData, "identifier").trim();
  const identifierType = identifier
    ? getAuthIdentifierKind(normalizeAuthIdentifier(identifier))
    : undefined;

  try {
    const result = await auth.api.signUpIdentifier({
      body: {
        identifier,
        otherIdentifier: readFormString(formData, "otherIdentifier"),
        password: readFormString(formData, "password"),
      },
    });

    return {
      status: "success",
      message: "Account created.",
      identifier,
      identifierType,
      userId: result.userId,
      username: result.username,
    };
  } catch (error) {
    return {
      status: "error",
      message: getAuthErrorMessage(error),
      identifier,
      identifierType,
    };
  }
}
