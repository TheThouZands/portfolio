import Item, {
  type SkillItemData,
} from "@/components/repeatables/singles/skills/Item";

type ListProps = {
  locale: string;
  skills: SkillItemData[];
};

export default function List({ locale, skills }: ListProps) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>
          <Item locale={locale} skill={skill} />
        </li>
      ))}
    </ul>
  );
}
