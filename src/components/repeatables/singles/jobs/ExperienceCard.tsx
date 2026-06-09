export type ExperienceCardExperience = {
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

type ExperienceCardProps = {
  currentLabel: string;
  experience: ExperienceCardExperience;
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

function formatExperienceDate(locale: string, date: Date | string) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(getDateValue(date));
}

function formatEnumLabel(value: string) {
  return value.replaceAll("_", " ");
}

export default function ExperienceCard({
  currentLabel,
  experience,
  locale,
}: ExperienceCardProps) {
  const startLabel = formatExperienceDate(locale, experience.startDate);
  const endLabel = experience.isCurrent
    ? currentLabel
    : experience.endDate
      ? formatExperienceDate(locale, experience.endDate)
      : null;

  return (
    <article>
      <header>
        <h3>{experience.positionTitle}</h3>
        <p>
          {experience.companyWebsiteUrl ? (
            <a href={experience.companyWebsiteUrl}>{experience.companyName}</a>
          ) : (
            experience.companyName
          )}
        </p>
        <p>
          <time dateTime={getDateTimeValue(experience.startDate)}>{startLabel}</time>
          {endLabel ? " - " : null}
          {experience.endDate && !experience.isCurrent ? (
            <time dateTime={getDateTimeValue(experience.endDate)}>{endLabel}</time>
          ) : (
            endLabel
          )}
        </p>
      </header>
      {experience.roleSummary ? <p>{experience.roleSummary}</p> : null}
      <p>
        {formatEnumLabel(experience.employmentType)}
        {experience.locationLabel ? ` | ${experience.locationLabel}` : null}
        {` | ${formatEnumLabel(experience.locationType)}`}
      </p>
    </article>
  );
}
