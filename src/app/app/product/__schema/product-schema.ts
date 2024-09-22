import { S, pipe } from '@mobily/ts-belt'
import { toInt } from 'radash'
import { z } from 'zod'

const MIN_PRODUCT_PRICE = toInt(process.env.NEXT_PUBLIC_MIN_PRODUCT_PRICE, 100)
const MIN_PRODUCT_STOCK = toInt(process.env.NEXT_PUBLIC_MIN_PRODUCT_STOCK, 1)
const MAX_REMARKS_TRANSACTION_STOCK = toInt(
  process.env.NEXT_PUBLIC_MAX_REMARKS_TRANSACTION_STOCK,
  1000,
)

export let createProductSchema = z.object({
  name: z.string().min(1, 'Harap isi bagian ini'),
  description: z.string().optional(),
  image: z.string().optional().nullable().default(null),
  category: z.string().min(1, 'Harap pilih kategori produk'),
  sku: z.string().min(1, 'Harap isi bagian ini').max(20, 'SKU tidak boleh lebih dari 30 karakter'),

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
})

export let updateProductSchema = z.object({
  id: z.string().min(1, 'Id produk tidak ada'),
  name: z.string().min(1, 'Harap isi bagian ini'),
  description: z.string().optional(),
  image: z.string().optional().nullable().default(null),
  category: z.string().min(1, 'Harap pilih kategori produk'),
  sku: z.string().min(1, 'Harap isi bagian ini').max(20, 'SKU tidak boleh lebih dari 30 karakter'),

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
    z.number({ invalid_type_error: 'Harap isi bagian ini' }).optional().default(0),
  ),
})

export let updateStockProductSchema = z.object({
  stock: z.preprocess(
    (a) => toInt(a, 0),
    z
      .number({ invalid_type_error: 'Harap isi bagian ini' })
      .min(1, 'Jumlah minimal penambahan produk adalah 1'),
  ),
  remarks: z
    .string()
    .max(
      MAX_REMARKS_TRANSACTION_STOCK,
      pipe(
        'Maksimal catatan tidak boleh melebihi ',
        S.append(String(MAX_REMARKS_TRANSACTION_STOCK)),
        S.append(' karakter'),
      ),
    )
    .optional(),
})
