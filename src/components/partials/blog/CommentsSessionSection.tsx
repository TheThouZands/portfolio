import type { ReactNode } from "react";

import CommentComposer, {
  type CommentComposerLabels,
} from "@/components/repeatables/collections/blog/CommentComposer";

type CommentsSessionSectionLabels = CommentComposerLabels & {
  title: string;
};

type CommentsSessionSectionProps = {
  blogPostId: number;
  children: ReactNode;
  labels: CommentsSessionSectionLabels;
  locale: string;
};

export default function CommentsSessionSection({
  blogPostId,
  children,
  labels,
  locale,
}: CommentsSessionSectionProps) {
  return (
    <section aria-labelledby="blog-comments-title">
      <header>
        <h2 id="blog-comments-title">{labels.title}</h2>
      </header>
      <CommentComposer blogPostId={blogPostId} labels={labels} locale={locale} />
      {children}
    </section>
  );
}
