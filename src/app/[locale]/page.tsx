import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import WhoamiHero from "@/components/heroes/whoami";
import ExperienceChart from "@/components/partials/jobs/expChart";
import { routing } from "@/i18n/routing";

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

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
      <ExperienceChart />
    </main>
  );
}
