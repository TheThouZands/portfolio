import { getTranslations } from "next-intl/server";
import BlogPostGrid from "@/components/repeatables/collections/blog/BlogPostGrid";
import { getBlogPostPreviews } from "@/db/queries/blog";

type BlogIndexPostsProps = {
  locale: string;
};

export default async function BlogIndexPosts({ locale }: BlogIndexPostsProps) {
  const t = await getTranslations("Blog");
  const posts = await getBlogPostPreviews({ locale });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("allPosts")}</h2>
      </header>
      <BlogPostGrid locale={locale} posts={posts} />
    </section>
  );
}
