import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ExperienceDetails from "@/components/partials/jobs/ExperienceDetails";
import { parseCmsRecordIdParam } from "@/cms/params";
import { resolveExperienceMetadata } from "@/cms/experience";
import { routing } from "@/i18n/routing";

type ExperiencePageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { id, locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const experienceId = parseCmsRecordIdParam(id);

  if (!experienceId) {
    notFound();
  }

  const metadata = await resolveExperienceMetadata({ id: experienceId, locale });

  if (!metadata) {
    notFound();
  }

  return metadata;
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { id, locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const experienceId = parseCmsRecordIdParam(id);

  if (!experienceId) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main>
      <ExperienceDetails experienceId={experienceId} locale={locale} />
    </main>
  );
}
