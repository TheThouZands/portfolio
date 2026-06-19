import { type ExperienceDetail } from "@/db/queries/experience";

type DetailsLabels = {
  companyContextTitle: string;
  current: string;
  highlightsTitle: string;
  mediaTitle: string;
  overviewTitle: string;
  skillsTitle: string;
};

type DetailsProps = {
  job: ExperienceDetail;
  labels: DetailsLabels;
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
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(getDateValue(date));
}

function formatEnumLabel(value: string) {
  return value.replaceAll("_", " ");
}

function getDateRange(
  job: ExperienceDetail,
  locale: string,
  currentLabel: string,
) {
  const startLabel = formatDate(locale, job.startDate);
  const endLabel = job.isCurrent
    ? currentLabel
    : job.endDate
      ? formatDate(locale, job.endDate)
      : null;

  return {
    endLabel,
    startLabel,
  };
}

export default function Details({
  job,
  labels,
  locale,
}: DetailsProps) {
  const { endLabel, startLabel } = getDateRange(
    job,
    locale,
    labels.current,
  );

  return (
    <article>
      <header>
        <h1>{job.positionTitle}</h1>
        <p>
          {job.companyWebsiteUrl ? (
            <a href={job.companyWebsiteUrl}>{job.companyName}</a>
          ) : (
            job.companyName
          )}
        </p>
        <p>
          <time dateTime={getDateTimeValue(job.startDate)}>
            {startLabel}
          </time>
          {endLabel ? " - " : null}
          {job.endDate && !job.isCurrent ? (
            <time dateTime={getDateTimeValue(job.endDate)}>
              {endLabel}
            </time>
          ) : (
            endLabel
          )}
        </p>
        <p>
          {formatEnumLabel(job.employmentType)}
          {job.locationLabel ? ` | ${job.locationLabel}` : null}
          {` | ${formatEnumLabel(job.locationType)}`}
        </p>
      </header>

      {job.roleSummary ? (
        <section>
          <h2>{labels.overviewTitle}</h2>
          <p>{job.roleSummary}</p>
        </section>
      ) : null}

      {job.companyContext ? (
        <section>
          <h2>{labels.companyContextTitle}</h2>
          <p>{job.companyContext}</p>
        </section>
      ) : null}

      {job.bullets.length > 0 ? (
        <section>
          <h2>{labels.highlightsTitle}</h2>
          <ul>
            {job.bullets.map((bullet) => (
              <li key={bullet.id}>
                <strong>{formatEnumLabel(bullet.type)}</strong>
                {`: ${bullet.body}`}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {job.skills.length > 0 ? (
        <section>
          <h2>{labels.skillsTitle}</h2>
          <ul>
            {job.skills.map((skill) => (
              <li key={skill.id}>
                {skill.name}
                {skill.categoryLabel ? ` | ${skill.categoryLabel}` : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {job.media.length > 0 ? (
        <section>
          <h2>{labels.mediaTitle}</h2>
          <div>
            {job.media.map((media) => (
              <figure key={media.id}>
                {/* CMS media can come from arbitrary public asset URLs without Next image dimensions. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={media.altText ?? ""}
                  height={media.height ?? undefined}
                  src={media.url}
                  width={media.width ?? undefined}
                />
                {media.caption ? (
                  <figcaption>
                    {formatEnumLabel(media.role)}: {media.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
