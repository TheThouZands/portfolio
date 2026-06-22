import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { parseId } from "@/cms/params";
import { resolveProjectMetadata } from "@/cms/projects";
import MentioningPosts from "@/components/partials/blog/MentioningPosts";
import ProjectDetails from "@/components/partials/projects/Details";
import { getProjectMentionTargetById } from "@/db/queries/projects";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const projectId = parseId(id);

  if (!projectId) {
    notFound();
  }

  const metadata = await resolveProjectMetadata({ id: projectId, locale });

  if (!metadata) {
    notFound();
  }

  return metadata;
}

export default async function Page({ params }: PageProps) {
  const { id, locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const projectId = parseId(id);

  if (!projectId) {
    notFound();
  }

  setRequestLocale(locale);

  const mentionTarget = await getProjectMentionTargetById({ id: projectId });

  return (
    <main>
      <ProjectDetails locale={locale} projectId={projectId} />
      <MentioningPosts entityId={mentionTarget?.entityId ?? null} locale={locale} />
    </main>
  );
}
