import { getTranslations } from "next-intl/server";
import RelatedJobsView from "@/components/repeatables/collections/skills/RelatedJobs";
import { getExperiencePreviewsBySkillId } from "@/db/queries/experience";

type RelatedJobsSkill = {
  id: number;
};

type RelatedJobsProps = {
  locale: string;
  skill: RelatedJobsSkill;
};

export default async function RelatedJobs({
  locale,
  skill,
}: RelatedJobsProps) {
  const [experienceT, jobs, skillT] = await Promise.all([
    getTranslations("Experience"),
    getExperiencePreviewsBySkillId({ locale, skillId: skill.id }),
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
