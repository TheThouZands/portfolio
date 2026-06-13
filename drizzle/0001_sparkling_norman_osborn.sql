CREATE EXTENSION IF NOT EXISTS postgis;--> statement-breakpoint
CREATE TYPE "public"."blob_access" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('full_time', 'part_time', 'contract', 'freelance', 'internship', 'volunteer');--> statement-breakpoint
CREATE TYPE "public"."experience_bullet_type" AS ENUM('responsibility', 'achievement', 'highlight');--> statement-breakpoint
CREATE TYPE "public"."location_type" AS ENUM('remote', 'hybrid', 'onsite');--> statement-breakpoint
CREATE TYPE "public"."media_role" AS ENUM('logo', 'cover', 'gallery', 'inline', 'attachment', 'screenshot');--> statement-breakpoint
CREATE TYPE "public"."status_cms" AS ENUM('published', 'hidden', 'draft');--> statement-breakpoint
CREATE TABLE "blog_post_assets" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"blog_post_revision_id" integer NOT NULL,
	"media_asset_id" integer NOT NULL,
	"block_id" varchar(120),
	"role" "media_role" DEFAULT 'inline' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_post_revisions" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"blog_post_id" integer NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"source_json" jsonb NOT NULL,
	"rendered_html" text NOT NULL,
	"rendered_css" text,
	"asset_manifest" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"compiled_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"title" varchar(160) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"excerpt" text,
	"cover_asset_id" integer,
	"status" "status_cms" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"company_name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"website_url" text,
	"summary" text,
	"logo_asset_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"position_title" varchar(100) NOT NULL,
	"employment_type" "employment_type" DEFAULT 'full_time' NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"company_id" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"location_label" varchar(120),
	"location" geometry(point),
	"location_type" "location_type" DEFAULT 'remote' NOT NULL,
	"role_summary" text,
	"company_context" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"status" "status_cms" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_bullets" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"experience_id" integer NOT NULL,
	"type" "experience_bullet_type" DEFAULT 'responsibility' NOT NULL,
	"body" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_media" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"experience_id" integer NOT NULL,
	"media_asset_id" integer NOT NULL,
	"role" "media_role" DEFAULT 'gallery' NOT NULL,
	"caption" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_skills" (
	"experience_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "experience_skills_experience_id_skill_id_pk" PRIMARY KEY("experience_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"pathname" text NOT NULL,
	"url" text NOT NULL,
	"download_url" text NOT NULL,
	"access" "blob_access" DEFAULT 'public' NOT NULL,
	"blob_store_id" varchar(120),
	"alt_text" text,
	"width" integer,
	"height" integer,
	"size_bytes" bigint,
	"content_type" varchar(100) NOT NULL,
	"content_disposition" text,
	"etag" varchar(160),
	"focal_x" integer DEFAULT 50 NOT NULL,
	"focal_y" integer DEFAULT 50 NOT NULL,
	"uploaded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(80) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"category" varchar(80),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_post_assets" ADD CONSTRAINT "blog_post_assets_blog_post_revision_id_blog_post_revisions_id_fk" FOREIGN KEY ("blog_post_revision_id") REFERENCES "public"."blog_post_revisions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_assets" ADD CONSTRAINT "blog_post_assets_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_revisions" ADD CONSTRAINT "blog_post_revisions_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_asset_id_media_assets_id_fk" FOREIGN KEY ("cover_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_logo_asset_id_media_assets_id_fk" FOREIGN KEY ("logo_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_bullets" ADD CONSTRAINT "experience_bullets_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_media" ADD CONSTRAINT "experience_media_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_media" ADD CONSTRAINT "experience_media_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_skills" ADD CONSTRAINT "experience_skills_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_skills" ADD CONSTRAINT "experience_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blog_post_assets_revision_id_idx" ON "blog_post_assets" USING btree ("blog_post_revision_id");--> statement-breakpoint
CREATE INDEX "blog_post_assets_media_asset_id_idx" ON "blog_post_assets" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "blog_post_revisions_blog_post_id_idx" ON "blog_post_revisions" USING btree ("blog_post_id");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_post_revisions_post_version_idx" ON "blog_post_revisions" USING btree ("blog_post_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_status_published_at_idx" ON "blog_posts" USING btree ("status","published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "companies_slug_idx" ON "companies" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "experience_company_id_idx" ON "experience" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "experience_status_sort_order_idx" ON "experience" USING btree ("status","sort_order");--> statement-breakpoint
CREATE INDEX "experience_bullets_experience_id_idx" ON "experience_bullets" USING btree ("experience_id");--> statement-breakpoint
CREATE INDEX "experience_media_experience_id_idx" ON "experience_media" USING btree ("experience_id");--> statement-breakpoint
CREATE INDEX "experience_media_media_asset_id_idx" ON "experience_media" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "experience_skills_skill_id_idx" ON "experience_skills" USING btree ("skill_id");--> statement-breakpoint
CREATE UNIQUE INDEX "media_assets_pathname_idx" ON "media_assets" USING btree ("pathname");--> statement-breakpoint
CREATE UNIQUE INDEX "media_assets_url_idx" ON "media_assets" USING btree ("url");--> statement-breakpoint
CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
