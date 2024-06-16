ALTER TABLE "users" ADD COLUMN "github_id" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_hash";