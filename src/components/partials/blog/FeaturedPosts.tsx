import { getTranslations } from "next-intl/server";
import Posts from "@/components/repeatables/collections/blog/Posts";
import { getBlogPostPreviews } from "@/db/queries/blog";

type FeaturedPostsProps = {
  locale: string;
};

// TODO: Add placement variants such as home, blogIndex, aside, and afterPost
// so CSS layout and wrapper semantics can diverge per usage.
export default async function FeaturedPosts({ locale }: FeaturedPostsProps) {
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
      <Posts locale={locale} posts={posts} />
    </section>
  );
}
