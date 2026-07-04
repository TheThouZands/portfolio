"use client";

import { useCallback, useState } from "react";

import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import CommentComposer, {
  type CommentComposerLabels,
} from "@/components/repeatables/collections/blog/CommentComposer";

type CommentReplyIslandLabels = CommentComposerLabels & {
  cancelReplyButton: string;
  replyButton: string;
};

type CommentReplyIslandProps = {
  blogPostId: number;
  commentId: number;
  labels: CommentReplyIslandLabels;
  locale: string;
};

export function CommentReplyIsland({
  blogPostId,
  commentId,
  labels,
  locale,
}: CommentReplyIslandProps) {
  const { state } = useAuthSession();
  const [isReplying, setIsReplying] = useState(false);
  const handleReplySuccess = useCallback(() => {
    setIsReplying(false);
  }, []);

  if (state.status !== "authenticated") {
    return null;
  }

  return (
    <div data-comment-reply-island={commentId}>
      <button
        aria-expanded={isReplying}
        onClick={() => setIsReplying((currentValue) => !currentValue)}
        type="button"
      >
        {isReplying ? labels.cancelReplyButton : labels.replyButton}
      </button>
      {isReplying ? (
        <CommentComposer
          blogPostId={blogPostId}
          labels={labels}
          locale={locale}
          onSuccess={handleReplySuccess}
          parentCommentId={commentId}
        />
      ) : null}
    </div>
  );
}
