'use server'

import { deleteCarts } from '@/database/query/cart'
import { actionReturn } from '@/lib/req-res'

import { deleteCartSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let deleteFromCartAction = createSafeActionClient()
  .schema(deleteCartSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error] = await tryit(deleteCarts)(payload)
    if (error) {
      console.info('(LOG ERR): deleteFromCart action error: ', error.message)
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    revalidatePath('/app/transaction/cashier')
    return actionReturn('success')({ message: 'Berhasil menghapus produk dari keranjang belanja' })
  })
