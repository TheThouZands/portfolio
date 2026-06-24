import Link from "next/link";
import DateTime from "@/components/repeatables/singles/DateTime";

export type CardData = {
  companyName: string;
  companySlug: string;
  companyWebsiteUrl: string | null;
  employmentType: string;
  endDate: Date | string | null;
  id: number;
  isCurrent: boolean;
  locationLabel: string | null;
  locationType: string;
  positionTitle: string;
  roleSummary: string | null;
  startDate: Date | string;
};

type CardProps = {
  currentLabel: string;
  job: CardData;
  locale: string;
};

function getDateValue(date: Date | string) {
  return date instanceof Date ? date.toISOString().slice(0, 10) : date;
}

function formatEnumLabel(value: string) {
  return value.replaceAll("_", " ");
}

export default function Card({
  currentLabel,
  job,
  locale,
}: CardProps) {
  const endLabel = job.isCurrent ? currentLabel : null;

  return (
    <article>
      <header>
        <h3>
          <Link href={`/${locale}/experience/${job.id}`}>
            {job.positionTitle}
          </Link>
        </h3>
        <p>
          {job.companyWebsiteUrl ? (
            <a href={job.companyWebsiteUrl}>{job.companyName}</a>
          ) : (
            job.companyName
          )}
        </p>
        <p>
          <DateTime
            locale={locale}
            mode="date"
            options={{
              month: "short",
              year: "numeric",
            }}
            value={getDateValue(job.startDate)}
          />
          {job.endDate || endLabel ? " - " : null}
          {job.endDate && !job.isCurrent ? (
            <DateTime
              locale={locale}
              mode="date"
              options={{
                month: "short",
                year: "numeric",
              }}
              value={getDateValue(job.endDate)}
            />
          ) : (
            endLabel
          )}
        </p>
      </header>
      {job.roleSummary ? <p>{job.roleSummary}</p> : null}
      <p>
        {formatEnumLabel(job.employmentType)}
        {job.locationLabel ? ` | ${job.locationLabel}` : null}
        {` | ${formatEnumLabel(job.locationType)}`}
      </p>
    </article>
  );
}
