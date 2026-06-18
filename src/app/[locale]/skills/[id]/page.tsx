import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { parseId } from "@/cms/params";
import { resolveSkillMetadata } from "@/cms/skills";
import RelatedJobs from "@/components/repeatables/collections/skills/RelatedJobs";
import SkillDetails from "@/components/repeatables/singles/skills/Details";
import { getExperiencePreviewsBySkillId } from "@/db/queries/experience";
import { getSkillById } from "@/db/queries/skills";
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

  const [experienceT, jobs, skill, skillT] = await Promise.all([
    getTranslations("Experience"),
    getExperiencePreviewsBySkillId({ locale, skillId }),
    getSkillById({ id: skillId, locale }),
    getTranslations("Skills"),
  ]);

  if (!skill) {
    notFound();
  }

  return (
    <main>
      <SkillDetails skill={skill} />
      <RelatedJobs
        currentLabel={experienceT("current")}
        jobs={jobs}
        locale={locale}
        title={skillT("relatedJobsTitle")}
      />
    </main>
  );
}
