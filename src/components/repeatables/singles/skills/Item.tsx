import Link from "next/link";

export type SkillItemData = {
  categoryLabel: string | null;
  id: number;
  name: string;
};

type ItemProps = {
  locale: string;
  skill: SkillItemData;
};

export default function Item({ locale, skill }: ItemProps) {
  return (
    <>
      <Link href={`/${locale}/skills/${skill.id}`}>{skill.name}</Link>
      {skill.categoryLabel ? ` | ${skill.categoryLabel}` : null}
    </>
  );
}
