import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import JobsIndex from "@/components/partials/jobs/Index";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Experience");

  return (
    <main>
      <h1>{t("title")}</h1>
      <JobsIndex locale={locale} />
    </main>
  );
}
