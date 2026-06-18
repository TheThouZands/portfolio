import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import WhoamiHero from "@/components/heroes/whoami";
import FeaturedPosts from "@/components/partials/blog/FeaturedPosts";
import JobsChart from "@/components/partials/jobs/Chart";
import SkillsIndex from "@/components/repeatables/collections/skills/Index";
import { getSkills } from "@/db/queries/skills";
import { routing } from "@/i18n/routing";

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [skills, skillsT, t] = await Promise.all([
    getSkills({ locale }),
    getTranslations("Skills"),
    getTranslations("HomePage"),
  ]);

  return (
    <main>
      <WhoamiHero />
      <section>
        <header>
          <h2>{t("introTitle")}</h2>
          <p>{t("introDescription")}</p>
        </header>
        {/* TODO: add portrait image. */}
      </section>
      <SkillsIndex
        locale={locale}
        skills={skills}
        title={skillsT("title")}
      />
      <JobsChart locale={locale} />
      <FeaturedPosts locale={locale} />
    </main>
  );
}
