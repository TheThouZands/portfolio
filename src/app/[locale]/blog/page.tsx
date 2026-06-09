import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import FeaturedBlogPosts from "@/components/partials/blog/FeaturedBlogPosts";
import { routing } from "@/i18n/routing";

type BlogIndexProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function BlogIndex({ params }: BlogIndexProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main>
      <FeaturedBlogPosts locale={locale} />
    </main>
  );
}
