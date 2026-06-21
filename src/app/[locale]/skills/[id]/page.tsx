import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { parseId } from "@/cms/params";
import { resolveSkillMetadata } from "@/cms/skills";
import SkillDetails from "@/components/partials/skills/Details";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const skillId = parseId(id);

  if (!skillId) {
    notFound();
  }

  const metadata = await resolveSkillMetadata({ id: skillId, locale });

  if (!metadata) {
    notFound();
  }

  return metadata;
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const skillId = parseId(id);

  if (!skillId) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main>
      <SkillDetails locale={locale} skillId={skillId} />
    </main>
  );
}
