import type { PermissionPayload } from "@/auth/permission-island";
import type { statusCMS } from "@/db/schema";

export const BLOG_POST_STATUS_PERMISSION_ENDPOINT_BASE =
  "/api/permission-islands/blog-post-status";

export type BlogPostCmsStatus = (typeof statusCMS.enumValues)[number];

export type BlogPostStatusOption = BlogPostCmsStatus;

export type BlogPostStatusPermissionData = {
  currentStatus: BlogPostCmsStatus;
  options: Array<{
    label: string;
    value: BlogPostStatusOption;
  }>;
  postId: number;
};

export type BlogPostStatusPermissionPayload =
  PermissionPayload<BlogPostStatusPermissionData>;

export function getBlogPostStatusPermissionEndpoint(postId: number) {
  return `${BLOG_POST_STATUS_PERMISSION_ENDPOINT_BASE}/${postId}`;
}

export function isBlogPostCmsStatus(
  value: unknown,
  statuses: readonly BlogPostCmsStatus[],
): value is BlogPostCmsStatus {
  return (
    typeof value === "string" &&
    statuses.includes(value as BlogPostCmsStatus)
  );
}

export function createBlogPostStatusOptionItems(
  statuses: readonly BlogPostCmsStatus[],
) {
  return statuses.map((status) => ({
    label: getBlogPostStatusLabel(status),
    value: status,
  })) satisfies BlogPostStatusPermissionData["options"];
}

export function getBlogPostStatusLabel(status: BlogPostCmsStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
