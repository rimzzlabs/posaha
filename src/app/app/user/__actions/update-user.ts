'use server'

import { updateUser } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { updateUserSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let updateUserAction = createSafeActionClient()
  .schema(updateUserSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, data] = await tryit(updateUser)(payload)

    if (error) {
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    if (!data) {
      return actionReturn('error')('Pengguna ini tidak ditemukan')
    }

    revalidatePath('/app/user/list')
    return actionReturn('success')(data)
  })
