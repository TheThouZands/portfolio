import { hasLocale } from "next-intl";
import { notFound, permanentRedirect } from "next/navigation";
import { routing } from "@/i18n/routing";

type SkillsIndexRedirectProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function SkillsIndexRedirect({
  params,
}: SkillsIndexRedirectProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  permanentRedirect(`/${locale}`);
}
