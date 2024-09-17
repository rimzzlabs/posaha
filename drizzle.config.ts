import { DATABASE_URL } from '@/lib/configs/environment'

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/database/schema',
  dbCredentials: {
    url: DATABASE_URL,
  },
})
