import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import IdentifierForm from "@/app/[locale]/auth/IdentifierForm";
import { routing } from "@/i18n/routing";

type AuthPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AuthPage({ params }: AuthPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main>
      <h1>Continue</h1>
      <IdentifierForm locale={locale} />
    </main>
  );
}
