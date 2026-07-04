import Div from "@/components/repeatables/structural-content/elements/Div";
import Figure from "@/components/repeatables/structural-content/elements/Figure";
import Image from "@/components/repeatables/structural-content/elements/Image";
import Paragraph from "@/components/repeatables/structural-content/elements/Paragraph";
import type {
  StructuralElementComponent,
  StructuralElementProps,
} from "@/components/repeatables/structural-content/elements/types";

export type { StructuralElementAttributes } from "@/components/repeatables/structural-content/elements/attributes";

const ELEMENTS: Record<string, StructuralElementComponent> = {
  div: Div,
  figure: Figure,
  img: Image,
  p: Paragraph,
};

export default function Element({ attrs, children, type }: StructuralElementProps) {
  const Component = ELEMENTS[type] ?? Div;

  return <Component attrs={attrs} type={type}>{children}</Component>;
}
