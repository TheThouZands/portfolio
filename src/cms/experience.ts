import "server-only";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getExperienceMetadataById } from "@/db/queries/experience";
import { routing } from "@/i18n/routing";

type ResolveExperienceMetadataOptions = {
  id: number;
  locale: string;
};

function getExperiencePath(locale: string, id: number) {
  return `/${locale}/experience/${id}`;
}

export async function resolveExperienceMetadata({
  id,
  locale,
}: ResolveExperienceMetadataOptions): Promise<Metadata | null> {
  const experience = await getExperienceMetadataById({ id, locale });

  if (!experience) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: "Experience" });
  const languages: Record<string, string> = {};

  for (const supportedLocale of routing.locales) {
    languages[supportedLocale] = getExperiencePath(supportedLocale, id);
  }

  languages["x-default"] = getExperiencePath(routing.defaultLocale, id);

  return {
    title: t("metadataTitle", {
      companyName: experience.companyName,
      positionTitle: experience.positionTitle,
    }),
    description:
      experience.roleSummary ??
      experience.companyContext ??
      experience.companySummary ??
      undefined,
    alternates: {
      canonical: getExperiencePath(locale, id),
      languages,
    },
  };
}
