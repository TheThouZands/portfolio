CREATE TYPE "public"."auth_role" AS ENUM('reader', 'moderator', 'owner');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" varchar(80);--> statement-breakpoint
UPDATE "user" AS "auth_user"
SET "username" = lower(coalesce("identity"."username_normalized", "identity"."username"))
FROM "auth_identities" AS "identity"
WHERE "identity"."user_id" = "auth_user"."id";--> statement-breakpoint
UPDATE "user"
SET "username" = lower("id"::text)
WHERE "username" IS NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "auth_role" DEFAULT 'reader' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_idx" ON "user" USING btree ("username");
