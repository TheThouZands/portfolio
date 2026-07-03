import { getTranslations } from "next-intl/server";

import CommentsSessionSection from "@/components/partials/blog/CommentsSessionSection";
import { CommentDeleteButton } from "@/components/partials/blog/CommentDeleteButton";
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

  return (
    <CommentsSessionSection
      blogPostId={blogPostId}
      locale={locale}
      labels={{
        bodyLabel: t("commentBodyLabel"),
        bodyPlaceholder: t("commentBodyPlaceholder"),
        postButton: t("commentPostButton"),
        postingButton: t("commentPostingButton"),
        title: t("commentsTitle"),
      }}
    >
      {comments.length > 0 ? (
        <CommentThread
          comments={comments}
          fallbackAuthorName={t("commentAuthorFallback")}
          locale={locale}
          renderActions={(comment) => (
            <CommentDeleteButton commentId={comment.id} />
          )}
        />
      ) : null}
    </CommentsSessionSection>
  );
}
