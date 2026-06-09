import { getTranslations } from "next-intl/server";
import BlogPostGrid from "@/components/repeatables/collections/blog/BlogPostGrid";
import { getBlogPostPreviews } from "@/db/queries/blog";

type FeaturedBlogPostsProps = {
  locale: string;
};

// TODO: Add placement variants such as home, blogIndex, aside, and afterPost
// so CSS layout and wrapper semantics can diverge per usage.
export default async function FeaturedBlogPosts({ locale }: FeaturedBlogPostsProps) {
  const t = await getTranslations("HomePage");
  const posts = await getBlogPostPreviews({ featured: true, limit: 4, locale });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("featuredPostsTitle")}</h2>
      </header>
      <BlogPostGrid locale={locale} posts={posts} />
    </section>
  );
}
