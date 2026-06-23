import { getHtmlAttributes } from "@/components/repeatables/structural-content/elements/attributes";
import type { StructuralElementProps } from "@/components/repeatables/structural-content/elements/types";

export default function Figure({ attrs, children, type }: StructuralElementProps) {
  return (
    <figure {...getHtmlAttributes(attrs)} data-structural-type={type}>
      {children}
    </figure>
  );
}
