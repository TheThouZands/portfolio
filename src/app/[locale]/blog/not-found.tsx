import { getLocale, getTranslations } from "next-intl/server";
import FeaturedPosts from "@/components/partials/blog/FeaturedPosts";

export default async function BlogNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("Blog");

  return (
    <main>
      <section>
        <header>
          <h1>{t("notFoundTitle")}</h1>
          <p>{t("notFoundDescription")}</p>
        </header>
      </section>
      <FeaturedPosts locale={locale} />
    </main>
  );
}
