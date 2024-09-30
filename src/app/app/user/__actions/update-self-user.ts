'use server'

import { updateUser } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { updateUserSelfSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let updateSelfUserAction = createSafeActionClient()
  .schema(updateUserSelfSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, data] = await tryit(updateUser)(payload)

    if (error) {
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    revalidatePath('/app/account')
    return actionReturn('success')(data)
  })
