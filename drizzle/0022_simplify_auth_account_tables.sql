DROP TABLE "auth_identities";--> statement-breakpoint
ALTER TABLE "account" RENAME TO "logins";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "accounts";--> statement-breakpoint
ALTER INDEX "account_user_id_idx" RENAME TO "logins_user_id_idx";--> statement-breakpoint
ALTER INDEX "user_email_idx" RENAME TO "accounts_email_idx";--> statement-breakpoint
ALTER INDEX "user_username_idx" RENAME TO "accounts_username_idx";--> statement-breakpoint
ALTER TABLE "logins" RENAME CONSTRAINT "account_user_id_user_id_fk" TO "logins_user_id_accounts_id_fk";--> statement-breakpoint
ALTER TABLE "comments" RENAME CONSTRAINT "comments_user_id_user_id_fk" TO "comments_user_id_accounts_id_fk";--> statement-breakpoint
ALTER TABLE "session" RENAME CONSTRAINT "session_user_id_user_id_fk" TO "session_user_id_accounts_id_fk";
