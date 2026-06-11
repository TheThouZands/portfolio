import "server-only";

import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { blogPostRevisions, blogPosts, blogPostTranslations } from "@/db/schema";
import { getVisibleCmsStatuses } from "@/db/queries/cms";

type GetBlogPostPreviewsOptions = {
  featured?: boolean;
  limit?: number;
  locale: string;
};

type GetBlogPostByIdOptions = {
  id: number;
  locale: string;
};

type GetBlogPostMetadataByIdOptions = {
  id: number;
  locale: string;
};

type FindBlogPostIdsBySlugOptions = {
  limit?: number;
  slug: string;
};

type GetBlogPostTranslationSlugsOptions = {
  id: number;
};

type GetBlogPostTranslationSlugOptions = {
  id: number;
  locale: string;
};

export function getVisibleBlogStatuses() {
  return getVisibleCmsStatuses();
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

export async function getBlogPostById({ id, locale }: GetBlogPostByIdOptions) {
  const visibleStatuses = getVisibleBlogStatuses();

  const [post] = await db
    .select({
      excerpt: blogPostTranslations.excerpt,
      publishedAt: blogPosts.published_at,
      renderedCss: blogPostRevisions.rendered_css,
      renderedHtml: blogPostRevisions.rendered_html,
      revisionId: blogPostRevisions.id,
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
    .innerJoin(
      blogPostRevisions,
      and(
        eq(blogPostRevisions.blog_post_id, blogPosts.id),
        eq(blogPostRevisions.locale, locale),
        eq(blogPostRevisions.is_current, true),
      ),
    )
    .where(and(eq(blogPosts.id, id), inArray(blogPosts.status, visibleStatuses)))
    .limit(1);

  return post ?? null;
}

export async function getBlogPostMetadataById({
  id,
  locale,
}: GetBlogPostMetadataByIdOptions) {
  const visibleStatuses = getVisibleBlogStatuses();

  const [post] = await db
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
    .where(and(eq(blogPosts.id, id), inArray(blogPosts.status, visibleStatuses)))
    .limit(1);

  return post ?? null;
}

export async function findBlogPostIdsBySlug({
  limit = 2,
  slug,
}: FindBlogPostIdsBySlugOptions) {
  const visibleStatuses = getVisibleBlogStatuses();

  return db
    .selectDistinct({
      id: blogPosts.id,
    })
    .from(blogPosts)
    .innerJoin(
      blogPostTranslations,
      and(
        eq(blogPostTranslations.blog_post_id, blogPosts.id),
        eq(blogPostTranslations.slug, slug),
      ),
    )
    .where(inArray(blogPosts.status, visibleStatuses))
    .limit(limit);
}

export async function getBlogPostTranslationSlugs({
  id,
}: GetBlogPostTranslationSlugsOptions) {
  return db
    .select({
      locale: blogPostTranslations.locale,
      slug: blogPostTranslations.slug,
    })
    .from(blogPostTranslations)
    .where(eq(blogPostTranslations.blog_post_id, id))
    .orderBy(asc(blogPostTranslations.locale));
}

export async function getBlogPostTranslationSlug({
  id,
  locale,
}: GetBlogPostTranslationSlugOptions) {
  const [targetTranslation] = await db
    .select({
      slug: blogPostTranslations.slug,
    })
    .from(blogPostTranslations)
    .where(
      and(
        eq(blogPostTranslations.blog_post_id, id),
        eq(blogPostTranslations.locale, locale),
      ),
    )
    .limit(1);

  return targetTranslation ?? null;
}
