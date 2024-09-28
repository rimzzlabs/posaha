import { z } from 'zod'

export let addOrAppendToCartSchema = z.object({
  userId: z.string().min(1, 'ID Pengguna tidak valid'),
  productId: z.string().min(1, 'ID produk tidak valid'),
})

export let updateCartQuantitySchema = z.object({
  userId: z.string().min(1, 'ID Pengguna tidak valid'),
  cartItemId: z.string().min(1, 'ID produk tidak valid'),
  quantity: z.number().min(1),
})

export let deleteCartSchema = z.object({
  userId: z.string().min(1, 'ID Pengguna tidak valid'),
  cartItemId: z
    .string()
    .min(1, 'ID produk tidak valid')
    .or(z.array(z.string().min(1, 'ID Produk tidak valid'))),
})
