import { getTranslations } from "next-intl/server";
import List from "@/components/repeatables/collections/jobs/List";
import { getExperiencePreviews } from "@/db/queries/experience";

type ChartProps = {
  locale: string;
};

export default async function Chart({ locale }: ChartProps) {
  const t = await getTranslations("HomePage");
  const jobs = await getExperiencePreviews({ locale });

  if (jobs.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("experienceTitle")}</h2>
      </header>
      <List
        currentLabel={t("experienceCurrent")}
        jobs={jobs}
        locale={locale}
      />
    </section>
  );
}
