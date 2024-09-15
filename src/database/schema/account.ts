import { USER_SCHEMA } from './user'

import { pgTable, text, primaryKey, integer } from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

export const ACCOUNT_SCHEMA = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => USER_SCHEMA.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)
