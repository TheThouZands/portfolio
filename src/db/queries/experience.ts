import "server-only";

import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db/client";
import {
  companies,
  companyTranslations,
  experience,
  experienceTranslations,
} from "@/db/schema";
import { getVisibleCmsStatuses } from "@/db/queries/cms";

type GetExperiencePreviewsOptions = {
  featured?: boolean;
  limit?: number;
  locale: string;
};

export async function getExperiencePreviews({
  featured,
  limit = 6,
  locale,
}: GetExperiencePreviewsOptions) {
  const visibleStatuses = getVisibleCmsStatuses();
  const visibilityFilter = inArray(experience.status, visibleStatuses);
  const featuredFilter = featured === undefined ? undefined : eq(experience.featured, featured);

  return db
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
    .orderBy(asc(experience.sort_order), desc(experience.start_date))
    .limit(limit);
}
