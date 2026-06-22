TRUNCATE TABLE "comments" RESTART IDENTITY;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "comment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "blog_post_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "parent_comment_id" bigint;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_comments_id_fk" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comments_blog_post_created_at_idx" ON "comments" USING btree ("blog_post_id","created_at");--> statement-breakpoint
CREATE INDEX "comments_parent_comment_created_at_idx" ON "comments" USING btree ("parent_comment_id","created_at");
