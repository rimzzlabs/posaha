import { CART_ITEM_SCHEMA } from './cart'
import { CATEGORY_SCHEMA } from './category'
import { PRODUCT_SCHEMA } from './product'
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

export const USER_RELATIONS = relations(USER_SCHEMA, ({ many }) => ({
  cartItems: many(CART_ITEM_SCHEMA),
}))
