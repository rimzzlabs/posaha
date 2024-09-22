'use server'

import { updateProduct } from '@/database/query/product'
import { actionReturn } from '@/lib/req-res'

import { updateProductSchema } from '../__schema'

import { S } from '@mobily/ts-belt'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'
import { match, P } from 'ts-pattern'

export let updateProductAction = createSafeActionClient()
  .schema(updateProductSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error] = await tryit(updateProduct)(payload)
    if (error) {
      console.info('(LOG ERR) updateProducAction error: ', error.message)

      let message = match(S.toLowerCase(error.message))
        .with(P.string.includes('product_sku_unique'), () => 'kode SKU Ini Sudah Ada' as const)
        .otherwise(() => 'Terjadi kesalahan pada server' as const)
      return actionReturn('error')(message)
    }

    revalidatePath('/app/product/list')
    revalidatePath('/app/product/update/[id]', 'page')
    return actionReturn('success')({ message: 'success' })
  })
