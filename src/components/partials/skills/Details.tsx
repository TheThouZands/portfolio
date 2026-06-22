import { notFound } from "next/navigation";
import { getSkillById } from "@/db/queries/skills";

type DetailsProps = {
  locale: string;
  skillId: number;
};

export default async function Details({ locale, skillId }: DetailsProps) {
  const skill = await getSkillById({ id: skillId, locale });

  if (!skill) {
    notFound();
  }

  return (
    <article>
      <header>
        <h1>{skill.name}</h1>
        {skill.categoryLabel ? <p>{skill.categoryLabel}</p> : null}
      </header>
      {skill.description ? <p>{skill.description}</p> : null}
    </article>
  );
}
