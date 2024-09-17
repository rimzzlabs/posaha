CREATE TABLE IF NOT EXISTS "product_category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "product_category_name_unique" UNIQUE("name"),
	CONSTRAINT "product_category_color_unique" UNIQUE("color")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image" text,
	"sku" text NOT NULL,
	"price" numeric(2) NOT NULL,
	"stock_available" integer DEFAULT 0 NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "product_sku_unique" UNIQUE("sku")
);
