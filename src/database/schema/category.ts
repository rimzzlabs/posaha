import { timestamp, pgTable, text } from 'drizzle-orm/pg-core'

export const CATEGORY_SCHEMA = pgTable('product_category', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
  color: text('color').notNull(),

  createdAt: timestamp('created_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date().toISOString()),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
})
