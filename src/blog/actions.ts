"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { isKnownBlogPostCmsStatus } from "@/auth/blog-post-status-permission.server";
import {
  type BlogPostCmsStatus,
} from "@/auth/blog-post-status-permission";
import {
  authorizeCurrentAuthRole,
  getCurrentAuthAccount,
} from "@/auth/roles";
import { db } from "@/db/client";
import { blogPosts, comments } from "@/db/schema";

export type CreateBlogCommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type DeleteBlogCommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type UpdateBlogPostStatusActionState = {
  currentStatus?: BlogPostCmsStatus;
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

function readBlogIndexPathname(pathname: string | null): string | null {
  if (!pathname) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length < 2 || segments[1] !== "blog") {
    return null;
  }

  return `/${segments[0]}/blog`;
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

export async function updateBlogPostStatusAction(
  _previousState: UpdateBlogPostStatusActionState,
  formData: FormData,
): Promise<UpdateBlogPostStatusActionState> {
  const decision = await authorizeCurrentAuthRole("owner");

  if (!decision.authorized) {
    return {
      status: "error",
      message:
        decision.reason === "unauthenticated"
          ? "Sign in to manage posts."
          : "You cannot manage posts.",
    };
  }

  const blogPostId = Number.parseInt(readFormString(formData, "blogPostId"), 10);
  const nextStatus = readFormString(formData, "status");
  const pathname = readSafePathname(formData);
  const blogIndexPathname = readBlogIndexPathname(pathname);

  if (
    !Number.isSafeInteger(blogPostId) ||
    blogPostId <= 0 ||
    !isKnownBlogPostCmsStatus(nextStatus)
  ) {
    return {
      status: "error",
      message: "Could not update post status.",
    };
  }

  try {
    const [post] = await db
      .select({
        id: blogPosts.id,
        publishedAt: blogPosts.published_at,
        status: blogPosts.status,
      })
      .from(blogPosts)
      .where(eq(blogPosts.id, blogPostId))
      .limit(1);

    if (!post) {
      return {
        status: "error",
        message: "Could not update post status.",
      };
    }

    if (post.status !== nextStatus) {
      const now = new Date();

      await db
        .update(blogPosts)
        .set({
          published_at:
            nextStatus === "published" && !post.publishedAt
              ? now
              : post.publishedAt,
          status: nextStatus,
          updated_at: now,
        })
        .where(eq(blogPosts.id, blogPostId));
    }

    if (pathname) {
      revalidatePath(pathname);
    }

    if (blogIndexPathname) {
      revalidatePath(blogIndexPathname);
    }

    return {
      currentStatus: nextStatus,
      status: "success",
      message: "Post status updated.",
    };
  } catch (error) {
    console.error("Failed to update blog post status", error);

    return {
      status: "error",
      message: "Could not update post status.",
    };
  }
}
