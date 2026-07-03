"use client";

import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

import {
  createBlogCommentAction,
  type CreateBlogCommentActionState,
} from "@/blog/actions";

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
};

const initialState: CreateBlogCommentActionState = {
  status: "idle",
  message: "",
};

export default function CommentComposer({
  blogPostId,
  labels,
  locale,
}: CommentComposerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const handledStateRef = useRef<CreateBlogCommentActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    createBlogCommentAction,
    initialState,
  );
  const bodyId = `blog-comment-body-${blogPostId}`;

  useEffect(() => {
    if (handledStateRef.current === state) {
      return;
    }

    if (state.status === "success") {
      handledStateRef.current = state;
      formRef.current?.reset();
      router.refresh();
      return;
    }

    if (state.status === "auth_required") {
      handledStateRef.current = state;
      router.push(`/${locale}/auth`);
    }
  }, [locale, router, state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="blogPostId" type="hidden" value={blogPostId} />
      <input name="pathname" type="hidden" value={pathname} />

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
