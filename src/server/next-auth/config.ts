import { signInSchema } from '@/app/auth/__schema'
import { getUserByEmail } from '@/database/query/user'

import { verifyCredentials } from '../auth'

import { D, pipe } from '@mobily/ts-belt'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { tryit } from 'radash'

export const NEXT_AUTH_CONFIG = {
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email', placeholder: 'Alamat surel anda' },
        password: { type: 'password', placeholder: 'Kata sandi Anda' },
      },
      authorize: async (credentials) => {
        let parsedCredentials = signInSchema.safeParse(credentials)
        if (parsedCredentials.error) throw new Error(parsedCredentials.error.message)

        let payload = parsedCredentials.data
        let res = await pipe(payload.password, verifyCredentials(payload.email))
        if (!res.ok) {
          if (res.error === 'Deactivated Error') throw new Error('deactivated user')
          return null
        }

        return pipe(res, D.selectKeys(['id', 'email', 'name', 'image', 'role']))
      },
    }),
  ],

  callbacks: {
    session: async (args) => {
      const [error, res] = await tryit(getUserByEmail)(args.session.user.email)
      if (error) {
        console.info('auth.callback.session() err: ', error.message)
        return args.session
      }
      if (!res.ok) return args.session
      args.session.user.role = res.data.role
      return args.session
    },
  },
} satisfies NextAuthConfig
