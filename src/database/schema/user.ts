import { timestamp, pgTable, text, varchar, integer } from 'drizzle-orm/pg-core'

export const USER_SCHEMA = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  ktp: text('ktp').unique().notNull(),

  email: text('email').unique().notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),

  password: text('password').notNull(),
  role: text('role').$type<TRole>().notNull(),

  address: varchar('address', { length: 255 }).notNull(),
  image: text('image'),

  deleted: integer('boolean').default(0).notNull(),

  createdAt: timestamp('created_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date().toISOString()),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})
