'use server'

import { actionReturn } from '@/lib/req-res'
import { signIn } from '@/server/next-auth'

import { signInSchema } from '../__schema'

import { pipe } from '@mobily/ts-belt'
import { AuthError } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'

export let signInAction = createSafeActionClient()
  .schema(signInSchema)
  .action(async ({ parsedInput: payload }) => {
    try {
      await signIn('credentials', payload)
      return pipe({ signed: true }, actionReturn('success'))
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return pipe('Alamat Surel atau Kata Sandi tidak valid' as const, actionReturn('error'))
          case 'CallbackRouteError':
            return pipe('Pengguna ini telah dinonaktifkan' as const, actionReturn('error'))
          default:
            return pipe('Terjadi kesalahan pada server' as const, actionReturn('error'))
        }
      }

      throw error
    }
  })
