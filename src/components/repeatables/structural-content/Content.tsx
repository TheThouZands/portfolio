import type { ReactNode } from "react";
import Element, {
  type StructuralElementAttributes,
} from "@/components/repeatables/structural-content/elements/Element";

type ContentProps = {
  value: unknown;
};

type StructuralRecord = Record<string, unknown>;

function isRecord(value: unknown): value is StructuralRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getType(value: StructuralRecord) {
  return typeof value.type === "string" ? value.type : "object";
}

function getAttrs(value: StructuralRecord): StructuralElementAttributes | undefined {
  return isRecord(value.attrs) ? value.attrs : undefined;
}

function getRecordChildren(value: StructuralRecord, path: string): ReactNode {
  if ("content" in value) {
    return renderValue(value.content, `${path}.content`);
  }

  const entries = Object.entries(value).filter(
    ([key]) => key !== "attrs" && key !== "styles" && key !== "type",
  );

  if (entries.length === 0) {
    return null;
  }

  return entries.map(([key, child]) => (
    <Element key={`${path}.${key}`} type={key}>
      {renderValue(child, `${path}.${key}`)}
    </Element>
  ));
}

function renderValue(value: unknown, path: string): ReactNode {
  if (Array.isArray(value)) {
    return value.map((child, index) => renderValue(child, `${path}.${index}`));
  }

  if (isRecord(value)) {
    if (value.type === "text") {
      return renderValue(value.content, `${path}.content`);
    }

    return (
      <Element attrs={getAttrs(value)} key={path} type={getType(value)}>
        {getRecordChildren(value, path)}
      </Element>
    );
  }

  if (value === null || value === undefined) {
    return <Element key={path} type="empty" />;
  }

  return String(value);
}

export default function Content({ value }: ContentProps) {
  return renderValue(value, "structural-content");
}
