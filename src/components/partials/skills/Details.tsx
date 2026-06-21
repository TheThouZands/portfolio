import { notFound } from "next/navigation";
import SkillDetailsView from "@/components/repeatables/singles/skills/Details";
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

  return <SkillDetailsView skill={skill} />;
}
