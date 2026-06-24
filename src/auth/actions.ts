"use server";

import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import {
  type AuthIdentifierKind,
  getAuthIdentifierKind,
  normalizeAuthIdentifier,
  resolveAuthIdentifierForFlow,
} from "@/auth/identity";
import { auth } from "@/auth/server";

// UI-facing Server Actions. Forms submit here, but credential verification,
// session creation, and cookie writes are delegated to Better Auth endpoints.
// Returned state is only for React UI; the session cookie/database remain the
// source of truth for whether the browser is authenticated.
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

export async function signOutAction(formData: FormData): Promise<void> {
  const returnTo = readFormString(formData, "returnTo");

  // Better Auth reads this request's signed session cookie from headers,
  // deletes that exact session, and nextCookies clears the browser cookie in
  // the Server Action response.
  await auth.api.signOut({
    headers: await headers(),
  });

  // Server-rendered pages need cache invalidation so auth-dependent UI, such as
  // the homepage logout button, reflects the cleared cookie after submission.
  if (returnTo.startsWith("/")) {
    revalidatePath(returnTo);
    return;
  }

  revalidatePath("/", "layout");
}
