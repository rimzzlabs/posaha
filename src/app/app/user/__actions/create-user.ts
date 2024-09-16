'use server'

import { createUser } from '@/database/query/user'
import { actionReturn, extractDatabaseError } from '@/lib/req-res'

import { createUserSchema } from '../__schema/user-schema'

import { pipe } from '@mobily/ts-belt'
import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let createUserAction = createSafeActionClient()
  .schema(createUserSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(createUser)(payload)
    if (error) {
      console.info('createUserAction error: ', error.message)
      let errorMessage = extractDatabaseError(error.message)
      return pipe(errorMessage, actionReturn('error'))
    }

    if (!res.ok) return pipe(res.error, actionReturn('error'))

    revalidatePath('/app/user/list')

    return pipe(res.data, actionReturn('success'))
  })
