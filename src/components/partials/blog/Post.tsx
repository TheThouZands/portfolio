import { notFound } from "next/navigation";
import Content from "@/components/repeatables/structural-content/Content";
import DateTime from "@/components/repeatables/singles/DateTime";
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
      <header>
        <h1>{post.title}</h1>
        {post.publishedAt && (
          <DateTime
            locale={locale}
            options={{ dateStyle: "long" }}
            value={post.publishedAt.toISOString()}
          />
        )}
        {post.excerpt ? <p>{post.excerpt}</p> : null}
      </header>
      <section>
        <Content value={post.sourceJson} />
      </section>
    </article>
  );
}
