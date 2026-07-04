import Card, {
  type CardData,
} from "@/components/repeatables/singles/jobs/Card";

type ListProps = {
  currentLabel: string;
  jobs: CardData[];
  locale: string;
};

export default function List({
  currentLabel,
  jobs,
  locale,
}: ListProps) {
  return (
    <ol>
      {jobs.map((job) => (
        <li key={job.id}>
          <Card
            currentLabel={currentLabel}
            job={job}
            locale={locale}
          />
        </li>
      ))}
    </ol>
  );
}
