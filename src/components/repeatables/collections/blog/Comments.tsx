export type CommentThreadItem = {
  authorName: string | null;
  body: string;
  createdAt: Date;
  id: number;
  parentCommentId: number | null;
};

export type CommentThreadNode = CommentThreadItem & {
  replies: CommentThreadNode[];
};

type CommentThreadProps = {
  comments: CommentThreadItem[];
  fallbackAuthorName: string;
  locale: string;
};

type CommentListProps = {
  comments: CommentThreadNode[];
  fallbackAuthorName: string;
  locale: string;
};

function formatCommentDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function buildCommentTree(
  comments: CommentThreadItem[],
): CommentThreadNode[] {
  const nodes = new Map<number, CommentThreadNode>();

  for (const comment of comments) {
    nodes.set(comment.id, {
      ...comment,
      replies: [],
    });
  }

  const roots: CommentThreadNode[] = [];

  for (const comment of comments) {
    const node = nodes.get(comment.id);

    if (!node) {
      continue;
    }

    const parentNode = comment.parentCommentId
      ? nodes.get(comment.parentCommentId)
      : null;

    if (parentNode) {
      parentNode.replies.push(node);
      continue;
    }

    roots.push(node);
  }

  return roots;
}

function CommentList({
  comments,
  fallbackAuthorName,
  locale,
}: CommentListProps) {
  return (
    <ol>
      {comments.map((comment) => (
        <li key={comment.id}>
          <article>
            <header>
              <p>{comment.authorName ?? fallbackAuthorName}</p>
              <time dateTime={comment.createdAt.toISOString()}>
                {formatCommentDate(comment.createdAt, locale)}
              </time>
            </header>
            <p>{comment.body}</p>
          </article>

          {comment.replies.length > 0 ? (
            <CommentList
              comments={comment.replies}
              fallbackAuthorName={fallbackAuthorName}
              locale={locale}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function CommentThread({
  comments,
  fallbackAuthorName,
  locale,
}: CommentThreadProps) {
  const thread = buildCommentTree(comments);

  if (thread.length === 0) {
    return null;
  }

  return (
    <CommentList
      comments={thread}
      fallbackAuthorName={fallbackAuthorName}
      locale={locale}
    />
  );
}
