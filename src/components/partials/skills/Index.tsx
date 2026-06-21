import { getTranslations } from "next-intl/server";
import List from "@/components/repeatables/collections/skills/List";
import { getSkills } from "@/db/queries/skills";

type IndexProps = {
  locale: string;
};

export default async function Index({ locale }: IndexProps) {
  const [skills, t] = await Promise.all([
    getSkills({ locale }),
    getTranslations("Skills"),
  ]);

  if (skills.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{t("title")}</h2>
      </header>
      <List locale={locale} skills={skills} />
    </section>
  );
}
