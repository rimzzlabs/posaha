import { PRODUCT_SCHEMA } from './product'
import { USER_SCHEMA } from './user'

import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const CART_ITEM_SCHEMA = pgTable('cart_item', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => USER_SCHEMA.id)
    .notNull(),
  productId: text('product_id')
    .references(() => PRODUCT_SCHEMA.id)
    .notNull(),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})
