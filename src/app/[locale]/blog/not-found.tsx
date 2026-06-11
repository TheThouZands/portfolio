import { getLocale, getTranslations } from "next-intl/server";
import FeaturedBlogPosts from "@/components/partials/blog/FeaturedBlogPosts";

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
      <FeaturedBlogPosts locale={locale} />
    </main>
  );
}
