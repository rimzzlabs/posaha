import { signInSchema } from '@/app/auth/__schema'
import { getUserByEmail } from '@/database/query/user'

import { verifyCredentials } from '../auth'

import { D, pipe } from '@mobily/ts-belt'
import type { NextAuthConfig } from 'next-auth'
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
          console.info('(LOG ERR) auth.authorize() err not ok: ', res.error)
          if (res.error === 'Deactivated Error') throw new Error('Deactivated user')
          if (res.error === 'Server Error') throw new Error('Server Error')
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
        console.info('(LOG ERR) auth.callback.session() error: ', error.message)
        return args.session
      }
      if (!res.data) {
        console.info('(LOG ERR) auth.callback.session() err not ok: user not found')
        args.session.user.deactivated = true
        return args.session
      }
      if (res.data === 'invalid credentials') {
        console.info(
          '(LOG ERR) auth.callback.session() err not ok: user credential has been changed',
        )
        args.session.user.deactivated = true
        return args.session
      }
      args.session.user.id = res.data.id
      args.session.user.image = res.data.image
      args.session.user.role = res.data.role
      args.session.user.name = res.data.name
      args.session.user.deactivated = false
      return args.session
    },
  },
} satisfies NextAuthConfig
