import "server-only";

import type { Metadata } from "next";
import {
  findBlogPostIdsBySlug,
  getBlogPostMetadataById,
  getBlogPostTranslationSlugs,
  getBlogPostTranslationSlug,
} from "@/db/queries/blog";
import { routing } from "@/i18n/routing";

type ResolveBlogPostRouteOptions = {
  locale: string;
  slug: string;
};

type BareBlogPostRoute = {
  id: number;
  locale: string;
  slug: string;
};

function getBlogPostPath(locale: string, slug: string) {
  return `/${locale}/blog/${slug}`;
}

export async function resolveBlogPostRoute({
  locale,
  slug,
}: ResolveBlogPostRouteOptions) {
  const matches = await findBlogPostIdsBySlug({ slug, limit: 2 });

  if (matches.length !== 1) {
    return null;
  }

  const id = matches[0].id;
  const targetTranslation = await getBlogPostTranslationSlug({ id, locale });

  if (!targetTranslation) {
    return null;
  }

  return {
    canonicalSlug: targetTranslation.slug,
    id,
    isCanonicalSlug: targetTranslation.slug === slug,
    locale,
  };
}

export async function resolveBareBlogPostRoute(
  slug: string,
): Promise<BareBlogPostRoute | null> {
  const matches = await findBlogPostIdsBySlug({ slug, limit: 2 });

  if (matches.length !== 1) {
    return null;
  }

  const id = matches[0].id;
  const translationSlugs = await getBlogPostTranslationSlugs({ id });
  const matchingTranslations = translationSlugs.filter(
    (translation) =>
      translation.slug === slug &&
      routing.locales.some((supportedLocale) => supportedLocale === translation.locale),
  );

  if (matchingTranslations.length === 0) {
    return null;
  }

  const targetTranslation =
    matchingTranslations.find((translation) => translation.locale === routing.defaultLocale) ??
    matchingTranslations[0];

  return {
    id,
    locale: targetTranslation.locale,
    slug: targetTranslation.slug,
  };
}

export async function resolveBlogPostMetadata({
  locale,
  slug,
}: ResolveBlogPostRouteOptions): Promise<Metadata | null> {
  const postRoute = await resolveBlogPostRoute({ locale, slug });

  if (!postRoute) {
    return null;
  }

  const post = await getBlogPostMetadataById({ id: postRoute.id, locale });

  if (!post) {
    return null;
  }

  const translationSlugs = await getBlogPostTranslationSlugs({ id: postRoute.id });
  const languages: Record<string, string> = {};

  for (const translation of translationSlugs) {
    if (routing.locales.some((supportedLocale) => supportedLocale === translation.locale)) {
      languages[translation.locale] = getBlogPostPath(translation.locale, translation.slug);
    }
  }

  const defaultTranslation = translationSlugs.find(
    (translation) => translation.locale === routing.defaultLocale,
  );

  languages["x-default"] = defaultTranslation
    ? getBlogPostPath(defaultTranslation.locale, defaultTranslation.slug)
    : getBlogPostPath(locale, postRoute.canonicalSlug);

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: getBlogPostPath(locale, postRoute.canonicalSlug),
      languages,
    },
  };
}
