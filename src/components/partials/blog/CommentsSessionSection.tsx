"use client";

import type { ReactNode } from "react";

import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import CommentComposer, {
  type CommentComposerLabels,
} from "@/components/repeatables/collections/blog/CommentComposer";

type CommentsSessionSectionLabels = CommentComposerLabels & {
  title: string;
};

type CommentsSessionSectionProps = {
  blogPostId: number;
  children: ReactNode;
  fallbackPosterName: string;
  hasComments: boolean;
  labels: CommentsSessionSectionLabels;
};

export default function CommentsSessionSection({
  blogPostId,
  children,
  fallbackPosterName,
  hasComments,
  labels,
}: CommentsSessionSectionProps) {
  const { state } = useAuthSession();
  const isAuthenticated = state.status === "authenticated";

  if (!hasComments && !isAuthenticated) {
    return null;
  }

  const posterName =
    isAuthenticated
      ? (state.user.username ?? state.user.name) || fallbackPosterName
      : fallbackPosterName;

  return (
    <section aria-labelledby="blog-comments-title">
      <header>
        <h2 id="blog-comments-title">{labels.title}</h2>
      </header>
      {isAuthenticated ? (
        <CommentComposer
          blogPostId={blogPostId}
          labels={labels}
          posterName={posterName}
        />
      ) : null}
      {children}
    </section>
  );
}
