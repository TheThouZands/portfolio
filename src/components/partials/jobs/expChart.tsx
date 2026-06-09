import { getTranslations } from "next-intl/server";
import ExperienceList from "@/components/repeatables/collections/jobs/ExperienceList";
import { getExperiencePreviews } from "@/db/queries/experience";

type ExperienceChartProps = {
  locale: string;
};

export default async function ExperienceChart({ locale }: ExperienceChartProps) {
  const t = await getTranslations("HomePage");
  const experiences = await getExperiencePreviews({ locale });

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("experienceTitle")}</h2>
      </header>
      <ExperienceList
        currentLabel={t("experienceCurrent")}
        experiences={experiences}
        locale={locale}
      />
    </section>
  );
}
