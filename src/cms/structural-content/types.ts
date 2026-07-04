/**
 * Canonical JSON contract for structural content revisions.
 *
 * This is intentionally an HTML-shaped AST, not rendered HTML. Text stays escaped by
 * React, attrs are allowlisted, and `styles` are token data for generated classes.
 */
export const structuralContentSchemaVersion = 1;

export const structuralHtmlElementTypes = [
  "a",
  "abbr",
  "article",
  "aside",
  "audio",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "br",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "img",
  "ins",
  "kbd",
  "li",
  "mark",
  "nav",
  "ol",
  "p",
  "picture",
  "pre",
  "q",
  "s",
  "samp",
  "section",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
] as const;

export const structuralVoidElementTypes = [
  "br",
  "col",
  "hr",
  "img",
  "source",
  "track",
  "wbr",
] as const;

export type StructuralHtmlElementType = (typeof structuralHtmlElementTypes)[number];
export type StructuralVoidElementType = (typeof structuralVoidElementTypes)[number];
export type StructuralParentElementType = Exclude<
  StructuralHtmlElementType,
  StructuralVoidElementType
>;

export type StructuralAttributeValue = boolean | number | string;

export type StructuralGlobalAttributes = {
  aria?: Record<string, StructuralAttributeValue>;
  data?: Record<string, StructuralAttributeValue>;
  dir?: "auto" | "ltr" | "rtl";
  hidden?: boolean;
  id?: string;
  lang?: string;
  role?: string;
  tabIndex?: number;
  title?: string;
};

export type StructuralAnchorAttributes = {
  download?: boolean | string;
  href?: string;
  rel?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
};

export type StructuralCitationAttributes = {
  cite?: string;
};

export type StructuralDataAttributes = {
  value?: string;
};

export type StructuralImageAttributes = {
  alt: string;
  assetId?: number;
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "auto" | "high" | "low";
  height?: number;
  loading?: "eager" | "lazy";
  src?: string;
  width?: number;
};

export type StructuralMediaAttributes = {
  assetId?: number;
  autoplay?: boolean;
  controls?: boolean;
  height?: number;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  preload?: "auto" | "metadata" | "none";
  src?: string;
  width?: number;
};

export type StructuralListAttributes = {
  reversed?: boolean;
  start?: number;
  type?: "1" | "A" | "a" | "I" | "i";
};

export type StructuralSourceAttributes = {
  height?: number;
  media?: string;
  sizes?: string;
  src?: string;
  srcSet?: string;
  type?: string;
  width?: number;
};

export type StructuralTableCellAttributes = {
  colSpan?: number;
  headers?: string;
  rowSpan?: number;
  scope?: "col" | "colgroup" | "row" | "rowgroup";
};

export type StructuralTimeAttributes = {
  dateTime?: string;
};

export type StructuralTrackAttributes = {
  default?: boolean;
  kind?: "captions" | "chapters" | "descriptions" | "metadata" | "subtitles";
  label?: string;
  src: string;
  srcLang?: string;
};

type NoElementSpecificAttributes = Record<never, never>;

export type StructuralElementSpecificAttributes<Type extends StructuralHtmlElementType> =
  Type extends "a"
    ? StructuralAnchorAttributes
    : Type extends "blockquote" | "del" | "ins" | "q"
      ? StructuralCitationAttributes
      : Type extends "data"
        ? StructuralDataAttributes
        : Type extends "img"
          ? StructuralImageAttributes
          : Type extends "audio" | "video"
            ? StructuralMediaAttributes
            : Type extends "ol"
              ? StructuralListAttributes
              : Type extends "source"
                ? StructuralSourceAttributes
                : Type extends "td" | "th"
                  ? StructuralTableCellAttributes
                  : Type extends "time"
                    ? StructuralTimeAttributes
                    : Type extends "track"
                      ? StructuralTrackAttributes
                      : NoElementSpecificAttributes;

export type StructuralElementAttributes<Type extends StructuralHtmlElementType> =
  StructuralGlobalAttributes & StructuralElementSpecificAttributes<Type>;

export type StructuralBreakpoint = "lg" | "md" | "sm" | "xl";
export type StructuralResponsiveValue<Value> =
  | Value
  | Partial<Record<"base" | StructuralBreakpoint, Value>>;

export type StructuralSpaceToken =
  | "0"
  | "2xl"
  | "2xs"
  | "3xl"
  | "3xs"
  | "4xl"
  | "lg"
  | "md"
  | "sm"
  | "xl"
  | "xs";

export type StructuralColorToken =
  | "accent"
  | "accent-contrast"
  | "border"
  | "canvas"
  | "current"
  | "danger"
  | "inherit"
  | "muted"
  | "raised"
  | "success"
  | "surface"
  | "text"
  | "text-muted"
  | "warning";

export type StructuralSizeToken =
  | "2xl"
  | "2xs"
  | "3xl"
  | "auto"
  | "content"
  | "fit"
  | "full"
  | "lg"
  | "md"
  | "screen"
  | "sm"
  | "xl"
  | "xs";

export type StructuralStyles = {
  alignItems?: StructuralResponsiveValue<"baseline" | "center" | "end" | "start" | "stretch">;
  aspectRatio?: StructuralResponsiveValue<"1 / 1" | "16 / 9" | "21 / 9" | "3 / 2" | "4 / 3">;
  at?: Partial<Record<StructuralBreakpoint, StructuralStyles>>;
  background?: StructuralResponsiveValue<StructuralColorToken>;
  borderColor?: StructuralResponsiveValue<StructuralColorToken>;
  borderWidth?: StructuralResponsiveValue<"0" | "1" | "2">;
  color?: StructuralResponsiveValue<StructuralColorToken>;
  columnGap?: StructuralResponsiveValue<StructuralSpaceToken>;
  columns?: StructuralResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 12>;
  container?: StructuralResponsiveValue<"content" | "full" | "narrow" | "none" | "wide">;
  display?: StructuralResponsiveValue<
    "block" | "contents" | "flex" | "grid" | "inline" | "inline-block" | "none"
  >;
  gap?: StructuralResponsiveValue<StructuralSpaceToken>;
  gridTemplate?: StructuralResponsiveValue<"auto" | "sidebar-left" | "sidebar-right" | "split">;
  justifyContent?: StructuralResponsiveValue<
    "between" | "center" | "end" | "evenly" | "start" | "stretch"
  >;
  layout?: StructuralResponsiveValue<"center" | "cluster" | "columns" | "grid" | "stack">;
  marginBlock?: StructuralResponsiveValue<StructuralSpaceToken>;
  marginInline?: StructuralResponsiveValue<StructuralSpaceToken>;
  maxWidth?: StructuralResponsiveValue<StructuralSizeToken>;
  minHeight?: StructuralResponsiveValue<StructuralSizeToken>;
  objectFit?: StructuralResponsiveValue<"contain" | "cover" | "fill" | "none" | "scale-down">;
  overflow?: StructuralResponsiveValue<"auto" | "clip" | "hidden" | "visible">;
  padding?: StructuralResponsiveValue<StructuralSpaceToken>;
  paddingBlock?: StructuralResponsiveValue<StructuralSpaceToken>;
  paddingInline?: StructuralResponsiveValue<StructuralSpaceToken>;
  radius?: StructuralResponsiveValue<"full" | "lg" | "md" | "none" | "sm" | "xs">;
  rowGap?: StructuralResponsiveValue<StructuralSpaceToken>;
  shadow?: StructuralResponsiveValue<"lg" | "md" | "none" | "sm">;
  textAlign?: StructuralResponsiveValue<"center" | "end" | "justify" | "start">;
  textStyle?: StructuralResponsiveValue<"body" | "caption" | "display" | "eyebrow" | "lead">;
  width?: StructuralResponsiveValue<StructuralSizeToken>;
};

export type StructuralTextNode = {
  content: string;
  type: "text";
};

type StructuralBaseElement<Type extends StructuralHtmlElementType> = {
  attrs?: StructuralElementAttributes<Type>;
  styles?: StructuralStyles;
  type: Type;
};

export type StructuralParentElement = StructuralBaseElement<StructuralParentElementType> & {
  content: StructuralContent;
};

export type StructuralImageElement = Omit<StructuralBaseElement<"img">, "attrs"> & {
  attrs: StructuralElementAttributes<"img">;
  content?: never;
};

export type StructuralTrackElement = Omit<StructuralBaseElement<"track">, "attrs"> & {
  attrs: StructuralElementAttributes<"track">;
  content?: never;
};

export type StructuralOtherVoidElementType = Exclude<
  StructuralVoidElementType,
  "img" | "track"
>;

export type StructuralOtherVoidElement =
  StructuralBaseElement<StructuralOtherVoidElementType> & {
    content?: never;
  };

export type StructuralVoidElement =
  | StructuralImageElement
  | StructuralOtherVoidElement
  | StructuralTrackElement;

export type StructuralRawHtmlFrameSandboxToken =
  | "allow-downloads"
  | "allow-forms"
  | "allow-modals"
  | "allow-popups"
  | "allow-popups-to-escape-sandbox"
  | "allow-presentation"
  | "allow-same-origin"
  | "allow-scripts";

export type StructuralRawHtmlFrame = {
  attrs: StructuralGlobalAttributes & {
    sandbox?: StructuralRawHtmlFrameSandboxToken[];
    title: string;
  };
  content: string;
  styles?: StructuralStyles;
  type: "raw-html-frame";
};

export type StructuralElement =
  | StructuralParentElement
  | StructuralRawHtmlFrame
  | StructuralTextNode
  | StructuralVoidElement;

export type StructuralContent = StructuralElement | StructuralElement[];

export type StructuralContentDocument = {
  content: StructuralContent;
  type: "structural-content";
  version: typeof structuralContentSchemaVersion;
};
