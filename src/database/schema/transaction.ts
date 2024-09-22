import { PRODUCT_SCHEMA } from './product'
import { USER_SCHEMA } from './user'

import { decimal, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const TRANSACTION_SCHEMA = pgTable('transaction', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => USER_SCHEMA.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
})

export const TRANSACTION_ITEM_SCHEMA = pgTable('transaction_item', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  transactionId: text('transaction_id').references(() => TRANSACTION_SCHEMA.id),
  productId: text('product_id').references(() => PRODUCT_SCHEMA.id),
  productSku: text('product_sku').notNull(),
  productName: text('product_name').notNull(),
  productPrice: decimal('product_price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
})
