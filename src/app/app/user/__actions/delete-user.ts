'use server'

import { deleteUser } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { deleteUserSchema } from '../__schema/user-schema'

import { pipe } from '@mobily/ts-belt'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'

export let deleteUserAction = createSafeActionClient()
  .schema(deleteUserSchema)
  .action(async ({ parsedInput: payload }) => {
    let res = await deleteUser(payload)
    if (!res.ok) return pipe('Failed to delete user' as const, actionReturn('error'))

    revalidatePath('/app/user/list')
    return pipe(res.data, actionReturn('success'))
  })
