import { getTranslations } from "next-intl/server";
import List from "@/components/repeatables/collections/skills/List";
import { getSkills } from "@/db/queries/skills";

type IndexProps = {
  locale: string;
};

export default async function Index({ locale }: IndexProps) {
  const t = await getTranslations("Skills");
  const skills = await getSkills({ locale });

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
