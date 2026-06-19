import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { parseId } from "@/cms/params";
import { resolveExperienceMetadata } from "@/cms/experience";
import MentioningPosts from "@/components/repeatables/collections/blog/MentioningPosts";
import JobDetails from "@/components/repeatables/singles/jobs/Details";
import { getBlogPostPreviewsMentioningEntity } from "@/db/queries/blog";
import { getExperienceById } from "@/db/queries/experience";
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

  const [blogT, experienceT, job] = await Promise.all([
    getTranslations("Blog"),
    getTranslations("Experience"),
    getExperienceById({ id: jobId, locale }),
  ]);

  if (!job) {
    notFound();
  }

  const mentioningPosts = await getBlogPostPreviewsMentioningEntity({
    entityId: job.entityId,
    locale,
  });

  return (
    <main>
      <JobDetails
        job={job}
        labels={{
          companyContextTitle: experienceT("companyContextTitle"),
          current: experienceT("current"),
          highlightsTitle: experienceT("highlightsTitle"),
          mediaTitle: experienceT("mediaTitle"),
          overviewTitle: experienceT("overviewTitle"),
          skillsTitle: experienceT("skillsTitle"),
        }}
        locale={locale}
      />
      <MentioningPosts
        locale={locale}
        posts={mentioningPosts}
        title={blogT("mentioningPostsTitle")}
      />
    </main>
  );
}
