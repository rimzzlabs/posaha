ALTER TABLE "transaction" ADD COLUMN "customer_change" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "customer_money" numeric(10, 2) NOT NULL;