import { getTranslations } from "next-intl/server";
import List from "@/components/repeatables/collections/projects/List";
import { getProjectPreviews } from "@/db/queries/projects";

type IndexProps = {
  locale: string;
};

export default async function Index({ locale }: IndexProps) {
  const [projects, t] = await Promise.all([
    getProjectPreviews({ limit: null, locale }),
    getTranslations("Projects"),
  ]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("allProjects")}</h2>
      </header>
      <List locale={locale} projects={projects} />
    </section>
  );
}
