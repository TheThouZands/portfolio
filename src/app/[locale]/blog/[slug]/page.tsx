import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";
import FeaturedBlogPosts from "@/components/partials/blog/FeaturedBlogPosts";
import Post from "@/components/partials/blog/Post";
import { resolveBlogPostMetadata, resolveBlogPostRoute } from "@/cms/blog";
import { routing } from "@/i18n/routing";

type BlogPostProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const metadata = await resolveBlogPostMetadata({ locale, slug });

  if (!metadata) {
    notFound();
  }

  return metadata;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const postRoute = await resolveBlogPostRoute({ locale, slug });

  if (!postRoute) {
    notFound();
  }

  if (!postRoute.isCanonicalSlug) {
    permanentRedirect(`/${locale}/blog/${postRoute.canonicalSlug}`);
  }

  return (
    <main>
      <Post blogPostId={postRoute.id} locale={locale} />
      <FeaturedBlogPosts locale={locale} />
    </main>
  );
}
