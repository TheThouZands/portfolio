import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { parseId } from "@/cms/params";
import { resolveExperienceMetadata } from "@/cms/experience";
import MentioningPosts from "@/components/partials/blog/MentioningPosts";
import JobDetails from "@/components/partials/jobs/Details";
import { getExperienceMentionTargetById } from "@/db/queries/experience";
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

  const jobId = parseId(id);

  if (!jobId) {
    notFound();
  }

  const metadata = await resolveExperienceMetadata({ id: jobId, locale });

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

  const jobId = parseId(id);

  if (!jobId) {
    notFound();
  }

  setRequestLocale(locale);

  const mentionTarget = await getExperienceMentionTargetById({ id: jobId });

  return (
    <main>
      <JobDetails jobId={jobId} locale={locale} />
      <MentioningPosts entityId={mentionTarget?.entityId ?? null} locale={locale} />
    </main>
  );
}
