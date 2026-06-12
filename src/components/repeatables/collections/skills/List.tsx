export type SkillListItem = {
  categoryLabel: string | null;
  id: number;
  name: string;
};

type ListProps = {
  skills: SkillListItem[];
};

export default function List({ skills }: ListProps) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          {skill.name}
          {skill.categoryLabel ? ` | ${skill.categoryLabel}` : null}
        </li>
      ))}
    </ul>
  );
}
