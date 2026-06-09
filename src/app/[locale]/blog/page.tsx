import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
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

  const t = await getTranslations("Blog");

  return (
    <main>
      <h1>{t("title")}</h1>
      <FeaturedBlogPosts locale={locale} />
    </main>
  );
}
