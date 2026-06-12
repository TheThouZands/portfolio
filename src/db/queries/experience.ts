import "server-only";

import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db/client";
import {
  companies,
  companyTranslations,
  experience,
  experienceBulletTranslations,
  experienceBullets,
  experienceMedia,
  experienceMediaTranslations,
  experienceSkills,
  experienceTranslations,
  mediaAssets,
  mediaAssetTranslations,
  skills,
  skillTranslations,
} from "@/db/schema";
import { getVisibleCmsStatuses } from "@/db/queries/cms";

type GetExperiencePreviewsOptions = {
  featured?: boolean;
  limit?: number | null;
  locale: string;
};

type GetExperienceByIdOptions = {
  id: number;
  locale: string;
};

type ExperienceBase = {
  companyContext: string | null;
  companyName: string;
  companySlug: string;
  companySummary: string | null;
  companyWebsiteUrl: string | null;
  employmentType: string;
  endDate: Date | string | null;
  id: number;
  isCurrent: boolean;
  locationLabel: string | null;
  locationType: string;
  positionTitle: string;
  roleSummary: string | null;
  startDate: Date | string;
};

export type ExperienceDetail = ExperienceBase & {
  bullets: {
    body: string;
    id: number;
    type: string;
  }[];
  media: {
    altText: string | null;
    caption: string | null;
    contentType: string;
    height: number | null;
    id: number;
    role: string;
    url: string;
    width: number | null;
  }[];
  skills: {
    category: string | null;
    categoryLabel: string | null;
    id: number;
    name: string;
    slug: string;
  }[];
};

export async function getExperiencePreviews({
  featured,
  limit = 6,
  locale,
}: GetExperiencePreviewsOptions) {
  const visibleStatuses = getVisibleCmsStatuses();
  const visibilityFilter = inArray(experience.status, visibleStatuses);
  const featuredFilter = featured === undefined ? undefined : eq(experience.featured, featured);

  const query = db
    .select({
      companyName: sql<string>`coalesce(${companyTranslations.company_name}, ${companies.company_name})`,
      companySlug: sql<string>`coalesce(${companyTranslations.slug}, ${companies.slug})`,
      companyWebsiteUrl: companies.website_url,
      employmentType: experience.employment_type,
      endDate: experience.end_date,
      id: experience.id,
      isCurrent: experience.is_current,
      locationLabel: sql<string | null>`coalesce(
        ${experienceTranslations.location_label},
        ${experience.location_label}
      )`,
      locationType: experience.location_type,
      positionTitle: sql<string>`coalesce(
        ${experienceTranslations.position_title},
        ${experience.position_title}
      )`,
      roleSummary: sql<string | null>`coalesce(
        ${experienceTranslations.role_summary},
        ${experience.role_summary}
      )`,
      startDate: experience.start_date,
    })
    .from(experience)
    .innerJoin(companies, eq(companies.id, experience.company_id))
    .leftJoin(
      experienceTranslations,
      and(
        eq(experienceTranslations.experience_id, experience.id),
        eq(experienceTranslations.locale, locale),
      ),
    )
    .leftJoin(
      companyTranslations,
      and(
        eq(companyTranslations.company_id, companies.id),
        eq(companyTranslations.locale, locale),
      ),
    )
    .where(featuredFilter ? and(featuredFilter, visibilityFilter) : visibilityFilter)
    .orderBy(asc(experience.sort_order), desc(experience.start_date));

  if (limit === null) {
    return query;
  }

  return query.limit(limit);
}

async function getExperienceBaseById({
  id,
  locale,
}: GetExperienceByIdOptions): Promise<ExperienceBase | null> {
  const visibleStatuses = getVisibleCmsStatuses();

  const [entry] = await db
    .select({
      companyContext: sql<string | null>`coalesce(
        ${experienceTranslations.company_context},
        ${experience.company_context}
      )`,
      companyName: sql<string>`coalesce(${companyTranslations.company_name}, ${companies.company_name})`,
      companySlug: sql<string>`coalesce(${companyTranslations.slug}, ${companies.slug})`,
      companySummary: sql<string | null>`coalesce(${companyTranslations.summary}, ${companies.summary})`,
      companyWebsiteUrl: companies.website_url,
      employmentType: experience.employment_type,
      endDate: experience.end_date,
      id: experience.id,
      isCurrent: experience.is_current,
      locationLabel: sql<string | null>`coalesce(
        ${experienceTranslations.location_label},
        ${experience.location_label}
      )`,
      locationType: experience.location_type,
      positionTitle: sql<string>`coalesce(
        ${experienceTranslations.position_title},
        ${experience.position_title}
      )`,
      roleSummary: sql<string | null>`coalesce(
        ${experienceTranslations.role_summary},
        ${experience.role_summary}
      )`,
      startDate: experience.start_date,
    })
    .from(experience)
    .innerJoin(companies, eq(companies.id, experience.company_id))
    .leftJoin(
      experienceTranslations,
      and(
        eq(experienceTranslations.experience_id, experience.id),
        eq(experienceTranslations.locale, locale),
      ),
    )
    .leftJoin(
      companyTranslations,
      and(
        eq(companyTranslations.company_id, companies.id),
        eq(companyTranslations.locale, locale),
      ),
    )
    .where(and(eq(experience.id, id), inArray(experience.status, visibleStatuses)))
    .limit(1);

  return entry ?? null;
}

export async function getExperienceMetadataById(options: GetExperienceByIdOptions) {
  return getExperienceBaseById(options);
}

export async function getExperienceById({
  id,
  locale,
}: GetExperienceByIdOptions): Promise<ExperienceDetail | null> {
  const entry = await getExperienceBaseById({ id, locale });

  if (!entry) {
    return null;
  }

  const bullets = await db
    .select({
      body: sql<string>`coalesce(${experienceBulletTranslations.body}, ${experienceBullets.body})`,
      id: experienceBullets.id,
      type: experienceBullets.type,
    })
    .from(experienceBullets)
    .leftJoin(
      experienceBulletTranslations,
      and(
        eq(
          experienceBulletTranslations.experience_bullet_id,
          experienceBullets.id,
        ),
        eq(experienceBulletTranslations.locale, locale),
      ),
    )
    .where(eq(experienceBullets.experience_id, id))
    .orderBy(asc(experienceBullets.sort_order), asc(experienceBullets.id));

  const entrySkills = await db
    .select({
      category: skills.category,
      categoryLabel: sql<string | null>`coalesce(${skillTranslations.category_label}, ${skills.category})`,
      id: skills.id,
      name: sql<string>`coalesce(${skillTranslations.name}, ${skills.name})`,
      slug: skills.slug,
    })
    .from(experienceSkills)
    .innerJoin(skills, eq(skills.id, experienceSkills.skill_id))
    .leftJoin(
      skillTranslations,
      and(
        eq(skillTranslations.skill_id, skills.id),
        eq(skillTranslations.locale, locale),
      ),
    )
    .where(eq(experienceSkills.experience_id, id))
    .orderBy(asc(experienceSkills.sort_order), asc(skills.name));

  const media = await db
    .select({
      altText: sql<string | null>`coalesce(${mediaAssetTranslations.alt_text}, ${mediaAssets.alt_text})`,
      caption: sql<string | null>`coalesce(${experienceMediaTranslations.caption}, ${experienceMedia.caption})`,
      contentType: mediaAssets.content_type,
      height: mediaAssets.height,
      id: experienceMedia.id,
      role: experienceMedia.role,
      url: mediaAssets.url,
      width: mediaAssets.width,
    })
    .from(experienceMedia)
    .innerJoin(mediaAssets, eq(mediaAssets.id, experienceMedia.media_asset_id))
    .leftJoin(
      experienceMediaTranslations,
      and(
        eq(experienceMediaTranslations.experience_media_id, experienceMedia.id),
        eq(experienceMediaTranslations.locale, locale),
      ),
    )
    .leftJoin(
      mediaAssetTranslations,
      and(
        eq(mediaAssetTranslations.media_asset_id, mediaAssets.id),
        eq(mediaAssetTranslations.locale, locale),
      ),
    )
    .where(eq(experienceMedia.experience_id, id))
    .orderBy(asc(experienceMedia.sort_order), asc(experienceMedia.id));

  return {
    ...entry,
    bullets,
    media,
    skills: entrySkills,
  };
}
