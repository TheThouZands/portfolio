import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { signOutAction } from "@/auth/actions";
import { auth } from "@/auth/server";
import WhoamiHero from "@/components/heroes/whoami";
import FeaturedPosts from "@/components/partials/blog/FeaturedPosts";
import JobsChart from "@/components/partials/jobs/Chart";
import FeaturedProjects from "@/components/partials/projects/FeaturedProjects";
import SkillsIndex from "@/components/partials/skills/Index";
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

  const requestHeaders = await headers();
  const [t, currentSession] = await Promise.all([
    getTranslations("HomePage"),
    auth.api.getSession({
      headers: requestHeaders,
      query: {
        disableCookieCache: true,
      },
    }),
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
      <SkillsIndex locale={locale} />
      <JobsChart locale={locale} />
      <FeaturedProjects locale={locale} />
      <FeaturedPosts locale={locale} />
      {currentSession ? (
        <section>
          <form action={signOutAction}>
            <input name="returnTo" type="hidden" value={`/${locale}`} />
            <button type="submit">Log out</button>
          </form>
        </section>
      ) : null}
    </main>
  );
}
