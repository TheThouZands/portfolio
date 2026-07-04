import { getTranslations } from "next-intl/server";
import RelatedJobsView from "@/components/repeatables/collections/skills/RelatedJobs";
import { getExperiencePreviewsBySkillId } from "@/db/queries/experience";

type RelatedJobsProps = {
  locale: string;
  skillId: number;
};

export default async function RelatedJobs({
  locale,
  skillId,
}: RelatedJobsProps) {
  const [experienceT, jobs, skillT] = await Promise.all([
    getTranslations("Experience"),
    getExperiencePreviewsBySkillId({ locale, skillId }),
    getTranslations("Skills"),
  ]);

  return (
    <RelatedJobsView
      currentLabel={experienceT("current")}
      jobs={jobs}
      locale={locale}
      title={skillT("relatedJobsTitle")}
    />
  );
}
