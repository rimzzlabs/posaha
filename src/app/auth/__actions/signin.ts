'use server'

import { getUserByEmail } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'
import { signIn } from '@/server/next-auth'

import { signInSchema } from '../__schema'

import { pipe, S } from '@mobily/ts-belt'
import { AuthError } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'
import { match, P } from 'ts-pattern'

export let signInAction = createSafeActionClient()
  .schema(signInSchema)
  .action(async ({ parsedInput: payload }) => {
    try {
      let user = await getUserByEmail(payload.email)
      if (user.data === 'user not found') throw new Error('User not found')

      let redirectTo = match(user.data.role)
        .with(P.shape('admin').or('super-admin'), () => '/app')
        .otherwise(() => '/app/transaction/cashier')

      await signIn('credentials', { ...payload, redirect: true, redirectTo })
      return pipe({ signed: true, role: user.data.role }, actionReturn('success'))
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return pipe('Alamat Surel atau Kata Sandi tidak valid' as const, actionReturn('error'))
          case 'CallbackRouteError':
            return pipe(
              match(S.toLowerCase(error.message))
                .with('deactivated error', () => 'Pengguna ini telah dinonaktifkan' as const)
                .otherwise(() => 'Tidak dapat masuk, periksa koneksi internet anda' as const),
              actionReturn('error'),
            )
          default:
            return pipe('Terjadi kesalahan pada server' as const, actionReturn('error'))
        }
      }

      if (error instanceof Error && error.message.includes('not found')) {
        return pipe('Akun belum pernah ada di platform ini' as const, actionReturn('error'))
      }

      throw error
    }
  })
