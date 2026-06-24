import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

import CommentThread from "@/components/repeatables/collections/blog/Comments";
import CommentComposer from "@/components/repeatables/collections/blog/CommentComposer";
import { auth } from "@/auth/server";
import { getBlogPostComments } from "@/db/queries/blog";

type CommentsProps = {
  blogPostId: number;
  locale: string;
};

export default async function Comments({ blogPostId, locale }: CommentsProps) {
  const requestHeaders = await headers();
  const [comments, currentSession, t] = await Promise.all([
    getBlogPostComments({ blogPostId }),
    auth.api.getSession({
      headers: requestHeaders,
      query: {
        disableCookieCache: true,
      },
    }),
    getTranslations("Blog"),
  ]);

  if (comments.length === 0 && !currentSession) {
    return null;
  }

  return (
    <section aria-labelledby="blog-comments-title">
      <header>
        <h2 id="blog-comments-title">{t("commentsTitle")}</h2>
      </header>
      {currentSession ? (
        <CommentComposer
          blogPostId={blogPostId}
          labels={{
            bodyLabel: t("commentBodyLabel"),
            bodyPlaceholder: t("commentBodyPlaceholder"),
            postButton: t("commentPostButton"),
            posterPrefix: t("commentPosterPrefix"),
            postingButton: t("commentPostingButton"),
          }}
          posterName={currentSession.user.name || t("commentAuthorFallback")}
        />
      ) : null}
      {comments.length > 0 ? (
        <CommentThread
          comments={comments}
          fallbackAuthorName={t("commentAuthorFallback")}
          locale={locale}
        />
      ) : null}
    </section>
  );
}
