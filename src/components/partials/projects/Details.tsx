import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import SkillsList from "@/components/repeatables/collections/skills/List";
import { getProjectById } from "@/db/queries/projects";

type DetailsProps = {
  locale: string;
  projectId: number;
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

export default async function Details({ locale, projectId }: DetailsProps) {
  const [project, t] = await Promise.all([
    getProjectById({ id: projectId, locale }),
    getTranslations("Projects"),
  ]);

  if (!project) {
    notFound();
  }

  const startLabel = project.startedOn ? formatDate(locale, project.startedOn) : null;
  const completedLabel = project.completedOn
    ? formatDate(locale, project.completedOn)
    : null;

  return (
    <article>
      {project.revision?.renderedCss ? <style>{project.revision.renderedCss}</style> : null}
      <header>
        <h1>{project.title}</h1>
        {project.shortDescription ? <p>{project.shortDescription}</p> : null}
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

      {project.highlights.length > 0 ? (
        <section>
          <h2>{t("highlightsTitle")}</h2>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight.id}>{highlight.body}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.skills.length > 0 ? (
        <section>
          <h2>{t("skillsTitle")}</h2>
          <SkillsList locale={locale} skills={project.skills} />
        </section>
      ) : null}

      {project.revision ? (
        <section dangerouslySetInnerHTML={{ __html: project.revision.renderedHtml }} />
      ) : project.overview ? (
        <section>
          <h2>{t("overviewTitle")}</h2>
          <p>{project.overview}</p>
        </section>
      ) : null}
    </article>
  );
}
