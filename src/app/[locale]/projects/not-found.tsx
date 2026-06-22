import { getLocale, getTranslations } from "next-intl/server";
import FeaturedProjects from "@/components/partials/projects/FeaturedProjects";

export default async function ProjectsNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("Projects");

  return (
    <main>
      <section>
        <header>
          <h1>{t("notFoundTitle")}</h1>
          <p>{t("notFoundDescription")}</p>
        </header>
      </section>
      <FeaturedProjects locale={locale} />
    </main>
  );
}
