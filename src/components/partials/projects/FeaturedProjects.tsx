import { getTranslations } from "next-intl/server";
import List from "@/components/repeatables/collections/projects/List";
import { getProjectPreviews } from "@/db/queries/projects";

type FeaturedProjectsProps = {
  locale: string;
};

export default async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const [homeT, projects] = await Promise.all([
    getTranslations("HomePage"),
    getProjectPreviews({ featured: true, limit: 4, locale }),
  ]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{homeT("featuredProjectsTitle")}</h2>
      </header>
      <List locale={locale} projects={projects} />
    </section>
  );
}
