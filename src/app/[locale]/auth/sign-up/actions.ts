"use server";

import { APIError } from "better-auth/api";

import { auth } from "@/auth/server";

export type SignUpActionState = {
  status: "idle" | "success" | "error";
  message: string;
  userId?: string;
  username?: string;
};

function readFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function getSignUpErrorMessage(error: unknown): string {
  if (error instanceof APIError && error.body?.message) {
    return error.body.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Could not create the account.";
}

export async function signUpAction(
  _previousState: SignUpActionState,
  formData: FormData,
): Promise<SignUpActionState> {
  try {
    const result = await auth.api.signUpUsername({
      body: {
        username: readFormString(formData, "username"),
        password: readFormString(formData, "password"),
      },
    });

    return {
      status: "success",
      message: "Account created.",
      userId: result.userId,
      username: result.username,
    };
  } catch (error) {
    return {
      status: "error",
      message: getSignUpErrorMessage(error),
    };
  }
}
