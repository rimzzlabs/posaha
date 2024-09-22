import { CATEGORY_SCHEMA } from './category'

import { timestamp, integer, pgTable, text } from 'drizzle-orm/pg-core'

export const PRODUCT_SCHEMA = pgTable('product', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  categoryId: text('category_id')
    .references(() => CATEGORY_SCHEMA.id)
    .notNull(),

  name: text('name').notNull(),
  description: text('description'),

  image: text('image'),
  sku: text('sku').unique().notNull(),

  price: integer('price').notNull(),
  stock: integer('stock').notNull().default(1),
  sold: integer('sold').notNull().default(0),

  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
})
