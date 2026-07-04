"use client";

import { useTranslations } from "next-intl";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Error");

  return (
    <main>
      <h2>{t("title")}</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>{t("retry")}</button>
    </main>
  );
}
