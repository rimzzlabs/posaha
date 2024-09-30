'use server'

import { updateCategory } from '@/database/query/category'
import { actionReturn } from '@/lib/req-res'

import { updateCategorySchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let updateCategoryAction = createSafeActionClient()
  .schema(updateCategorySchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, data] = await tryit(updateCategory)(payload)
    if (error) {
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    if (!data) {
      return actionReturn('error')('Kategori ini tidak ditemukan')
    }

    revalidatePath('/app/product/category/list')
    return actionReturn('success')(data)
  })
