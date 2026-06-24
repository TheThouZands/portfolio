import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/auth/server";
import { LogoutButton } from "@/components/auth/LogoutButton";
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
  // Read the database-backed session rather than trusting the short cookie
  // cache, so revoked/logged-out sessions stop rendering auth-only UI quickly.
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
          <LogoutButton />
        </section>
      ) : null}
    </main>
  );
}
