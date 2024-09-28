'use server'

import { addOrAppendToCart } from '@/database/query/cart'
import { actionReturn } from '@/lib/req-res'

import { addOrAppendToCartSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let addOrAppendToCartAction = createSafeActionClient()
  .schema(addOrAppendToCartSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error] = await tryit(addOrAppendToCart)(payload)
    if (error) {
      console.info('(LOG ERR) addOrAppendToCartAction error: ', error.message)
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    revalidatePath('/app/transaction/cashier')
    return actionReturn('success')({ message: 'Berhasil menambahkan produk ke keranjang belanja' })
  })
