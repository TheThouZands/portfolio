import { and, desc, eq, inArray } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import BlogPostCard from "@/components/cards/blog/BlogPostCard";
import { db } from "@/db/client";
import { blogPosts, blogPostTranslations } from "@/db/schema";

const publicStatuses = ["published"] as const;
const developmentStatuses = ["published", "testing"] as const;

type FeaturedBlogPostsProps = {
  locale: string;
};

// TODO: Add placement variants such as home, blogIndex, aside, and afterPost
// so CSS layout and wrapper semantics can diverge per usage.
function canShowTestingContent() {
  return process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";
}

export default async function FeaturedBlogPosts({ locale }: FeaturedBlogPostsProps) {
  const t = await getTranslations("HomePage");
  const visibleStatuses = canShowTestingContent() ? developmentStatuses : publicStatuses;

  const posts = await db
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
    .where(
      and(
        eq(blogPosts.featured, true),
        inArray(blogPosts.status, visibleStatuses),
      ),
    )
    .orderBy(desc(blogPosts.published_at), desc(blogPosts.created_at))
    .limit(4);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("featuredPostsTitle")}</h2>
      </header>
      <div>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} locale={locale} post={post} />
        ))}
      </div>
    </section>
  );
}
