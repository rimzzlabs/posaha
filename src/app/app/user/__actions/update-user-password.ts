'use server'

import { updateUserPassword } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { updateUserPasswordSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'
import { match } from 'ts-pattern'

export let updateUserPasswordAction = createSafeActionClient()
  .schema(updateUserPasswordSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(updateUserPassword)(payload)

    if (error) {
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    if (typeof res.data === 'string') {
      let message = match(res.data)
        .with('Invalid Credential', () => 'Kata sandi lama pengguna salah')
        .otherwise(() => 'Terjadi kesalahan pada server')
      return actionReturn('error')(message)
    }

    revalidatePath('/app/user/list')

    return actionReturn('success')(res)
  })

export let updateUserPasswordSelfAction = createSafeActionClient()
  .schema(updateUserPasswordSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(updateUserPassword)(payload)

    if (error) {
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    if (typeof res.data === 'string') {
      let message = match(res.data)
        .with('Invalid Credential', () => 'Kata sandi lama pengguna salah')
        .otherwise(() => 'Terjadi kesalahan pada server')
      return actionReturn('error')(message)
    }

    return actionReturn('success')(res)
  })
