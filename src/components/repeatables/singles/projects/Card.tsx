import Link from "next/link";
import DateTime from "@/components/repeatables/singles/DateTime";

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
  return date instanceof Date ? date.toISOString().slice(0, 10) : date;
}

export default function Card({
  locale,
  project,
}: CardProps) {
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
        {project.startedOn || project.completedOn ? (
          <p>
            {project.startedOn ? (
              <DateTime
                locale={locale}
                mode="date"
                options={{
                  month: "short",
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
                  month: "short",
                  year: "numeric",
                }}
                value={getDateValue(project.completedOn)}
              />
            ) : null}
          </p>
        ) : null}
      </header>
      {project.shortDescription ? <p>{project.shortDescription}</p> : null}
    </article>
  );
}
