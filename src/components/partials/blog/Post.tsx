import { notFound } from "next/navigation";
import { getBlogPostById } from "@/db/queries/blog";

type PostProps = {
  blogPostId: number;
  locale: string;
};

export default async function Post({ blogPostId, locale }: PostProps) {
  const post = await getBlogPostById({ id: blogPostId, locale });

  if (!post) {
    notFound();
  }

  return (
    <article>
      {post.renderedCss ? <style>{post.renderedCss}</style> : null}
      <header>
        <h1>{post.title}</h1>
        {post.publishedAt && (
          <time dateTime={post.publishedAt.toISOString()}>
            {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(post.publishedAt)}
          </time>
        )}
        {post.excerpt ? <p>{post.excerpt}</p> : null}
      </header>
      <section dangerouslySetInnerHTML={{ __html: post.renderedHtml }} />
    </article>
  );
}
