import { DB } from '@/database'
import { ACCOUNT_SCHEMA, USER_SCHEMA } from '@/database/schema'

import { NEXT_AUTH_CONFIG } from './config'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { N, pipe } from '@mobily/ts-belt'
import NextAuth from 'next-auth'

const MAX_AGE = pipe(7, N.multiply(24), N.multiply(60), N.multiply(60), N.multiply(1000))
export const AUTH_SIGNED = '/app'
export const AUTH_SIGNIN_URL = '/auth/signin'
export const AUTH_API_PREFIX = '/api/auth'
export const AUTH_PUBLIC_ROUTES = ['/']
export const AUTH_ROUTES = [AUTH_SIGNIN_URL]

export const ADMIN_ROUTES = [
  '/app/user/list',
  '/app/user/create',
  '/app/sales',
  '/app/product/list',
  '/app/product/create',
  '/app/product/category/list',
  '/app/product/category/create',
]
export const CASHIER_ROUTES = ['/app/transaction/list', '/app/transaction/cashierI']

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  jwt: { maxAge: MAX_AGE },
  pages: { signIn: '/auth/signin' },
  session: { strategy: 'jwt', maxAge: MAX_AGE },
  adapter: DrizzleAdapter(DB, { usersTable: USER_SCHEMA, accountsTable: ACCOUNT_SCHEMA }),
  ...NEXT_AUTH_CONFIG,
})
