import Link from "next/link";

export type BlogPostCardPost = {
  excerpt: string | null;
  publishedAt: Date | null;
  slug: string;
  title: string;
};

type BlogPostCardProps = {
  locale: string;
  post: BlogPostCardPost;
};

export default function BlogPostCard({ locale, post }: BlogPostCardProps) {
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
