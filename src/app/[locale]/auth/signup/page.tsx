import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { RoutedSignUpForm } from "@/components/auth/RoutedAuthFlow";
import { routing } from "@/i18n/routing";

type SignUpPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main>
      <h1>Create account</h1>
      <RoutedSignUpForm />
    </main>
  );
}
