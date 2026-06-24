"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

import {
  createBlogCommentAction,
  type CreateBlogCommentActionState,
} from "@/blog/actions";

type CommentComposerLabels = {
  bodyLabel: string;
  bodyPlaceholder: string;
  postButton: string;
  posterPrefix: string;
  postingButton: string;
};

type CommentComposerProps = {
  blogPostId: number;
  labels: CommentComposerLabels;
  posterName: string;
};

const initialState: CreateBlogCommentActionState = {
  status: "idle",
  message: "",
};

export default function CommentComposer({
  blogPostId,
  labels,
  posterName,
}: CommentComposerProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const handledStateRef = useRef<CreateBlogCommentActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    createBlogCommentAction,
    initialState,
  );
  const bodyId = `blog-comment-body-${blogPostId}`;

  useEffect(() => {
    if (state.status !== "success" || handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    formRef.current?.reset();
    router.refresh();
  }, [router, state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="blogPostId" type="hidden" value={blogPostId} />

      <p>
        {labels.posterPrefix} <strong>{posterName}</strong>
      </p>

      <label htmlFor={bodyId}>{labels.bodyLabel}</label>
      <textarea
        id={bodyId}
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
