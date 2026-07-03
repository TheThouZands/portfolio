import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

type CreatePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function CreatePage({ params }: CreatePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("CreatePage");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
