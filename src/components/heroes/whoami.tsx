import { useTranslations } from "next-intl";

export default function WhoamiHero() {
  const t = useTranslations("WhoamiHero");
  const values = t.raw("values") as string[];

  return (
    <section>
      <h1>{t("title")}</h1>
      <span>{values.join(" ")}</span>
    </section>
  );
}
