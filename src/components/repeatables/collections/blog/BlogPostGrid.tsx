import BlogPostCard, {
  type BlogPostCardPost,
} from "@/components/repeatables/singles/blog/BlogPostCard";

type BlogPostGridProps = {
  locale: string;
  posts: BlogPostCardPost[];
};

export default function BlogPostGrid({ locale, posts }: BlogPostGridProps) {
  return (
    <div>
      {posts.map((post) => (
        <BlogPostCard key={post.slug} locale={locale} post={post} />
      ))}
    </div>
  );
}
