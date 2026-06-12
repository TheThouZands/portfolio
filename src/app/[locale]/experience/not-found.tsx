import { getLocale, getTranslations } from "next-intl/server";
import ExperienceChart from "@/components/partials/jobs/expChart";

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
      <ExperienceChart locale={locale} />
    </main>
  );
}
