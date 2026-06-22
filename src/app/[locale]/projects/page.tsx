import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ProjectsIndex from "@/components/partials/projects/Index";
import { routing } from "@/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Projects");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ProjectsIndex locale={locale} />
    </main>
  );
}
