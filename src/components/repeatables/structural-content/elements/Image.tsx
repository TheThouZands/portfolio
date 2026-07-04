import {
  getHtmlAttributes,
  type StructuralElementHtmlAttributes,
} from "@/components/repeatables/structural-content/elements/attributes";
import type { StructuralElementProps } from "@/components/repeatables/structural-content/elements/types";

function getAlt(attrs: StructuralElementHtmlAttributes) {
  return typeof attrs.alt === "string" ? attrs.alt : "";
}

export default function Image({ attrs, type }: StructuralElementProps) {
  const htmlAttributes = getHtmlAttributes(attrs);

  return (
    // CMS images can reference arbitrary public asset URLs without Next image config.
    // eslint-disable-next-line @next/next/no-img-element
    <img {...htmlAttributes} alt={getAlt(htmlAttributes)} data-structural-type={type} />
  );
}
