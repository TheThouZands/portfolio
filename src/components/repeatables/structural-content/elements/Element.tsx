import type { ReactNode } from "react";

type ElementProps = {
  children?: ReactNode;
  type: string;
};

export default function Element({ children, type }: ElementProps) {
  return <div data-structural-type={type}>{children}</div>;
}
