import Link from "next/link";

import {
  HeaderAccountIsland,
  type HeaderAccountLabels,
} from "@/components/auth/HeaderAccountIsland";

type SiteHeaderLabels = HeaderAccountLabels & {
  blog: string;
  brand: string;
  experience: string;
  home: string;
  primaryNavigation: string;
  projects: string;
  skills: string;
};

type SiteHeaderProps = {
  labels: SiteHeaderLabels;
  locale: string;
};

export function SiteHeader({ labels, locale }: SiteHeaderProps) {
  const localeRoot = `/${locale}`;

  return (
    <header>
      <nav aria-label={labels.primaryNavigation}>
        <Link href={localeRoot}>{labels.brand}</Link>
        <Link href={localeRoot}>{labels.home}</Link>
        <Link href={`${localeRoot}/experience`}>{labels.experience}</Link>
        <Link href={`${localeRoot}/projects`}>{labels.projects}</Link>
        <Link href={`${localeRoot}/skills`}>{labels.skills}</Link>
        <Link href={`${localeRoot}/blog`}>{labels.blog}</Link>
        <HeaderAccountIsland labels={labels} locale={locale} />
      </nav>
    </header>
  );
}
