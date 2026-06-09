import ExperienceCard, {
  type ExperienceCardExperience,
} from "@/components/repeatables/singles/jobs/ExperienceCard";

type ExperienceListProps = {
  currentLabel: string;
  experiences: ExperienceCardExperience[];
  locale: string;
};

export default function ExperienceList({
  currentLabel,
  experiences,
  locale,
}: ExperienceListProps) {
  return (
    <ol>
      {experiences.map((experience) => (
        <li key={experience.id}>
          <ExperienceCard
            currentLabel={currentLabel}
            experience={experience}
            locale={locale}
          />
        </li>
      ))}
    </ol>
  );
}
