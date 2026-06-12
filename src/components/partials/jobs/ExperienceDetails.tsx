import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getExperienceById,
  type ExperienceDetail,
} from "@/db/queries/experience";

type ExperienceDetailsProps = {
  experienceId: number;
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
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(getDateValue(date));
}

function formatEnumLabel(value: string) {
  return value.replaceAll("_", " ");
}

function getExperienceDateRange(
  experience: ExperienceDetail,
  locale: string,
  currentLabel: string,
) {
  const startLabel = formatExperienceDate(locale, experience.startDate);
  const endLabel = experience.isCurrent
    ? currentLabel
    : experience.endDate
      ? formatExperienceDate(locale, experience.endDate)
      : null;

  return {
    endLabel,
    startLabel,
  };
}

export default async function ExperienceDetails({
  experienceId,
  locale,
}: ExperienceDetailsProps) {
  const t = await getTranslations("Experience");
  const experience = await getExperienceById({ id: experienceId, locale });

  if (!experience) {
    notFound();
  }

  const { endLabel, startLabel } = getExperienceDateRange(
    experience,
    locale,
    t("current"),
  );

  return (
    <article>
      <header>
        <h1>{experience.positionTitle}</h1>
        <p>
          {experience.companyWebsiteUrl ? (
            <a href={experience.companyWebsiteUrl}>{experience.companyName}</a>
          ) : (
            experience.companyName
          )}
        </p>
        <p>
          <time dateTime={getDateTimeValue(experience.startDate)}>
            {startLabel}
          </time>
          {endLabel ? " - " : null}
          {experience.endDate && !experience.isCurrent ? (
            <time dateTime={getDateTimeValue(experience.endDate)}>
              {endLabel}
            </time>
          ) : (
            endLabel
          )}
        </p>
        <p>
          {formatEnumLabel(experience.employmentType)}
          {experience.locationLabel ? ` | ${experience.locationLabel}` : null}
          {` | ${formatEnumLabel(experience.locationType)}`}
        </p>
      </header>

      {experience.roleSummary ? (
        <section>
          <h2>{t("overviewTitle")}</h2>
          <p>{experience.roleSummary}</p>
        </section>
      ) : null}

      {experience.companyContext ? (
        <section>
          <h2>{t("companyContextTitle")}</h2>
          <p>{experience.companyContext}</p>
        </section>
      ) : null}

      {experience.bullets.length > 0 ? (
        <section>
          <h2>{t("highlightsTitle")}</h2>
          <ul>
            {experience.bullets.map((bullet) => (
              <li key={bullet.id}>
                <strong>{formatEnumLabel(bullet.type)}</strong>
                {`: ${bullet.body}`}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {experience.skills.length > 0 ? (
        <section>
          <h2>{t("skillsTitle")}</h2>
          <ul>
            {experience.skills.map((skill) => (
              <li key={skill.id}>
                {skill.name}
                {skill.categoryLabel ? ` | ${skill.categoryLabel}` : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {experience.media.length > 0 ? (
        <section>
          <h2>{t("mediaTitle")}</h2>
          <div>
            {experience.media.map((media) => (
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
