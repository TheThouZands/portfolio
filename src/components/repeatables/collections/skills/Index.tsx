import List, { type SkillListItem } from "./List";

type IndexProps = {
  locale: string;
  skills: SkillListItem[];
  title: string;
};

export default function Index({ locale, skills, title }: IndexProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <section>
      <header>
        <h2>{title}</h2>
      </header>
      <List locale={locale} skills={skills} />
    </section>
  );
}
