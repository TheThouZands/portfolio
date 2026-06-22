import Link from "next/link";

export type ProjectCardData = {
  completedOn: Date | string | null;
  coverAltText: string | null;
  coverHeight: number | null;
  coverUrl: string | null;
  coverWidth: number | null;
  id: number;
  shortDescription: string | null;
  startedOn: Date | string | null;
  title: string;
};

type CardProps = {
  locale: string;
  project: ProjectCardData;
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

function getDateRange(project: ProjectCardData, locale: string) {
  const startLabel = project.startedOn ? formatDate(locale, project.startedOn) : null;
  const completedLabel = project.completedOn
    ? formatDate(locale, project.completedOn)
    : null;

  return {
    completedLabel,
    startLabel,
  };
}

export default function Card({
  locale,
  project,
}: CardProps) {
  const { completedLabel, startLabel } = getDateRange(project, locale);

  return (
    <article>
      {project.coverUrl ? (
        <figure>
          {/* CMS media can come from arbitrary public asset URLs without Next image config. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={project.coverAltText ?? ""}
            height={project.coverHeight ?? undefined}
            src={project.coverUrl}
            width={project.coverWidth ?? undefined}
          />
        </figure>
      ) : null}
      <header>
        <h3>
          <Link href={`/${locale}/projects/${project.id}`}>{project.title}</Link>
        </h3>
        {startLabel || completedLabel ? (
          <p>
            {project.startedOn && startLabel ? (
              <time dateTime={getDateTimeValue(project.startedOn)}>{startLabel}</time>
            ) : null}
            {startLabel && completedLabel ? " - " : null}
            {project.completedOn && completedLabel ? (
              <time dateTime={getDateTimeValue(project.completedOn)}>
                {completedLabel}
              </time>
            ) : null}
          </p>
        ) : null}
      </header>
      {project.shortDescription ? <p>{project.shortDescription}</p> : null}
    </article>
  );
}
