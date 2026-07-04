import "server-only";

import type { Metadata } from "next";
import { getProjectMetadataById } from "@/db/queries/projects";
import { routing } from "@/i18n/routing";

type ResolveProjectMetadataOptions = {
  id: number;
  locale: string;
};

function getProjectPath(locale: string, id: number) {
  return `/${locale}/projects/${id}`;
}

export async function resolveProjectMetadata({
  id,
  locale,
}: ResolveProjectMetadataOptions): Promise<Metadata | null> {
  const project = await getProjectMetadataById({ id, locale });

  if (!project) {
    return null;
  }

  const languages: Record<string, string> = {};

  for (const supportedLocale of routing.locales) {
    languages[supportedLocale] = getProjectPath(supportedLocale, project.id);
  }

  languages["x-default"] = getProjectPath(routing.defaultLocale, project.id);

  return {
    title: project.title,
    description: project.shortDescription ?? project.overview ?? undefined,
    alternates: {
      canonical: getProjectPath(locale, project.id),
      languages,
    },
  };
}
