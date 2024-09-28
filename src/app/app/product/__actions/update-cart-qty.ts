'use server'

import { updateCartQuantity } from '@/database/query/cart'
import { actionReturn } from '@/lib/req-res'

import { updateCartQuantitySchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let updateCartQuantityAction = createSafeActionClient()
  .schema(updateCartQuantitySchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(updateCartQuantity)(payload)

    if (error) {
      console.info('(LOG ERR): updateCartQuantityAction action error: ', error.message)
      if (error.message.toLowerCase().includes('exceed')) {
        return actionReturn('error')('Kuantitas produk tidak boleh melebih stok yang tersedia')
      }
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    revalidatePath('/app/transaction/cashier')
    return actionReturn('success')({ quantity: res.quantity })
  })
