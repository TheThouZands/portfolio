import "server-only";

import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { blogPosts, blogPostTranslations } from "@/db/schema";

const publicStatuses = ["published"] as const;
const developmentStatuses = ["published", "testing"] as const;

type GetBlogPostPreviewsOptions = {
  featured?: boolean;
  limit?: number;
  locale: string;
};

function canShowTestingContent() {
  return process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";
}

export function getVisibleBlogStatuses() {
  return canShowTestingContent() ? developmentStatuses : publicStatuses;
}

export async function getBlogPostPreviews({
  featured,
  limit = 12,
  locale,
}: GetBlogPostPreviewsOptions) {
  const visibleStatuses = getVisibleBlogStatuses();
  const visibilityFilter = inArray(blogPosts.status, visibleStatuses);
  const featuredFilter = featured === undefined ? undefined : eq(blogPosts.featured, featured);

  return db
    .select({
      excerpt: blogPostTranslations.excerpt,
      publishedAt: blogPosts.published_at,
      slug: blogPostTranslations.slug,
      title: blogPostTranslations.title,
    })
    .from(blogPosts)
    .innerJoin(
      blogPostTranslations,
      and(
        eq(blogPostTranslations.blog_post_id, blogPosts.id),
        eq(blogPostTranslations.locale, locale),
      ),
    )
    .where(featuredFilter ? and(featuredFilter, visibilityFilter) : visibilityFilter)
    .orderBy(desc(blogPosts.published_at), desc(blogPosts.created_at))
    .limit(limit);
}
