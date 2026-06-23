import "server-only";

import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db/client";
import {
  mediaAssets,
  mediaAssetTranslations,
  projectHighlights,
  projectHighlightTranslations,
  projectRevisions,
  projects,
  projectSkills,
  projectTranslations,
  skills,
  skillTranslations,
} from "@/db/schema";
import { getVisibleCmsStatuses } from "@/db/queries/cms";

type GetProjectPreviewsOptions = {
  featured?: boolean;
  limit?: number | null;
  locale: string;
};

type GetProjectByIdOptions = {
  id: number;
  locale: string;
};

type GetProjectMentionTargetByIdOptions = {
  id: number;
};

type ProjectBase = {
  completedOn: Date | string | null;
  coverAltText: string | null;
  coverHeight: number | null;
  coverUrl: string | null;
  coverWidth: number | null;
  entityId: number;
  id: number;
  overview: string | null;
  shortDescription: string | null;
  startedOn: Date | string | null;
  title: string;
};

export type ProjectDetail = ProjectBase & {
  highlights: {
    body: string;
    id: number;
  }[];
  revision: {
    sourceJson: unknown;
  } | null;
  skills: {
    category: string | null;
    categoryLabel: string | null;
    id: number;
    name: string;
    slug: string;
  }[];
};

function getProjectSelectFields() {
  return {
    completedOn: projects.completed_on,
    coverAltText: sql<string | null>`coalesce(${mediaAssetTranslations.alt_text}, ${mediaAssets.alt_text})`,
    coverHeight: mediaAssets.height,
    coverUrl: mediaAssets.url,
    coverWidth: mediaAssets.width,
    entityId: projects.entity_id,
    id: projects.id,
    overview: sql<string | null>`coalesce(${projectTranslations.overview}, ${projects.overview})`,
    shortDescription: sql<string | null>`coalesce(
      ${projectTranslations.short_description},
      ${projects.short_description}
    )`,
    startedOn: projects.started_on,
    title: sql<string>`coalesce(${projectTranslations.title}, ${projects.title})`,
  };
}

function joinProjectTranslations(locale: string) {
  return and(
    eq(projectTranslations.project_id, projects.id),
    eq(projectTranslations.locale, locale),
  );
}

function joinCoverTranslations(locale: string) {
  return and(
    eq(mediaAssetTranslations.media_asset_id, mediaAssets.id),
    eq(mediaAssetTranslations.locale, locale),
  );
}

export async function getProjectPreviews({
  featured,
  limit = 6,
  locale,
}: GetProjectPreviewsOptions) {
  const visibleStatuses = getVisibleCmsStatuses();
  const visibilityFilter = inArray(projects.status, visibleStatuses);
  const featuredFilter = featured === undefined ? undefined : eq(projects.featured, featured);

  const query = db
    .select(getProjectSelectFields())
    .from(projects)
    .leftJoin(projectTranslations, joinProjectTranslations(locale))
    .leftJoin(mediaAssets, eq(mediaAssets.id, projects.cover_asset_id))
    .leftJoin(mediaAssetTranslations, joinCoverTranslations(locale))
    .where(featuredFilter ? and(featuredFilter, visibilityFilter) : visibilityFilter)
    .orderBy(
      asc(projects.sort_order),
      desc(projects.completed_on),
      desc(projects.started_on),
      asc(projects.id),
    );

  if (limit === null) {
    return query;
  }

  return query.limit(limit);
}

async function getProjectBaseById({
  id,
  locale,
}: GetProjectByIdOptions): Promise<ProjectBase | null> {
  const visibleStatuses = getVisibleCmsStatuses();

  const [project] = await db
    .select(getProjectSelectFields())
    .from(projects)
    .leftJoin(projectTranslations, joinProjectTranslations(locale))
    .leftJoin(mediaAssets, eq(mediaAssets.id, projects.cover_asset_id))
    .leftJoin(mediaAssetTranslations, joinCoverTranslations(locale))
    .where(and(eq(projects.id, id), inArray(projects.status, visibleStatuses)))
    .limit(1);

  return project ?? null;
}

export async function getProjectMetadataById(options: GetProjectByIdOptions) {
  return getProjectBaseById(options);
}

export async function getProjectMentionTargetById({
  id,
}: GetProjectMentionTargetByIdOptions) {
  const visibleStatuses = getVisibleCmsStatuses();

  const [project] = await db
    .select({
      entityId: projects.entity_id,
      id: projects.id,
    })
    .from(projects)
    .where(and(eq(projects.id, id), inArray(projects.status, visibleStatuses)))
    .limit(1);

  return project ?? null;
}

export async function getProjectById({
  id,
  locale,
}: GetProjectByIdOptions): Promise<ProjectDetail | null> {
  const project = await getProjectBaseById({ id, locale });

  if (!project) {
    return null;
  }

  const [highlights, projectSkillsList, revisions] = await Promise.all([
    db
      .select({
        body: sql<string>`coalesce(${projectHighlightTranslations.body}, ${projectHighlights.body})`,
        id: projectHighlights.id,
      })
      .from(projectHighlights)
      .leftJoin(
        projectHighlightTranslations,
        and(
          eq(
            projectHighlightTranslations.project_highlight_id,
            projectHighlights.id,
          ),
          eq(projectHighlightTranslations.locale, locale),
        ),
      )
      .where(eq(projectHighlights.project_id, id))
      .orderBy(asc(projectHighlights.sort_order), asc(projectHighlights.id)),
    db
      .select({
        category: skills.category,
        categoryLabel: sql<string | null>`coalesce(${skillTranslations.category_label}, ${skills.category})`,
        id: skills.id,
        name: sql<string>`coalesce(${skillTranslations.name}, ${skills.name})`,
        slug: skills.slug,
      })
      .from(projectSkills)
      .innerJoin(skills, eq(skills.id, projectSkills.skill_id))
      .leftJoin(
        skillTranslations,
        and(
          eq(skillTranslations.skill_id, skills.id),
          eq(skillTranslations.locale, locale),
        ),
      )
      .where(eq(projectSkills.project_id, id))
      .orderBy(asc(projectSkills.sort_order), asc(skills.name)),
    db
      .select({
        sourceJson: projectRevisions.source_json,
      })
      .from(projectRevisions)
      .where(
        and(
          eq(projectRevisions.project_id, id),
          eq(projectRevisions.locale, locale),
          eq(projectRevisions.is_current, true),
        ),
      )
      .limit(1),
  ]);

  return {
    ...project,
    highlights,
    revision: revisions[0] ?? null,
    skills: projectSkillsList,
  };
}
