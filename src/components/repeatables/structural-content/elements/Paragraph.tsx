import { getHtmlAttributes } from "@/components/repeatables/structural-content/elements/attributes";
import type { StructuralElementProps } from "@/components/repeatables/structural-content/elements/types";

export default function Paragraph({ attrs, children, type }: StructuralElementProps) {
  return (
    <p {...getHtmlAttributes(attrs)} data-structural-type={type}>
      {children}
    </p>
  );
}
