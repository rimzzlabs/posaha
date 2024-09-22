import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      role: TRole
      email: string
      deactivated?: boolean
    } & DefaultSession['user']
  }
}
