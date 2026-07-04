import Card, {
  type ProjectCardData,
} from "@/components/repeatables/singles/projects/Card";

type ListProps = {
  locale: string;
  projects: ProjectCardData[];
};

export default function List({
  locale,
  projects,
}: ListProps) {
  return (
    <ol>
      {projects.map((project) => (
        <li key={project.id}>
          <Card locale={locale} project={project} />
        </li>
      ))}
    </ol>
  );
}
