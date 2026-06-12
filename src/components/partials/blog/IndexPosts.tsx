import { getTranslations } from "next-intl/server";
import Posts from "@/components/repeatables/collections/blog/Posts";
import { getBlogPostPreviews } from "@/db/queries/blog";

type IndexPostsProps = {
  locale: string;
};

export default async function IndexPosts({ locale }: IndexPostsProps) {
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
      <Posts locale={locale} posts={posts} />
    </section>
  );
}
