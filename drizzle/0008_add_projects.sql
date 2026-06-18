CREATE TABLE "project_highlight_translations" (
	"project_highlight_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"body" text NOT NULL,
	CONSTRAINT "project_highlight_translations_project_highlight_id_locale_pk" PRIMARY KEY("project_highlight_id","locale")
);
--> statement-breakpoint
CREATE TABLE "project_highlights" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"body" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_revisions" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"locale" varchar(16) DEFAULT 'en' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"source_json" jsonb NOT NULL,
	"rendered_html" text NOT NULL,
	"rendered_text" text NOT NULL,
	"rendered_css" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"compiled_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_skills" (
	"project_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_skills_project_id_skill_id_pk" PRIMARY KEY("project_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "project_translations" (
	"project_id" integer NOT NULL,
	"locale" varchar(16) NOT NULL,
	"title" varchar(160) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"short_description" text,
	"overview" text,
	CONSTRAINT "project_translations_project_id_locale_pk" PRIMARY KEY("project_id","locale")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"title" varchar(160) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"short_description" text,
	"overview" text,
	"cover_asset_id" integer,
	"project_url" text,
	"source_url" text,
	"status" "status_cms" DEFAULT 'draft' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"started_on" date,
	"completed_on" date,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_highlight_translations" ADD CONSTRAINT "project_highlight_translations_project_highlight_id_project_highlights_id_fk" FOREIGN KEY ("project_highlight_id") REFERENCES "public"."project_highlights"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_highlights" ADD CONSTRAINT "project_highlights_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_revisions" ADD CONSTRAINT "project_revisions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_translations" ADD CONSTRAINT "project_translations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_asset_id_media_assets_id_fk" FOREIGN KEY ("cover_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "project_highlight_translations_locale_idx" ON "project_highlight_translations" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "project_highlights_project_id_idx" ON "project_highlights" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "project_revisions_project_id_idx" ON "project_revisions" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "project_revisions_project_locale_version_idx" ON "project_revisions" USING btree ("project_id","locale","version");--> statement-breakpoint
CREATE INDEX "project_skills_skill_id_idx" ON "project_skills" USING btree ("skill_id");--> statement-breakpoint
CREATE UNIQUE INDEX "project_translations_locale_slug_idx" ON "project_translations" USING btree ("locale","slug");--> statement-breakpoint
CREATE INDEX "project_translations_slug_idx" ON "project_translations" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "projects_status_sort_order_idx" ON "projects" USING btree ("status","sort_order");--> statement-breakpoint
CREATE INDEX "projects_featured_status_sort_order_idx" ON "projects" USING btree ("featured","status","sort_order");