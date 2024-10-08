import { toInt } from 'radash'
import { z } from 'zod'

export type TCreateTransactionSchema = z.infer<typeof createTransactionSchema>
export let createTransactionSchema = z
  .object({
    userId: z.string().min(1, 'ID Pengguna tidak valid'),

    cartItems: z.array(
      z.object({
        id: z.string().min(1, 'ID Cart tidak valid'),
        productId: z.string().min(1, 'ID Produk tidak valid'),
        quantity: z.number().min(1, 'Kuantitas produk tidak valid'),
      }),
    ),
    totalAmount: z.number().min(1, 'Total belanja tidak valid'),
    totalQuantity: z.number().min(1, 'Kuantitas produk tidak valid'),
    customerMoney: z.preprocess(
      (a) => toInt(a, 0),
      z
        .number({ invalid_type_error: 'Harap masukkan uang pelanggan' })
        .min(1, 'Harap masukan uang pelanggan'),
    ),
    paymentMethod: z.enum(['cash'], { message: 'Harap pilih metode pembayaran' }),
    remark: z.string().max(255, 'Catatan maksimal 255 Karakter!').optional(),
  })
  .refine(({ totalAmount, customerMoney }) => customerMoney >= totalAmount, {
    message: 'Uang pembeli tidak cukup untuk membayar belanja ini',
    path: ['customerMoney'],
  })
