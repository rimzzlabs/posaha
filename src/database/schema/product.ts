import { timestamp, integer, numeric, pgTable, text } from 'drizzle-orm/pg-core'

export const PRODUCT_SCHEMA = pgTable('product', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),

  image: text('image'),
  sku: text('sku').unique().notNull(),

  price: numeric('price', { precision: 2 }).notNull(),
  stockAvailable: integer('stock_available').notNull().default(1),
  stockSold: integer('stock_available').notNull().default(0),

  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
})
