import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ExperienceIndex from "@/components/partials/jobs/ExperienceIndex";
import { routing } from "@/i18n/routing";

type ExperienceIndexPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ExperienceIndexPage({
  params,
}: ExperienceIndexPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Experience");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ExperienceIndex locale={locale} />
    </main>
  );
}
