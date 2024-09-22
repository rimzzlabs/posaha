'use server'

import { createCategory } from '@/database/query/category'
import { actionReturn } from '@/lib/req-res'

import { createCategorySchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'
import { match, P } from 'ts-pattern'

export let createCategoryAction = createSafeActionClient()
  .schema(createCategorySchema)
  .action(async ({ parsedInput: payload }) => {
    const [error] = await tryit(createCategory)(payload)
    if (error) {
      let message = match(error.message.toLowerCase())
        .with(
          P.string.includes('product_category_name_unique'),
          () => 'Kategori Ini Sudah Ada' as const,
        )
        .otherwise(() => 'Terjadi kesalahan pada server' as const)
      console.info('(LOG ERR) createCategoryAction error: ', error.message)
      return actionReturn('error')(message)
    }

    revalidatePath('/app/product/category/list')
    return actionReturn('success')({ message: 'success' })
  })
