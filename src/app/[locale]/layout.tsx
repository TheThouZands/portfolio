import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { AuthSessionProvider } from "@/components/auth/AuthSessionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { routing } from "@/i18n/routing";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "SiteHeader" });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthSessionProvider>
            <SiteHeader
              labels={{
                account: t("account"),
                blog: t("blog"),
                brand: t("brand"),
                experience: t("experience"),
                home: t("home"),
                login: t("login"),
                logout: t("logout"),
                logoutPending: t("logoutPending"),
                primaryNavigation: t("primaryNavigation"),
                projects: t("projects"),
                skills: t("skills"),
              }}
              locale={locale}
            />
            {children}
          </AuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
