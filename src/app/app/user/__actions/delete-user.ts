'use server'

import { deleteUser } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { deleteUserSchema } from '../__schema/user-schema'

import { pipe } from '@mobily/ts-belt'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let deleteUserAction = createSafeActionClient()
  .schema(deleteUserSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(deleteUser)(payload)
    if (error) {
      console.info('(LOG ERR) deleteUserAction error: ', error.message)
      return pipe(
        'Tidak bisa menghapus pengguna, server sedang sibuk' as const,
        actionReturn('error'),
      )
    }
    if (!res.data) {
      return pipe(
        'Tidak bisa menghapus pengguna, server sedang sibuk' as const,
        actionReturn('error'),
      )
    }

    revalidatePath('/app/user/list')
    return pipe(res.data, actionReturn('success'))
  })
