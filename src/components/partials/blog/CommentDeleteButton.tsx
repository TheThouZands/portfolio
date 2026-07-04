"use client";

import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";

import {
  deleteBlogCommentAction,
  type DeleteBlogCommentActionState,
} from "@/blog/actions";
import { useRoleGate } from "@/components/auth/useRoleGate";

type CommentDeleteButtonProps = {
  commentId: number;
};

const initialState: DeleteBlogCommentActionState = {
  status: "idle",
  message: "",
};

export function CommentDeleteButton({ commentId }: CommentDeleteButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const gate = useRoleGate("moderator");
  const handledStateRef = useRef<DeleteBlogCommentActionState | null>(null);
  const [state, formAction, isPending] = useActionState(
    deleteBlogCommentAction,
    initialState,
  );

  useEffect(() => {
    if (state.status !== "success" || handledStateRef.current === state) {
      return;
    }

    handledStateRef.current = state;
    router.refresh();
  }, [router, state]);

  if (!gate.visible) {
    return null;
  }

  return (
    <form action={formAction}>
      <input name="commentId" type="hidden" value={commentId} />
      <input name="pathname" type="hidden" value={pathname} />
      <button disabled={isPending} type="submit">
        {isPending ? "Deleting..." : "Delete comment"}
      </button>
      {state.status === "error" ? (
        <p aria-live="polite">{state.message}</p>
      ) : null}
    </form>
  );
}
