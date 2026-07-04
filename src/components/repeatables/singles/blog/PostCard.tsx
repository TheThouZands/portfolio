import Link from "next/link";
import DateTime from "@/components/repeatables/singles/DateTime";

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
  return (
    <article>
      <header>
        <h3>
          <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.publishedAt ? (
          <DateTime
            locale={locale}
            options={{ dateStyle: "medium" }}
            value={post.publishedAt.toISOString()}
          />
        ) : null}
      </header>
      {post.excerpt ? <p>{post.excerpt}</p> : null}
      <p>{post.slug}</p>
    </article>
  );
}
