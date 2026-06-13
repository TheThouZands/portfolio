CREATE TABLE "blog_post_translations" (
	"blog_post_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"title" varchar(160) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"excerpt" text,
	CONSTRAINT "blog_post_translations_blog_post_id_locale_pk" PRIMARY KEY("blog_post_id","locale")
);
--> statement-breakpoint
CREATE TABLE "company_translations" (
	"company_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"company_name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"summary" text,
	CONSTRAINT "company_translations_company_id_locale_pk" PRIMARY KEY("company_id","locale")
);
--> statement-breakpoint
CREATE TABLE "experience_bullet_translations" (
	"experience_bullet_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"body" text NOT NULL,
	CONSTRAINT "experience_bullet_translations_experience_bullet_id_locale_pk" PRIMARY KEY("experience_bullet_id","locale")
);
--> statement-breakpoint
CREATE TABLE "experience_media_translations" (
	"experience_media_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"caption" text,
	CONSTRAINT "experience_media_translations_experience_media_id_locale_pk" PRIMARY KEY("experience_media_id","locale")
);
--> statement-breakpoint
CREATE TABLE "experience_translations" (
	"experience_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"position_title" varchar(100) NOT NULL,
	"location_label" varchar(120),
	"role_summary" text,
	"company_context" text,
	CONSTRAINT "experience_translations_experience_id_locale_pk" PRIMARY KEY("experience_id","locale")
);
--> statement-breakpoint
CREATE TABLE "media_asset_translations" (
	"media_asset_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"alt_text" text,
	CONSTRAINT "media_asset_translations_media_asset_id_locale_pk" PRIMARY KEY("media_asset_id","locale")
);
--> statement-breakpoint
CREATE TABLE "skill_translations" (
	"skill_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"name" varchar(80) NOT NULL,
	"category_label" varchar(80),
	CONSTRAINT "skill_translations_skill_id_locale_pk" PRIMARY KEY("skill_id","locale")
);
--> statement-breakpoint
DROP INDEX "blog_post_revisions_post_version_idx";--> statement-breakpoint
ALTER TABLE "blog_post_revisions" ADD COLUMN "locale" varchar(16) DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_post_translations" ADD CONSTRAINT "blog_post_translations_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_translations" ADD CONSTRAINT "company_translations_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_bullet_translations" ADD CONSTRAINT "experience_bullet_translations_experience_bullet_id_experience_bullets_id_fk" FOREIGN KEY ("experience_bullet_id") REFERENCES "public"."experience_bullets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_media_translations" ADD CONSTRAINT "experience_media_translations_experience_media_id_experience_media_id_fk" FOREIGN KEY ("experience_media_id") REFERENCES "public"."experience_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_translations" ADD CONSTRAINT "experience_translations_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_asset_translations" ADD CONSTRAINT "media_asset_translations_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill_translations" ADD CONSTRAINT "skill_translations_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
INSERT INTO "blog_post_translations" ("blog_post_id", "locale", "title", "slug", "excerpt")
SELECT "id", 'en', "title", "slug", "excerpt"
FROM "blog_posts";--> statement-breakpoint
INSERT INTO "company_translations" ("company_id", "locale", "company_name", "slug", "summary")
SELECT "id", 'en', "company_name", "slug", "summary"
FROM "companies";--> statement-breakpoint
INSERT INTO "experience_bullet_translations" ("experience_bullet_id", "locale", "body")
SELECT "id", 'en', "body"
FROM "experience_bullets";--> statement-breakpoint
INSERT INTO "experience_media_translations" ("experience_media_id", "locale", "caption")
SELECT "id", 'en', "caption"
FROM "experience_media";--> statement-breakpoint
INSERT INTO "experience_translations" ("experience_id", "locale", "position_title", "location_label", "role_summary", "company_context")
SELECT "id", 'en', "position_title", "location_label", "role_summary", "company_context"
FROM "experience";--> statement-breakpoint
INSERT INTO "media_asset_translations" ("media_asset_id", "locale", "alt_text")
SELECT "id", 'en', "alt_text"
FROM "media_assets";--> statement-breakpoint
INSERT INTO "skill_translations" ("skill_id", "locale", "name", "category_label")
SELECT "id", 'en', "name", "category"
FROM "skills";--> statement-breakpoint
CREATE UNIQUE INDEX "blog_post_translations_locale_slug_idx" ON "blog_post_translations" USING btree ("locale","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "company_translations_locale_slug_idx" ON "company_translations" USING btree ("locale","slug");--> statement-breakpoint
CREATE INDEX "experience_bullet_translations_locale_idx" ON "experience_bullet_translations" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "experience_media_translations_locale_idx" ON "experience_media_translations" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "experience_translations_locale_idx" ON "experience_translations" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "media_asset_translations_locale_idx" ON "media_asset_translations" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "skill_translations_locale_idx" ON "skill_translations" USING btree ("locale");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_post_revisions_post_locale_version_idx" ON "blog_post_revisions" USING btree ("blog_post_id","locale","version");
