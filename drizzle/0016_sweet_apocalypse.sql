ALTER TABLE "transaction_item" ALTER COLUMN "transaction_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_item" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_item" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction_item" DROP COLUMN IF EXISTS "product_sku";--> statement-breakpoint
ALTER TABLE "transaction_item" DROP COLUMN IF EXISTS "product_name";--> statement-breakpoint
ALTER TABLE "transaction_item" DROP COLUMN IF EXISTS "product_price";