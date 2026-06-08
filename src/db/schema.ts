import {
  bigint,
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  smallserial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { geometry } from "drizzle-orm/pg-core/columns/postgis_extension/geometry";

/** Asset usage extracted from a writer document for validation, rendering, and preloading. */
export type WriterAssetReference = {
  assetId: number;
  blockId?: string;
  role: "cover" | "inline" | "gallery" | "attachment" | "logo" | "screenshot";
};

/** Editable source shape produced by the custom writer before it is compiled to HTML/CSS. */
export type WriterDocument = {
  type: "doc";
  blocks: Record<string, unknown>[];
};

/** Work location modality for experience entries. */
export const locationType = pgEnum("location_type", ["remote", "hybrid", "onsite"]);

/** Publication lifecycle shared by CMS-managed content. */
export const statusCMS = pgEnum("status_cms", ["published", "hidden", "draft"]);

/** Employment relationship used to classify CV experience. */
export const employmentType = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "contract",
  "freelance",
  "internship",
  "volunteer",
]);

/** Categorizes the supporting bullet copy shown under an experience entry. */
export const experienceBulletType = pgEnum("experience_bullet_type", [
  "responsibility",
  "achievement",
  "highlight",
]);

/** Role an uploaded asset plays when attached to a CMS entry. */
export const mediaRole = pgEnum("media_role", [
  "logo",
  "cover",
  "gallery",
  "inline",
  "attachment",
  "screenshot",
]);

/** Access mode for assets stored in Vercel Blob. */
export const blobAccess = pgEnum("blob_access", ["public", "private"]);

/** Existing simple comments table from the starting database. */
export const comments = pgTable("comments", {
  comment: text(),
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "comments_id_seq",
    }),
});

/** Shared asset library backed by Vercel Blob metadata and optional image hints. */
export const mediaAssets = pgTable(
  "media_assets",
  {
    id: smallserial().primaryKey(),
    pathname: text().notNull(),
    url: text().notNull(),
    download_url: text().notNull(),
    access: blobAccess().notNull().default("public"),
    blob_store_id: varchar({ length: 120 }),
    alt_text: text(),
    width: integer(),
    height: integer(),
    size_bytes: bigint({ mode: "number" }),
    content_type: varchar({ length: 100 }).notNull(),
    content_disposition: text(),
    etag: varchar({ length: 160 }),
    focal_x: integer().notNull().default(50),
    focal_y: integer().notNull().default(50),
    uploaded_at: timestamp({ withTimezone: true }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("media_assets_pathname_idx").on(table.pathname),
    uniqueIndex("media_assets_url_idx").on(table.url),
  ],
);

/** Organizations that can be referenced by experience entries and other CMS content. */
export const companies = pgTable(
  "companies",
  {
    id: smallserial().primaryKey(),
    company_name: varchar({ length: 100 }).notNull(),
    slug: varchar({ length: 120 }).notNull(),
    website_url: text(),
    summary: text(),
    logo_asset_id: integer().references(() => mediaAssets.id),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("companies_slug_idx").on(table.slug),
  ],
);

/** Structured CV/job entry rendered by timelines, cards, and detailed experience pages. */
export const experience = pgTable(
  "experience",
  {
    id: smallserial().primaryKey(),
    position_title: varchar({ length: 100 }).notNull(),
    employment_type: employmentType().notNull().default("full_time"),
    is_current: boolean().notNull().default(false),
    company_id: integer().references(() => companies.id).notNull(),
    start_date: date().notNull(),
    end_date: date(),
    location_label: varchar({ length: 120 }),
    location: geometry({ type: "point", mode: "xy", srid: 4326 }),
    location_type: locationType().notNull().default("remote"),
    role_summary: text(),
    company_context: text(),
    sort_order: integer().notNull().default(0),
    status: statusCMS().notNull().default("draft"),
    featured: boolean().notNull().default(false),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("experience_company_id_idx").on(table.company_id),
    index("experience_status_sort_order_idx").on(table.status, table.sort_order),
  ],
);

/** Ordered responsibilities, achievements, or highlights belonging to one experience entry. */
export const experienceBullets = pgTable(
  "experience_bullets",
  {
    id: smallserial().primaryKey(),
    experience_id: integer()
      .references(() => experience.id, { onDelete: "cascade" })
      .notNull(),
    type: experienceBulletType().notNull().default("responsibility"),
    body: text().notNull(),
    sort_order: integer().notNull().default(0),
  },
  (table) => [
    index("experience_bullets_experience_id_idx").on(table.experience_id),
  ],
);

/** Reusable skill/tag vocabulary for filtering and grouping portfolio content. */
export const skills = pgTable(
  "skills",
  {
    id: smallserial().primaryKey(),
    name: varchar({ length: 80 }).notNull(),
    slug: varchar({ length: 100 }).notNull(),
    category: varchar({ length: 80 }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("skills_slug_idx").on(table.slug),
  ],
);

/** Many-to-many link between experience entries and reusable skills. */
export const experienceSkills = pgTable(
  "experience_skills",
  {
    experience_id: integer()
      .references(() => experience.id, { onDelete: "cascade" })
      .notNull(),
    skill_id: integer()
      .references(() => skills.id, { onDelete: "cascade" })
      .notNull(),
    sort_order: integer().notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.experience_id, table.skill_id] }),
    index("experience_skills_skill_id_idx").on(table.skill_id),
  ],
);

/** Many-to-many-ish media attachment table for experience logos, covers, and galleries. */
export const experienceMedia = pgTable(
  "experience_media",
  {
    id: smallserial().primaryKey(),
    experience_id: integer()
      .references(() => experience.id, { onDelete: "cascade" })
      .notNull(),
    media_asset_id: integer()
      .references(() => mediaAssets.id, { onDelete: "cascade" })
      .notNull(),
    role: mediaRole().notNull().default("gallery"),
    caption: text(),
    sort_order: integer().notNull().default(0),
  },
  (table) => [
    index("experience_media_experience_id_idx").on(table.experience_id),
    index("experience_media_media_asset_id_idx").on(table.media_asset_id),
  ],
);

/** Blog/article metadata; the body itself lives in revision records. */
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: smallserial().primaryKey(),
    title: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 180 }).notNull(),
    excerpt: text(),
    cover_asset_id: integer().references(() => mediaAssets.id),
    status: statusCMS().notNull().default("draft"),
    published_at: timestamp({ withTimezone: true }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_status_published_at_idx").on(table.status, table.published_at),
  ],
);

/** Versioned writer output for a blog post, keeping editable source plus compiled HTML/CSS. */
export const blogPostRevisions = pgTable(
  "blog_post_revisions",
  {
    id: smallserial().primaryKey(),
    blog_post_id: integer()
      .references(() => blogPosts.id, { onDelete: "cascade" })
      .notNull(),
    version: integer().notNull().default(1),
    is_current: boolean().notNull().default(false),
    source_json: jsonb().$type<WriterDocument>().notNull(),
    rendered_html: text().notNull(),
    rendered_css: text(),
    asset_manifest: jsonb().$type<WriterAssetReference[]>().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    compiled_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("blog_post_revisions_blog_post_id_idx").on(table.blog_post_id),
    uniqueIndex("blog_post_revisions_post_version_idx").on(table.blog_post_id, table.version),
  ],
);

/** Explicit media placements extracted from a specific blog revision and writer block. */
export const blogPostAssets = pgTable(
  "blog_post_assets",
  {
    id: smallserial().primaryKey(),
    blog_post_revision_id: integer()
      .references(() => blogPostRevisions.id, { onDelete: "cascade" })
      .notNull(),
    media_asset_id: integer()
      .references(() => mediaAssets.id, { onDelete: "cascade" })
      .notNull(),
    block_id: varchar({ length: 120 }),
    role: mediaRole().notNull().default("inline"),
    sort_order: integer().notNull().default(0),
  },
  (table) => [
    index("blog_post_assets_revision_id_idx").on(table.blog_post_revision_id),
    index("blog_post_assets_media_asset_id_idx").on(table.media_asset_id),
  ],
);
