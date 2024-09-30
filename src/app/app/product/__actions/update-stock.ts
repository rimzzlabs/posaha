'use server'

import { updateStock } from '@/database/query/product'
import { actionReturn } from '@/lib/req-res'

import { updateStockProductSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let updateStockAction = createSafeActionClient()
  .schema(updateStockProductSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, data] = await tryit(updateStock)(payload)
    if (error) {
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    if (!data) {
      return actionReturn('error')('Produk ini tidak ditemukan')
    }

    revalidatePath('/app/product/list')
    return actionReturn('success')(data)
  })
