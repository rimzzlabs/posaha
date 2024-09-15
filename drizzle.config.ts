import { defineConfig } from 'drizzle-kit'

const DB_URL = process.env.DATABASE_URL
if (!DB_URL) throw new Error('Missing DB_URL ENV, check your .env file')

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/database/schema',
  dbCredentials: {
    url: DB_URL,
  },
})
