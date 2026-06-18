import "server-only";

import type { Metadata } from "next";
import { getSkillById } from "@/db/queries/skills";
import { routing } from "@/i18n/routing";

type ResolveSkillMetadataOptions = {
  id: number;
  locale: string;
};

function getSkillPath(locale: string, id: number) {
  return `/${locale}/skills/${id}`;
}

export async function resolveSkillMetadata({
  id,
  locale,
}: ResolveSkillMetadataOptions): Promise<Metadata | null> {
  const skill = await getSkillById({ id, locale });

  if (!skill) {
    return null;
  }

  const languages: Record<string, string> = {};

  for (const supportedLocale of routing.locales) {
    languages[supportedLocale] = getSkillPath(supportedLocale, skill.id);
  }

  languages["x-default"] = getSkillPath(routing.defaultLocale, skill.id);

  return {
    title: skill.name,
    description: skill.description ?? undefined,
    alternates: {
      canonical: getSkillPath(locale, skill.id),
      languages,
    },
  };
}
