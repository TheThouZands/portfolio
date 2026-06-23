CREATE TABLE "auth_identities" (
	"user_id" text PRIMARY KEY NOT NULL,
	"username" varchar(80) NOT NULL,
	"username_normalized" varchar(80) NOT NULL,
	"email" text,
	"email_normalized" text,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth_identities" ADD CONSTRAINT "auth_identities_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "auth_identities_username_normalized_idx" ON "auth_identities" USING btree ("username_normalized");--> statement-breakpoint
CREATE UNIQUE INDEX "auth_identities_email_normalized_idx" ON "auth_identities" USING btree ("email_normalized");