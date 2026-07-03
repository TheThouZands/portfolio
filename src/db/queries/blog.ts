import "server-only";

import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import {
  blogPostMentions,
  blogPostRevisions,
  blogPosts,
  blogPostTranslations,
  comments,
  accounts as authAccounts,
} from "@/db/schema";
import { getVisibleCmsStatuses } from "@/db/queries/cms";

type GetBlogPostPreviewsOptions = {
  featured?: boolean;
  limit?: number | null;
  locale: string;
};

type GetBlogPostPreviewsMentioningEntityOptions = {
  entityId: number;
  limit?: number | null;
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

type GetBlogPostCommentsOptions = {
  blogPostId: number;
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

export type BlogPostTranslationSlug = {
  locale: string;
  slug: string;
};

export type BlogPostComment = {
  authorName: string | null;
  body: string;
  createdAt: Date;
  id: number;
  parentCommentId: number | null;
  updatedAt: Date;
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

  const query = db
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
    .orderBy(desc(blogPosts.published_at), desc(blogPosts.created_at));

  if (limit === null) {
    return query;
  }

  return query.limit(limit);
}

export async function getBlogPostPreviewsMentioningEntity({
  entityId,
  limit = 12,
  locale,
}: GetBlogPostPreviewsMentioningEntityOptions) {
  const visibleStatuses = getVisibleBlogStatuses();

  const query = db
    .select({
      excerpt: blogPostTranslations.excerpt,
      publishedAt: blogPosts.published_at,
      slug: blogPostTranslations.slug,
      title: blogPostTranslations.title,
    })
    .from(blogPostMentions)
    .innerJoin(
      blogPostRevisions,
      and(
        eq(blogPostRevisions.id, blogPostMentions.blog_post_revision_id),
        eq(blogPostRevisions.is_current, true),
        eq(blogPostRevisions.locale, locale),
      ),
    )
    .innerJoin(
      blogPosts,
      and(
        eq(blogPosts.id, blogPostRevisions.blog_post_id),
        inArray(blogPosts.status, visibleStatuses),
      ),
    )
    .innerJoin(
      blogPostTranslations,
      and(
        eq(blogPostTranslations.blog_post_id, blogPosts.id),
        eq(blogPostTranslations.locale, locale),
      ),
    )
    .where(eq(blogPostMentions.mentioned_entity_id, entityId))
    .orderBy(desc(blogPosts.published_at), desc(blogPosts.created_at));

  if (limit === null) {
    return query;
  }

  return query.limit(limit);
}

export async function getBlogPostById({ id, locale }: GetBlogPostByIdOptions) {
  const visibleStatuses = getVisibleBlogStatuses();

  const [post] = await db
    .select({
      excerpt: blogPostTranslations.excerpt,
      publishedAt: blogPosts.published_at,
      revisionId: blogPostRevisions.id,
      slug: blogPostTranslations.slug,
      sourceJson: blogPostRevisions.source_json,
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

export async function getBlogPostComments({
  blogPostId,
}: GetBlogPostCommentsOptions): Promise<BlogPostComment[]> {
  const rows = await db
    .select({
      authorDisplayName: authAccounts.name,
      authorUsername: authAccounts.username,
      body: comments.body,
      createdAt: comments.created_at,
      id: comments.id,
      parentCommentId: comments.parent_comment_id,
      updatedAt: comments.updated_at,
    })
    .from(comments)
    .leftJoin(authAccounts, eq(authAccounts.id, comments.userId))
    .where(eq(comments.blog_post_id, blogPostId))
    .orderBy(asc(comments.created_at), asc(comments.id));

  return rows.map(({ authorDisplayName, authorUsername, ...comment }) => ({
    ...comment,
    authorName: authorUsername ?? authorDisplayName,
  }));
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
}: GetBlogPostTranslationSlugsOptions): Promise<BlogPostTranslationSlug[]> {
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
