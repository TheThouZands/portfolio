import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import LoginForm from "@/app/[locale]/auth/login/LoginForm";
import { routing } from "@/i18n/routing";

type LoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main>
      <h1>Sign in</h1>
      <LoginForm />
    </main>
  );
}
