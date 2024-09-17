import { DATABASE_URL } from '@/lib/configs/environment'

import * as schema from './schema'

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const NEON = neon(DATABASE_URL)
export const DB = drizzle(NEON, { schema })
