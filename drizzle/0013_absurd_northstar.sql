ALTER TABLE "product" ADD COLUMN "deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "deleted_at" timestamp;