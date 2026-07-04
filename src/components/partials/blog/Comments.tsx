import { getTranslations } from "next-intl/server";

import CommentsSessionSection from "@/components/partials/blog/CommentsSessionSection";
import { CommentDeleteButton } from "@/components/partials/blog/CommentDeleteButton";
import { CommentReplyIsland } from "@/components/partials/blog/CommentReplyIsland";
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
            <>
              <CommentReplyIsland
                blogPostId={blogPostId}
                commentId={comment.id}
                labels={{
                  bodyLabel: t("commentBodyLabel"),
                  bodyPlaceholder: t("commentBodyPlaceholder"),
                  cancelReplyButton: t("commentReplyCancelButton"),
                  postButton: t("commentPostButton"),
                  postingButton: t("commentPostingButton"),
                  replyButton: t("commentReplyButton"),
                }}
                locale={locale}
              />
              <CommentDeleteButton commentId={comment.id} />
            </>
          )}
        />
      ) : null}
    </CommentsSessionSection>
  );
}
