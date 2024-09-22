import { z } from 'zod'

let envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'Missing ENV DATABASE_URL'),
  AUTH_SECRET: z.string().min(1, 'Missing ENV AUTH_SECRET'),
  CLOUDINARY_SECRET_KEY: z.string().min(1, 'Missing env CLOUDINARY_SECRET_KEY'),
  CLOUDINARY_API_KEY: z.string().min(1, 'Missing env CLOUDINARY_API_KEY'),
})

let check = envSchema.safeParse(process.env)
if (check.error) {
  throw new Error(`Error trying to access ENV: ` + check.error.message)
}

export const { AUTH_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, DATABASE_URL } = check.data
