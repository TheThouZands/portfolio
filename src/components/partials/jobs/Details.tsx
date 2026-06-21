import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import JobDetailsView from "@/components/repeatables/singles/jobs/Details";
import { getExperienceById } from "@/db/queries/experience";

type DetailsProps = {
  jobId: number;
  locale: string;
};

export default async function Details({ jobId, locale }: DetailsProps) {
  const [experienceT, job] = await Promise.all([
    getTranslations("Experience"),
    getExperienceById({ id: jobId, locale }),
  ]);

  if (!job) {
    notFound();
  }

  return (
    <JobDetailsView
      job={job}
      labels={{
        companyContextTitle: experienceT("companyContextTitle"),
        current: experienceT("current"),
        highlightsTitle: experienceT("highlightsTitle"),
        mediaTitle: experienceT("mediaTitle"),
        overviewTitle: experienceT("overviewTitle"),
        skillsTitle: experienceT("skillsTitle"),
      }}
      locale={locale}
    />
  );
}
