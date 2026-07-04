import {
  HeaderAccountIsland,
  type HeaderAccountLabels,
} from "@/components/auth/HeaderAccountIsland";

type SiteHeaderProps = {
  labels: HeaderAccountLabels;
  locale: string;
};

export function SiteHeader({ labels, locale }: SiteHeaderProps) {
  return (
    <header>
      <HeaderAccountIsland labels={labels} locale={locale} />
    </header>
  );
}
