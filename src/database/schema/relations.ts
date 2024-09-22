import { CATEGORY_SCHEMA } from './category'
import { PRODUCT_SCHEMA } from './product'
import { TRANSACTION_ITEM_SCHEMA, TRANSACTION_SCHEMA } from './transaction'
import { USER_SCHEMA } from './user'

import { relations } from 'drizzle-orm'

export const PRODUCT_RELATIONS = relations(PRODUCT_SCHEMA, ({ one, many }) => ({
  category: one(CATEGORY_SCHEMA, {
    fields: [PRODUCT_SCHEMA.categoryId],
    references: [CATEGORY_SCHEMA.id],
  }),
  transactionItems: many(TRANSACTION_ITEM_SCHEMA),
}))

export const CATEGORY_RELATIONS = relations(CATEGORY_SCHEMA, ({ many }) => ({
  products: many(PRODUCT_SCHEMA),
}))

export const TRANSACTION_ITEM_RELATIONS = relations(TRANSACTION_ITEM_SCHEMA, ({ one }) => ({
  transaction: one(TRANSACTION_SCHEMA, {
    fields: [TRANSACTION_ITEM_SCHEMA.transactionId],
    references: [TRANSACTION_SCHEMA.id],
  }),
  product: one(PRODUCT_SCHEMA, {
    fields: [TRANSACTION_ITEM_SCHEMA.productId],
    references: [PRODUCT_SCHEMA.id],
  }),
}))

export const USER_RELATIONS = relations(USER_SCHEMA, ({ many }) => ({
  transactions: many(TRANSACTION_SCHEMA),
}))
