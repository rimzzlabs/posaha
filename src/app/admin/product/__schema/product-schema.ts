import { S, pipe } from '@mobily/ts-belt'
import { toFloat, toInt } from 'radash'
import { z } from 'zod'

const MIN_PRODUCT_PRICE = toFloat(process.env.NEXT_PUBLIC_MIN_PRODUCT_PRICE, 100)
const MIN_PRODUCT_STOCK = toFloat(process.env.NEXT_PUBLIC_MIN_PRODUCT_STOCK, 1)

export let createProductSchema = z.object({
  name: z.string().min(1, 'Harap isi bagian ini'),
  description: z.string().optional(),

  price: z.preprocess(
    (a) => toInt(a, 0),
    z
      .number({ invalid_type_error: 'Harap isi bagian ini' })
      .min(
        MIN_PRODUCT_PRICE,
        pipe('Minimal harga produk adalah ', S.append(String(MIN_PRODUCT_PRICE))),
      ),
  ),

  stock: z.preprocess(
    (a) => toInt(a, 0),
    z
      .number({ invalid_type_error: 'Harap isi bagian ini' })
      .min(
        MIN_PRODUCT_STOCK,
        pipe('Minimal stok produk adalah ', S.append(String(MIN_PRODUCT_STOCK))),
      ),
  ),
  category: z.string().min(1, 'Harap pilih kategori produk'),
})
