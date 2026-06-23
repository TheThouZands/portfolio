import type { ReactNode } from "react";
import type { StructuralElementAttributes } from "@/components/repeatables/structural-content/elements/attributes";

export type StructuralElementProps = {
  attrs?: StructuralElementAttributes;
  children?: ReactNode;
  type: string;
};

export type StructuralElementComponent = (
  props: StructuralElementProps,
) => ReactNode;
