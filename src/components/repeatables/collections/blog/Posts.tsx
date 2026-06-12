import PostCard, {
  type PostCardData,
} from "@/components/repeatables/singles/blog/PostCard";

type PostsProps = {
  locale: string;
  posts: PostCardData[];
};

export default function Posts({ locale, posts }: PostsProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} locale={locale} post={post} />
      ))}
    </div>
  );
}
