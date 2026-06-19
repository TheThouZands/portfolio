import "server-only";

import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { skills, skillTranslations } from "@/db/schema";

type GetSkillsOptions = {
  locale: string;
};

type GetSkillByIdOptions = {
  id: number;
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

export async function getSkillById({ id, locale }: GetSkillByIdOptions) {
  const [skill] = await db
    .select({
      categoryLabel: sql<string | null>`coalesce(${skillTranslations.category_label}, ${skills.category})`,
      description: sql<string | null>`coalesce(${skillTranslations.description}, ${skills.description})`,
      entityId: skills.entity_id,
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
    .where(eq(skills.id, id))
    .limit(1);

  return skill ?? null;
}
