import { getTranslations } from "next-intl/server";
import MentioningPostsView from "@/components/repeatables/collections/blog/MentioningPosts";
import { getBlogPostPreviewsMentioningEntity } from "@/db/queries/blog";

type MentioningPostsProps = {
  entityId: number | null;
  locale: string;
};

export default async function MentioningPosts({
  entityId,
  locale,
}: MentioningPostsProps) {
  if (entityId === null) {
    return null;
  }

  const [posts, t] = await Promise.all([
    getBlogPostPreviewsMentioningEntity({ entityId, locale }),
    getTranslations("Blog"),
  ]);

  return (
    <MentioningPostsView
      locale={locale}
      posts={posts}
      title={t("mentioningPostsTitle")}
    />
  );
}
