'use server'

import { updateUser } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { updateAvatarSchema } from '../__schema'

import { pipe } from '@mobily/ts-belt'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let updateAvatarAction = createSafeActionClient()
  .schema(updateAvatarSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(updateUser)({ userId: payload.id, image: payload.image })
    if (error) {
      console.info('(LOG ERR) updateAvatarAction error: ', error.message)
      return pipe('Terjadi kesalahan pada server', actionReturn('error'))
    }

    if (!res.data) return pipe('Terjadi kesalahan pada server', actionReturn('error'))

    revalidatePath('/app/account')
    return pipe(res.data, actionReturn('success'))
  })
