import { getLocale, getTranslations } from "next-intl/server";
import SkillsIndex from "@/components/partials/skills/Index";

export default async function SkillsNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("Skills");

  return (
    <main>
      <section>
        <header>
          <h1>{t("notFoundTitle")}</h1>
          <p>{t("notFoundDescription")}</p>
        </header>
      </section>
      <SkillsIndex locale={locale} />
    </main>
  );
}
