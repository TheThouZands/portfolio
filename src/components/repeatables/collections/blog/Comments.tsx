import DateTime from "@/components/repeatables/singles/DateTime";

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
              <DateTime
                locale={locale}
                options={{
                  dateStyle: "medium",
                  timeStyle: "short",
                }}
                value={comment.createdAt.toISOString()}
              />
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
