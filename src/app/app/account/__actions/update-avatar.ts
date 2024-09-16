'use server'

import { updateUser } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { updateAvatarSchema } from '../__schema'

import { pipe } from '@mobily/ts-belt'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'

export let updateAvatarAction = createSafeActionClient()
  .schema(updateAvatarSchema)
  .action(async ({ parsedInput: payload }) => {
    let res = await updateUser(payload)
    if (!res.ok) return pipe('Terjadi kesalahan pada server', actionReturn('error'))

    revalidatePath('/app/account')
    return pipe(res.data, actionReturn('success'))
  })
