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

  customerChange: decimal('customer_change', { precision: 10, scale: 2 }),
  customerMoney: decimal('customer_money', { precision: 10, scale: 2 }).notNull(),
})

export const TRANSACTION_ITEM_SCHEMA = pgTable('transaction_item', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  transactionId: text('transaction_id')
    .references(() => TRANSACTION_SCHEMA.id)
    .notNull(),
  productId: text('product_id')
    .references(() => PRODUCT_SCHEMA.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
})
