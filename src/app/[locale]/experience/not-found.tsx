import { getLocale, getTranslations } from "next-intl/server";
import JobsChart from "@/components/partials/jobs/Chart";

export default async function ExperienceNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("Experience");

  return (
    <main>
      <section>
        <header>
          <h1>{t("notFoundTitle")}</h1>
          <p>{t("notFoundDescription")}</p>
        </header>
      </section>
      <JobsChart locale={locale} />
    </main>
  );
}
