"use client";

import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

import {
  createBlogCommentAction,
  type CreateBlogCommentActionState,
} from "@/blog/actions";
import { BLOG_COMMENT_BODY_MAX_LENGTH } from "@/blog/comment-policy";

export type CommentComposerLabels = {
  bodyLabel: string;
  bodyPlaceholder: string;
  postButton: string;
  postingButton: string;
};

type CommentComposerProps = {
  blogPostId: number;
  labels: CommentComposerLabels;
  locale: string;
  onSuccess?: () => void;
  parentCommentId?: number;
};

const initialState: CreateBlogCommentActionState = {
  status: "idle",
  message: "",
};

export default function CommentComposer({
  blogPostId,
  labels,
  locale,
  onSuccess,
  parentCommentId,
}: CommentComposerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const handledStateRef = useRef<CreateBlogCommentActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    createBlogCommentAction,
    initialState,
  );
  const bodyId = parentCommentId
    ? `blog-comment-reply-${blogPostId}-${parentCommentId}`
    : `blog-comment-body-${blogPostId}`;

  useEffect(() => {
    if (handledStateRef.current === state) {
      return;
    }

    if (state.status === "success") {
      handledStateRef.current = state;
      formRef.current?.reset();
      onSuccess?.();
      router.refresh();
      return;
    }

    if (state.status === "auth_required") {
      handledStateRef.current = state;
      router.push(`/${locale}/auth`);
    }
  }, [locale, onSuccess, router, state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="blogPostId" type="hidden" value={blogPostId} />
      {parentCommentId ? (
        <input name="parentCommentId" type="hidden" value={parentCommentId} />
      ) : null}
      <input name="pathname" type="hidden" value={pathname} />

      <label htmlFor={bodyId}>{labels.bodyLabel}</label>
      <textarea
        id={bodyId}
        maxLength={BLOG_COMMENT_BODY_MAX_LENGTH}
        name="body"
        placeholder={labels.bodyPlaceholder}
        required
        rows={3}
      />

      <button disabled={isPending} type="submit">
        {isPending ? labels.postingButton : labels.postButton}
      </button>

      {state.message ? <p aria-live="polite">{state.message}</p> : null}
    </form>
  );
}
