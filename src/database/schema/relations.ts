import { CART_ITEM_SCHEMA } from './cart'
import { CATEGORY_SCHEMA } from './category'
import { PRODUCT_SCHEMA } from './product'
import { TRANSACTION_ITEM_SCHEMA, TRANSACTION_SCHEMA } from './transaction'
import { USER_SCHEMA } from './user'

import { relations } from 'drizzle-orm'

export const PRODUCT_RELATIONS = relations(PRODUCT_SCHEMA, ({ one }) => ({
  category: one(CATEGORY_SCHEMA, {
    fields: [PRODUCT_SCHEMA.categoryId],
    references: [CATEGORY_SCHEMA.id],
  }),
}))

export const CATEGORY_RELATIONS = relations(CATEGORY_SCHEMA, ({ many }) => ({
  products: many(PRODUCT_SCHEMA),
}))

export const CART_ITEM_RELATIONS = relations(CART_ITEM_SCHEMA, ({ one }) => ({
  user: one(USER_SCHEMA, {
    fields: [CART_ITEM_SCHEMA.userId],
    references: [USER_SCHEMA.id],
  }),
  product: one(PRODUCT_SCHEMA, {
    fields: [CART_ITEM_SCHEMA.productId],
    references: [PRODUCT_SCHEMA.id],
  }),
}))

export const TRANSACTION_RELATIONS = relations(TRANSACTION_SCHEMA, ({ one, many }) => ({
  user: one(USER_SCHEMA, {
    fields: [TRANSACTION_SCHEMA.userId],
    references: [USER_SCHEMA.id],
  }),
  items: many(TRANSACTION_ITEM_SCHEMA),
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
  cartItems: many(CART_ITEM_SCHEMA),
  transactions: many(TRANSACTION_SCHEMA),
}))
