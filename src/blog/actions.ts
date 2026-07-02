"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import {
  authorizeCurrentAuthRole,
  getCurrentAuthAccount,
} from "@/auth/roles";
import { db } from "@/db/client";
import { comments } from "@/db/schema";

export type CreateBlogCommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type DeleteBlogCommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function readFormString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function readSafePathname(formData: FormData): string | null {
  const pathname = readFormString(formData, "pathname");

  if (
    !pathname ||
    pathname.length > 2048 ||
    !pathname.startsWith("/") ||
    pathname.startsWith("//") ||
    pathname.includes("\\")
  ) {
    return null;
  }

  return pathname;
}

export async function createBlogCommentAction(
  _previousState: CreateBlogCommentActionState,
  formData: FormData,
): Promise<CreateBlogCommentActionState> {
  const account = await getCurrentAuthAccount();

  if (!account) {
    return {
      status: "error",
      message: "Sign in to comment.",
    };
  }

  const blogPostId = Number.parseInt(readFormString(formData, "blogPostId"), 10);
  const body = readFormString(formData, "body").trim();
  const pathname = readSafePathname(formData);

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
      userId: account.id,
    });

    if (pathname) {
      revalidatePath(pathname);
    }

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

export async function deleteBlogCommentAction(
  _previousState: DeleteBlogCommentActionState,
  formData: FormData,
): Promise<DeleteBlogCommentActionState> {
  const decision = await authorizeCurrentAuthRole("moderator");

  if (!decision.authorized) {
    return {
      status: "error",
      message:
        decision.reason === "unauthenticated"
          ? "Sign in to moderate comments."
          : "You cannot moderate comments.",
    };
  }

  const commentId = Number.parseInt(readFormString(formData, "commentId"), 10);
  const pathname = readSafePathname(formData);

  if (!Number.isSafeInteger(commentId) || commentId <= 0) {
    return {
      status: "error",
      message: "Could not delete comment.",
    };
  }

  try {
    await db.delete(comments).where(eq(comments.id, commentId));

    if (pathname) {
      revalidatePath(pathname);
    }

    return {
      status: "success",
      message: "Comment deleted.",
    };
  } catch (error) {
    console.error("Failed to delete blog comment", error);

    return {
      status: "error",
      message: "Could not delete comment.",
    };
  }
}
