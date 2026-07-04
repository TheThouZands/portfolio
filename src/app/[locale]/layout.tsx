import type { Metadata } from "next";
import { Instrument_Serif, Supermercado_One } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import OobeLandingHero from "@/components/heroes/oobe-landing";
import { routing } from "@/i18n/routing";
import styles from "./layout.module.scss";

const instrument = Instrument_Serif({
  weight: ["400"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const supermercado = Supermercado_One({
  weight: ["400"],
  variable: "--font-supermercado-one",
  subsets: ["latin"],
});

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
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${instrument.variable} ${supermercado.variable} ${styles.body}`}
      >
        <NextIntlClientProvider messages={messages}>
          <main className={styles.content}>
            <OobeLandingHero />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
