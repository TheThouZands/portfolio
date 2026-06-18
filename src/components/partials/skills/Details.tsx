import { notFound } from "next/navigation";
import { getSkillById } from "@/db/queries/skills";

type DetailsProps = {
  id: number;
  locale: string;
};

export default async function Details({ id, locale }: DetailsProps) {
  const skill = await getSkillById({ id, locale });

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
