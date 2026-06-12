import "server-only";

import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { skills, skillTranslations } from "@/db/schema";

type GetSkillsOptions = {
  locale: string;
};

export async function getSkills({ locale }: GetSkillsOptions) {
  return db
    .select({
      categoryLabel: sql<string | null>`coalesce(${skillTranslations.category_label}, ${skills.category})`,
      id: skills.id,
      name: sql<string>`coalesce(${skillTranslations.name}, ${skills.name})`,
    })
    .from(skills)
    .leftJoin(
      skillTranslations,
      and(
        eq(skillTranslations.skill_id, skills.id),
        eq(skillTranslations.locale, locale),
      ),
    )
    .orderBy(asc(skills.category), asc(skills.name));
}
