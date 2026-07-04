import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <main>
      <h2>{t("title")}</h2>
    </main>
  );
}
