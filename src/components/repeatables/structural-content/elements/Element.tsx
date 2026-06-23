import type { HTMLAttributes, ReactNode } from "react";

type ElementProps = {
  attrs?: StructuralElementAttributes;
  children?: ReactNode;
  type: string;
};

export type StructuralElementAttributes = Record<string, unknown>;

type StructuralElementAttributeValue = boolean | number | string;
type ElementHtmlAttributes = HTMLAttributes<HTMLDivElement> &
  Record<string, StructuralElementAttributeValue>;

const ATTRIBUTE_NAME_OVERRIDES: Record<string, string> = {
  class: "className",
  className: "className",
  for: "htmlFor",
  htmlFor: "htmlFor",
  readonly: "readOnly",
  readOnly: "readOnly",
  tabindex: "tabIndex",
  tabIndex: "tabIndex",
};

function isAttributeValue(value: unknown): value is StructuralElementAttributeValue {
  return (
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  );
}

function isAttributeName(name: string) {
  return /^[A-Za-z_:][\w:.-]*$/.test(name);
}

function getAttributeName(name: string) {
  return ATTRIBUTE_NAME_OVERRIDES[name] ?? name.toLowerCase();
}

function shouldRenderAttribute(
  name: string,
  value: unknown,
): value is StructuralElementAttributeValue {
  return (
    isAttributeValue(value) &&
    isAttributeName(name) &&
    name !== "children" &&
    name !== "dangerouslySetInnerHTML" &&
    name !== "key" &&
    name !== "ref" &&
    name !== "style" &&
    !name.toLowerCase().startsWith("on")
  );
}

function getHtmlAttributes(attrs?: StructuralElementAttributes): ElementHtmlAttributes {
  const htmlAttributes: ElementHtmlAttributes = {};

  if (!attrs) {
    return htmlAttributes;
  }

  for (const [name, value] of Object.entries(attrs)) {
    if (shouldRenderAttribute(name, value)) {
      htmlAttributes[getAttributeName(name)] = value;
    }
  }

  return htmlAttributes;
}

export default function Element({ attrs, children, type }: ElementProps) {
  return (
    <div {...getHtmlAttributes(attrs)} data-structural-type={type}>
      {children}
    </div>
  );
}
