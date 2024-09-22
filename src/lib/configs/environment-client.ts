import { z } from 'zod'

let envSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, 'Missing env NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
})

let check = envSchema.safeParse(process.env)
if (check.error) {
  throw new Error(`Error trying to access ENV-CLIENT, reason:  ` + check.error.message)
}

export const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } = check.data
