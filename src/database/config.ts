import { ACCOUNT_SCHEMA, USER_SCHEMA } from './schema'

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const DB_URL = process.env.DATABASE_URL
if (!DB_URL) throw new Error('Missing DB_URL ENV, check your .env file')

const NEON = neon(DB_URL)
export const DB = drizzle(NEON, { schema: { USER_SCHEMA, ACCOUNT_SCHEMA } })
