import { timestamp, pgTable, text, varchar, date, integer } from 'drizzle-orm/pg-core'

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

  createdAt: date('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at').defaultNow().notNull(),
})
