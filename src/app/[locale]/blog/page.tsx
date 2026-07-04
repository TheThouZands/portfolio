import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import IndexPosts from "@/components/partials/blog/IndexPosts";
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
      <IndexPosts locale={locale} />
    </main>
  );
}
