import Posts from "@/components/repeatables/collections/blog/Posts";
import { type PostCardData } from "@/components/repeatables/singles/blog/PostCard";

type MentioningPostsProps = {
  locale: string;
  posts: PostCardData[];
  title: string;
};

export default function MentioningPosts({
  locale,
  posts,
  title,
}: MentioningPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>{title}</h2>
      <Posts locale={locale} posts={posts} />
    </section>
  );
}
