ALTER TABLE "product" RENAME COLUMN "stock_available" TO "stock";--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "stock" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "sold" integer DEFAULT 0 NOT NULL;