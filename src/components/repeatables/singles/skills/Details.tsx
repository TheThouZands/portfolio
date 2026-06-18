export type SkillDetailsData = {
  categoryLabel: string | null;
  description: string | null;
  id: number;
  name: string;
};

type DetailsProps = {
  skill: SkillDetailsData;
};

export default function Details({ skill }: DetailsProps) {
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
