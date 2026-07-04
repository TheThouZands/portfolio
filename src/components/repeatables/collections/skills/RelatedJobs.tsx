import JobsList from "@/components/repeatables/collections/jobs/List";
import { type CardData } from "@/components/repeatables/singles/jobs/Card";

type RelatedJobsProps = {
  currentLabel: string;
  jobs: CardData[];
  locale: string;
  title: string;
};

export default function RelatedJobs({
  currentLabel,
  jobs,
  locale,
  title,
}: RelatedJobsProps) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>{title}</h2>
      <JobsList
        currentLabel={currentLabel}
        jobs={jobs}
        locale={locale}
      />
    </section>
  );
}
