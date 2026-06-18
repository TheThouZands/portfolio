import Link from "next/link";

export type SkillListItem = {
  categoryLabel: string | null;
  id: number;
  name: string;
};

type ListProps = {
  locale: string;
  skills: SkillListItem[];
};

export default function List({ locale, skills }: ListProps) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <Link href={`/${locale}/skills/${skill.id}`}>{skill.name}</Link>
          {skill.categoryLabel ? ` | ${skill.categoryLabel}` : null}
        </li>
      ))}
    </ul>
  );
}
