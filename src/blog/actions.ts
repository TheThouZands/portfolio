"use server";

import { headers } from "next/headers";

import { auth } from "@/auth/server";
import { db } from "@/db/client";
import { comments } from "@/db/schema";

export type CreateBlogCommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function readFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

export async function createBlogCommentAction(
  _previousState: CreateBlogCommentActionState,
  formData: FormData,
): Promise<CreateBlogCommentActionState> {
  const requestHeaders = await headers();
  const currentSession = await auth.api.getSession({
    headers: requestHeaders,
    query: {
      disableCookieCache: true,
    },
  });

  if (!currentSession) {
    return {
      status: "error",
      message: "Sign in to comment.",
    };
  }

  const blogPostId = Number.parseInt(readFormString(formData, "blogPostId"), 10);
  const body = readFormString(formData, "body").trim();

  if (!Number.isSafeInteger(blogPostId) || blogPostId <= 0) {
    return {
      status: "error",
      message: "Could not post comment.",
    };
  }

  if (!body) {
    return {
      status: "error",
      message: "Write a comment first.",
    };
  }

  try {
    await db.insert(comments).values({
      blog_post_id: blogPostId,
      body,
      userId: currentSession.user.id,
    });

    return {
      status: "success",
      message: "Comment posted.",
    };
  } catch (error) {
    console.error("Failed to post blog comment", error);

    return {
      status: "error",
      message: "Could not post comment.",
    };
  }
}
