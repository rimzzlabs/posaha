import { CATEGORY_SCHEMA } from './category'
import { PRODUCT_SCHEMA } from './product'

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
