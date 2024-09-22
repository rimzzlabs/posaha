'use server'

import { deleteProduct } from '@/database/query/product'
import { actionReturn } from '@/lib/req-res'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'
import { z } from 'zod'

let schema = z.object({ id: z.string().min(1, 'id produk tidak valid') })

export let deleteProductAction = createSafeActionClient()
  .schema(schema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(deleteProduct)(payload.id)
    if (error) {
      return actionReturn('error')('Tidak dapat menghapus produk, harap coba lagi nanti')
    }

    revalidatePath('/app/product/list')
    return actionReturn('success')(res)
  })
