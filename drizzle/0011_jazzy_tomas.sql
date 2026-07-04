DROP INDEX "project_translations_locale_slug_idx";--> statement-breakpoint
DROP INDEX "project_translations_slug_idx";--> statement-breakpoint
DROP INDEX "projects_slug_idx";--> statement-breakpoint
ALTER TABLE "project_translations" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "project_url";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "source_url";