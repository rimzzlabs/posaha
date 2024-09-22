'use server'

import { createProduct } from '@/database/query/product'
import { actionReturn } from '@/lib/req-res'

import { createProductSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'
import { match, P } from 'ts-pattern'

export let createProductAction = createSafeActionClient()
  .schema(createProductSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error] = await tryit(createProduct)(payload)
    if (error) {
      console.info('(LOG ERR) createProductAction error: ', error.message)

      let message = match(error.message.toLowerCase())
        .with(P.string.includes('product_sku_unique'), () => 'kode SKU Ini Sudah Ada' as const)
        .otherwise(() => 'Terjadi kesalahan pada server' as const)
      return actionReturn('error')(message)
    }

    revalidatePath('/app/product/list')
    return actionReturn('success')({ message: 'success' })
  })
