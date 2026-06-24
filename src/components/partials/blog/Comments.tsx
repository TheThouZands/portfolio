import { getTranslations } from "next-intl/server";

import CommentThread from "@/components/repeatables/collections/blog/Comments";
import { getBlogPostComments } from "@/db/queries/blog";

type CommentsProps = {
  blogPostId: number;
  locale: string;
};

export default async function Comments({ blogPostId, locale }: CommentsProps) {
  const [comments, t] = await Promise.all([
    getBlogPostComments({ blogPostId }),
    getTranslations("Blog"),
  ]);

  if (comments.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="blog-comments-title">
      <header>
        <h2 id="blog-comments-title">{t("commentsTitle")}</h2>
      </header>
      <CommentThread
        comments={comments}
        fallbackAuthorName={t("commentAuthorFallback")}
        locale={locale}
      />
    </section>
  );
}
