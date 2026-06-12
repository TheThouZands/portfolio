import Link from "next/link";

export type PostCardData = {
  excerpt: string | null;
  publishedAt: Date | null;
  slug: string;
  title: string;
};

type PostCardProps = {
  locale: string;
  post: PostCardData;
};

export default function PostCard({ locale, post }: PostCardProps) {
  const publishedAt = post.publishedAt
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(post.publishedAt)
    : null;

  return (
    <article>
      <header>
        <h3>
          <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {publishedAt && post.publishedAt ? (
          <time dateTime={post.publishedAt.toISOString()}>{publishedAt}</time>
        ) : null}
      </header>
      {post.excerpt ? <p>{post.excerpt}</p> : null}
      <p>{post.slug}</p>
    </article>
  );
}
