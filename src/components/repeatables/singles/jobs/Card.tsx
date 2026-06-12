import Link from "next/link";

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
  if (date instanceof Date) {
    return date;
  }

  return new Date(`${date}T00:00:00.000Z`);
}

function getDateTimeValue(date: Date | string) {
  if (date instanceof Date) {
    return date.toISOString();
  }

  return date;
}

function formatDate(locale: string, date: Date | string) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(getDateValue(date));
}

function formatEnumLabel(value: string) {
  return value.replaceAll("_", " ");
}

export default function Card({
  currentLabel,
  job,
  locale,
}: CardProps) {
  const startLabel = formatDate(locale, job.startDate);
  const endLabel = job.isCurrent
    ? currentLabel
    : job.endDate
      ? formatDate(locale, job.endDate)
      : null;

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
          <time dateTime={getDateTimeValue(job.startDate)}>{startLabel}</time>
          {endLabel ? " - " : null}
          {job.endDate && !job.isCurrent ? (
            <time dateTime={getDateTimeValue(job.endDate)}>{endLabel}</time>
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
