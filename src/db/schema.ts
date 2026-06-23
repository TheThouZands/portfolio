import { sql } from "drizzle-orm";
import {
  type AnyPgColumn,
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
import type { StructuralContentDocument } from "../cms/structural-content/types";

/** Asset usage extracted from structural content for validation, rendering, and preloading. */
export type StructuralContentAssetReference = {
  assetId: number;
  blockId?: string;
  role: "cover" | "inline" | "gallery" | "attachment" | "logo" | "screenshot";
};

/** Captured request details from the fake WordPress installer. */
export type WpHoneypotPayload = {
  query: Record<string, string | string[]>;
  body: Record<string, unknown>;
  headers: Record<string, string>;
};

/** Work location modality for experience entries. */
export const locationType = pgEnum("location_type", ["remote", "hybrid", "onsite"]);

/** Publication lifecycle shared by CMS-managed content. */
export const statusCMS = pgEnum("status_cms", ["published", "hidden", "draft", "testing"]);

/** Common identity types for portfolio objects that can be referenced by rich content. */
export const contentEntityType = pgEnum("content_entity_type", [
  "blog_post",
  "company",
  "experience",
  "project",
  "skill",
]);

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

/** Better Auth user identity. Login methods can be layered onto this later. */
export const user = pgTable(
  "user",
  {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("user_email_idx").on(table.email),
  ],
);

/** Better Auth database-backed session source of truth. */
export const session = pgTable(
  "session",
  {
    id: text().primaryKey(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    token: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("session_token_idx").on(table.token),
    index("session_user_id_idx").on(table.userId),
  ],
);

/** Better Auth provider or credential account record. */
export const account = pgTable(
  "account",
  {
    id: text().primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: true,
    }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("account_user_id_idx").on(table.userId),
  ],
);

/** Better Auth short-lived verification values for flows such as email checks. */
export const verification = pgTable(
  "verification",
  {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("verification_identifier_idx").on(table.identifier),
  ],
);

/** Rate-limited capture of /wp-admin/install.php probes and submitted payloads. */
export const wpHoneypotLogs = pgTable(
  "wp_honeypot_logs",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "wp_honeypot_logs_id_seq",
    }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    frontend: varchar({ length: 80 }).notNull().default("portfolio"),
    method: varchar({ length: 12 }).notNull(),
    path: text().notNull(),
    query_string: text(),
    step: varchar({ length: 24 }),
    route_state: varchar({ length: 48 }).notNull(),
    status_code: integer().notNull(),
    ip_address: varchar({ length: 160 }),
    user_agent: text(),
    referer: text(),
    accept_language: text(),
    content_type: text(),
    raw_body: text(),
    payload: jsonb().$type<WpHoneypotPayload>().notNull(),
  },
  (table) => [
    index("wp_honeypot_logs_frontend_created_at_idx").on(
      table.frontend,
      table.created_at,
    ),
    index("wp_honeypot_logs_ip_created_at_idx").on(
      table.ip_address,
      table.created_at,
    ),
  ],
);

/** Shared identity row for content that can be referenced across CMS surfaces. */
export const contentEntities = pgTable(
  "content_entities",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity({
      name: "content_entities_id_seq",
    }),
    type: contentEntityType().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("content_entities_type_idx").on(table.type),
  ],
);

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

/** Localized alt text and discoverability copy for reusable media assets. */
export const mediaAssetTranslations = pgTable(
  "media_asset_translations",
  {
    media_asset_id: integer()
      .references(() => mediaAssets.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    alt_text: text(),
  },
  (table) => [
    primaryKey({ columns: [table.media_asset_id, table.locale] }),
    index("media_asset_translations_locale_idx").on(table.locale),
  ],
);

/** Organizations that can be referenced by experience entries and other CMS content. */
export const companies = pgTable(
  "companies",
  {
    id: smallserial().primaryKey(),
    entity_id: integer()
      .references(() => contentEntities.id, { onDelete: "cascade" })
      .notNull(),
    company_name: varchar({ length: 100 }).notNull(),
    slug: varchar({ length: 120 }).notNull(),
    website_url: text(),
    summary: text(),
    logo_asset_id: integer().references(() => mediaAssets.id),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("companies_entity_id_idx").on(table.entity_id),
    uniqueIndex("companies_slug_idx").on(table.slug),
  ],
);

/** Locale-specific organization display copy while keeping the company identity shared. */
export const companyTranslations = pgTable(
  "company_translations",
  {
    company_id: integer()
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    company_name: varchar({ length: 100 }).notNull(),
    slug: varchar({ length: 120 }).notNull(),
    summary: text(),
  },
  (table) => [
    primaryKey({ columns: [table.company_id, table.locale] }),
    uniqueIndex("company_translations_locale_slug_idx").on(table.locale, table.slug),
  ],
);

/** Structured CV/job entry rendered by timelines, cards, and detailed experience pages. */
export const experience = pgTable(
  "experience",
  {
    id: smallserial().primaryKey(),
    entity_id: integer()
      .references(() => contentEntities.id, { onDelete: "cascade" })
      .notNull(),
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
    uniqueIndex("experience_entity_id_idx").on(table.entity_id),
    index("experience_company_id_idx").on(table.company_id),
    index("experience_status_sort_order_idx").on(table.status, table.sort_order),
  ],
);

/** Locale-specific CV copy for an experience entry. */
export const experienceTranslations = pgTable(
  "experience_translations",
  {
    experience_id: integer()
      .references(() => experience.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    position_title: varchar({ length: 100 }).notNull(),
    location_label: varchar({ length: 120 }),
    role_summary: text(),
    company_context: text(),
  },
  (table) => [
    primaryKey({ columns: [table.experience_id, table.locale] }),
    index("experience_translations_locale_idx").on(table.locale),
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

/** Locale-specific body text for an ordered experience bullet. */
export const experienceBulletTranslations = pgTable(
  "experience_bullet_translations",
  {
    experience_bullet_id: integer()
      .references(() => experienceBullets.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    body: text().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.experience_bullet_id, table.locale] }),
    index("experience_bullet_translations_locale_idx").on(table.locale),
  ],
);

/** Reusable skill/tag vocabulary for filtering and grouping portfolio content. */
export const skills = pgTable(
  "skills",
  {
    id: smallserial().primaryKey(),
    entity_id: integer()
      .references(() => contentEntities.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar({ length: 80 }).notNull(),
    slug: varchar({ length: 100 }).notNull(),
    category: varchar({ length: 80 }),
    description: text(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("skills_entity_id_idx").on(table.entity_id),
    uniqueIndex("skills_slug_idx").on(table.slug),
  ],
);

/** Locale-specific display labels for reusable skills. */
export const skillTranslations = pgTable(
  "skill_translations",
  {
    skill_id: integer()
      .references(() => skills.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    name: varchar({ length: 80 }).notNull(),
    category_label: varchar({ length: 80 }),
    description: text(),
  },
  (table) => [
    primaryKey({ columns: [table.skill_id, table.locale] }),
    index("skill_translations_locale_idx").on(table.locale),
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

/** Locale-specific caption copy for experience media attachments. */
export const experienceMediaTranslations = pgTable(
  "experience_media_translations",
  {
    experience_media_id: integer()
      .references(() => experienceMedia.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    caption: text(),
  },
  (table) => [
    primaryKey({ columns: [table.experience_media_id, table.locale] }),
    index("experience_media_translations_locale_idx").on(table.locale),
  ],
);

/** Portfolio project/case-study metadata shown in project lists and detail pages. */
export const projects = pgTable(
  "projects",
  {
    id: smallserial().primaryKey(),
    entity_id: integer()
      .references(() => contentEntities.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar({ length: 160 }).notNull(),
    short_description: text(),
    overview: text(),
    cover_asset_id: integer().references(() => mediaAssets.id),
    status: statusCMS().notNull().default("draft"),
    featured: boolean().notNull().default(false),
    started_on: date(),
    completed_on: date(),
    sort_order: integer().notNull().default(0),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("projects_entity_id_idx").on(table.entity_id),
    index("projects_status_sort_order_idx").on(table.status, table.sort_order),
    index("projects_featured_status_sort_order_idx").on(
      table.featured,
      table.status,
      table.sort_order,
    ),
  ],
);

/** Locale-specific project metadata while keeping shared project identity stable. */
export const projectTranslations = pgTable(
  "project_translations",
  {
    project_id: integer()
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    title: varchar({ length: 160 }).notNull(),
    short_description: text(),
    overview: text(),
  },
  (table) => [
    primaryKey({ columns: [table.project_id, table.locale] }),
  ],
);

/** Ordered project highlights rendered as quick evidence before long-form content. */
export const projectHighlights = pgTable(
  "project_highlights",
  {
    id: smallserial().primaryKey(),
    project_id: integer()
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    body: text().notNull(),
    sort_order: integer().notNull().default(0),
  },
  (table) => [
    index("project_highlights_project_id_idx").on(table.project_id),
  ],
);

/** Locale-specific body text for an ordered project highlight. */
export const projectHighlightTranslations = pgTable(
  "project_highlight_translations",
  {
    project_highlight_id: integer()
      .references(() => projectHighlights.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    body: text().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.project_highlight_id, table.locale] }),
    index("project_highlight_translations_locale_idx").on(table.locale),
  ],
);

/** Many-to-many link between portfolio projects and reusable skills. */
export const projectSkills = pgTable(
  "project_skills",
  {
    project_id: integer()
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    skill_id: integer()
      .references(() => skills.id, { onDelete: "cascade" })
      .notNull(),
    sort_order: integer().notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.project_id, table.skill_id] }),
    index("project_skills_skill_id_idx").on(table.skill_id),
  ],
);

/** Versioned project narrative content, storing editable source plus rendered text-only output. */
export const projectRevisions = pgTable(
  "project_revisions",
  {
    id: smallserial().primaryKey(),
    project_id: integer()
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull().default("en"),
    version: integer().notNull().default(1),
    is_current: boolean().notNull().default(false),
    source_json: jsonb().$type<StructuralContentDocument>().notNull(),
    rendered_text: text().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    compiled_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("project_revisions_project_id_idx").on(table.project_id),
    uniqueIndex("project_revisions_project_locale_version_idx").on(
      table.project_id,
      table.locale,
      table.version,
    ),
    // At most one current revision per project + locale.
    uniqueIndex("project_revisions_current_idx")
      .on(table.project_id, table.locale)
      .where(sql`${table.is_current}`),
  ],
);

/** Blog/article metadata; the body itself lives in revision records. */
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: smallserial().primaryKey(),
    entity_id: integer()
      .references(() => contentEntities.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 180 }).notNull(),
    excerpt: text(),
    cover_asset_id: integer().references(() => mediaAssets.id),
    status: statusCMS().notNull().default("draft"),
    featured: boolean().notNull().default(false),
    published_at: timestamp({ withTimezone: true }),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("blog_posts_entity_id_idx").on(table.entity_id),
    uniqueIndex("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_featured_status_published_at_idx").on(
      table.featured,
      table.status,
      table.published_at,
    ),
    index("blog_posts_status_published_at_idx").on(table.status, table.published_at),
  ],
);

/** Reader comments attached to a blog post, optionally nested as replies. */
export const comments = pgTable(
  "comments",
  {
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "comments_id_seq",
      }),
    blog_post_id: integer()
      .references(() => blogPosts.id, { onDelete: "cascade" })
      .notNull(),
    parent_comment_id: bigint({ mode: "number" }).references(
      (): AnyPgColumn => comments.id,
      { onDelete: "cascade" },
    ),
    body: text("comment").notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("comments_blog_post_created_at_idx").on(
      table.blog_post_id,
      table.created_at,
    ),
    index("comments_parent_comment_created_at_idx").on(
      table.parent_comment_id,
      table.created_at,
    ),
  ],
);

/** Locale-specific blog metadata; rendered body content lives in localized revisions. */
export const blogPostTranslations = pgTable(
  "blog_post_translations",
  {
    blog_post_id: integer()
      .references(() => blogPosts.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull(),
    title: varchar({ length: 160 }).notNull(),
    slug: varchar({ length: 180 }).notNull(),
    excerpt: text(),
  },
  (table) => [
    primaryKey({ columns: [table.blog_post_id, table.locale] }),
    uniqueIndex("blog_post_translations_locale_slug_idx").on(table.locale, table.slug),
    index("blog_post_translations_slug_idx").on(table.slug),
  ],
);

/** Versioned structural content for a blog post, keeping editable source plus extracted assets. */
export const blogPostRevisions = pgTable(
  "blog_post_revisions",
  {
    id: smallserial().primaryKey(),
    blog_post_id: integer()
      .references(() => blogPosts.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar({ length: 16 }).notNull().default("en"),
    version: integer().notNull().default(1),
    is_current: boolean().notNull().default(false),
    source_json: jsonb().$type<StructuralContentDocument>().notNull(),
    asset_manifest: jsonb().$type<StructuralContentAssetReference[]>().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    compiled_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("blog_post_revisions_blog_post_id_idx").on(table.blog_post_id),
    uniqueIndex("blog_post_revisions_post_locale_version_idx").on(
      table.blog_post_id,
      table.locale,
      table.version,
    ),
    // At most one current revision per blog post + locale.
    uniqueIndex("blog_post_revisions_current_idx")
      .on(table.blog_post_id, table.locale)
      .where(sql`${table.is_current}`),
  ],
);

/** Entity references extracted from rendered blog writer content. */
export const blogPostMentions = pgTable(
  "blog_post_mentions",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity({
      name: "blog_post_mentions_id_seq",
    }),
    blog_post_revision_id: integer()
      .references(() => blogPostRevisions.id, { onDelete: "cascade" })
      .notNull(),
    mentioned_entity_id: integer()
      .references(() => contentEntities.id, { onDelete: "cascade" })
      .notNull(),
    source_block_id: varchar({ length: 120 }),
    sort_order: integer().notNull().default(0),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("blog_post_mentions_revision_id_idx").on(table.blog_post_revision_id),
    index("blog_post_mentions_entity_id_idx").on(table.mentioned_entity_id),
    uniqueIndex("blog_post_mentions_revision_entity_idx").on(
      table.blog_post_revision_id,
      table.mentioned_entity_id,
    ),
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
