import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import SkillsList from "@/components/repeatables/collections/skills/List";
import DateTime from "@/components/repeatables/singles/DateTime";
import Content from "@/components/repeatables/structural-content/Content";
import { getProjectById } from "@/db/queries/projects";

type DetailsProps = {
  locale: string;
  projectId: number;
};

function getDateValue(date: Date | string) {
  return date instanceof Date ? date.toISOString().slice(0, 10) : date;
}

export default async function Details({ locale, projectId }: DetailsProps) {
  const [project, t] = await Promise.all([
    getProjectById({ id: projectId, locale }),
    getTranslations("Projects"),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <header>
        <h1>{project.title}</h1>
        {project.shortDescription ? <p>{project.shortDescription}</p> : null}
        {project.startedOn || project.completedOn ? (
          <p>
            {project.startedOn ? (
              <DateTime
                locale={locale}
                mode="date"
                options={{
                  month: "long",
                  year: "numeric",
                }}
                value={getDateValue(project.startedOn)}
              />
            ) : null}
            {project.startedOn && project.completedOn ? " - " : null}
            {project.completedOn ? (
              <DateTime
                locale={locale}
                mode="date"
                options={{
                  month: "long",
                  year: "numeric",
                }}
                value={getDateValue(project.completedOn)}
              />
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
        <section>
          <Content value={project.revision.sourceJson} />
        </section>
      ) : project.overview ? (
        <section>
          <h2>{t("overviewTitle")}</h2>
          <p>{project.overview}</p>
        </section>
      ) : null}
    </article>
  );
}
