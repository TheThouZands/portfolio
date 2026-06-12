import { getTranslations } from "next-intl/server";
import ExperienceList from "@/components/repeatables/collections/jobs/ExperienceList";
import { getExperiencePreviews } from "@/db/queries/experience";

type ExperienceIndexProps = {
  locale: string;
};

export default async function ExperienceIndex({ locale }: ExperienceIndexProps) {
  const t = await getTranslations("Experience");
  const experiences = await getExperiencePreviews({ limit: null, locale });

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("allJobs")}</h2>
      </header>
      <ExperienceList
        currentLabel={t("current")}
        experiences={experiences}
        locale={locale}
      />
    </section>
  );
}
