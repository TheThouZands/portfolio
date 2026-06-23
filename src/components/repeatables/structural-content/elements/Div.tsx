import { getHtmlAttributes } from "@/components/repeatables/structural-content/elements/attributes";
import type { StructuralElementProps } from "@/components/repeatables/structural-content/elements/types";

export default function Div({ attrs, children, type }: StructuralElementProps) {
  return (
    <div {...getHtmlAttributes(attrs)} data-structural-type={type}>
      {children}
    </div>
  );
}
