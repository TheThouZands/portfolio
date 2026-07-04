import "server-only";

import { eq } from "drizzle-orm";

import {
  createBlogPostStatusOptionItems,
  isBlogPostCmsStatus,
  type BlogPostStatusPermissionData,
} from "@/auth/blog-post-status-permission";
import {
  hiddenPermissionPayload,
  type PermissionPayload,
} from "@/auth/permission-island";
import { authorizeCurrentAuthRole } from "@/auth/roles";
import { db } from "@/db/client";
import { blogPosts, statusCMS } from "@/db/schema";

const BLOG_POST_CMS_STATUS_VALUES = statusCMS.enumValues;

export function isKnownBlogPostCmsStatus(
  value: unknown,
): value is (typeof BLOG_POST_CMS_STATUS_VALUES)[number] {
  return isBlogPostCmsStatus(value, BLOG_POST_CMS_STATUS_VALUES);
}

export function getBlogPostStatusOptionItems() {
  return createBlogPostStatusOptionItems(BLOG_POST_CMS_STATUS_VALUES);
}

export async function getBlogPostStatusPermissionPayload(
  postId: number,
): Promise<PermissionPayload<BlogPostStatusPermissionData>> {
  const decision = await authorizeCurrentAuthRole("owner");

  if (!decision.authorized) {
    return hiddenPermissionPayload();
  }

  const [post] = await db
    .select({
      id: blogPosts.id,
      status: blogPosts.status,
    })
    .from(blogPosts)
    .where(eq(blogPosts.id, postId))
    .limit(1);

  if (!post || !isKnownBlogPostCmsStatus(post.status)) {
    return hiddenPermissionPayload();
  }

  return {
    visible: true,
    data: {
      currentStatus: post.status,
      options: getBlogPostStatusOptionItems(),
      postId: post.id,
    },
  };
}
