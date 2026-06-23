import type { ImgHTMLAttributes } from "react";

export type StructuralElementAttributes = Record<string, unknown>;

type StructuralElementAttributeValue = boolean | number | string;
export type StructuralElementHtmlAttributes = ImgHTMLAttributes<HTMLImageElement> &
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

export function getHtmlAttributes(
  attrs?: StructuralElementAttributes,
): StructuralElementHtmlAttributes {
  const htmlAttributes: StructuralElementHtmlAttributes = {};

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
