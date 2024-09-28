import { z } from 'zod'

let envSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, 'Missing env NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
  NEXT_PUBLIC_TAX_FEE: z.string().min(1, 'Missing env NEXT_PUBLIC_TAX_FEE'),
})

let check = envSchema.safeParse({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_TAX_FEE: process.env.NEXT_PUBLIC_TAX_FEE,
})

if (check.error) {
  throw new Error(`Error trying to access ENV-CLIENT, reason:  ` + check.error.message)
}

export const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_TAX_FEE } = check.data
