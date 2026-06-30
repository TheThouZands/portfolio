import { getTranslations } from "next-intl/server";

import CommentThread from "@/components/repeatables/collections/blog/Comments";
import CommentsSessionSection from "@/components/partials/blog/CommentsSessionSection";
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

  return (
    <CommentsSessionSection
      blogPostId={blogPostId}
      fallbackPosterName={t("commentAuthorFallback")}
      hasComments={comments.length > 0}
      labels={{
        bodyLabel: t("commentBodyLabel"),
        bodyPlaceholder: t("commentBodyPlaceholder"),
        postButton: t("commentPostButton"),
        posterPrefix: t("commentPosterPrefix"),
        postingButton: t("commentPostingButton"),
        title: t("commentsTitle"),
      }}
    >
      {comments.length > 0 ? (
        <CommentThread
          comments={comments}
          fallbackAuthorName={t("commentAuthorFallback")}
          locale={locale}
        />
      ) : null}
    </CommentsSessionSection>
  );
}
