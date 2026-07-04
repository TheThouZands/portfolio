import { getTranslations } from "next-intl/server";
import List from "@/components/repeatables/collections/jobs/List";
import { getExperiencePreviews } from "@/db/queries/experience";

type IndexProps = {
  locale: string;
};

export default async function Index({ locale }: IndexProps) {
  const t = await getTranslations("Experience");
  const jobs = await getExperiencePreviews({ limit: null, locale });

  if (jobs.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("allJobs")}</h2>
      </header>
      <List
        currentLabel={t("current")}
        jobs={jobs}
        locale={locale}
      />
    </section>
  );
}
