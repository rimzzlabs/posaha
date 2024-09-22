'use server'

import { deleteCategory } from '@/database/query/category'
import { actionReturn } from '@/lib/req-res'

import { deleteCategorySchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let deleteCategoryAction = createSafeActionClient()
  .schema(deleteCategorySchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(deleteCategory)(payload)
    if (error) return actionReturn('error')('Terjadi kesalahan pada server')

    revalidatePath('/app/product/category/list')
    return actionReturn('success')({ data: res })
  })
