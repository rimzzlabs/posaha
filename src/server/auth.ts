import { getUserByEmail } from '@/database/query/user'
import { actionReturn } from '@/lib/req-res'

import { D } from '@mobily/ts-belt'
import bcrypt from 'bcryptjs'
import { tryit } from 'radash'

function verifyPassword(input: string) {
  return async (password: string) => {
    return await bcrypt.compare(input, password)
  }
}

export function verifyCredentials(email: string) {
  return async (password: string) => {
    const [error, res] = await tryit(getUserByEmail)(email)

    if (error) return actionReturn('error')('Server Error')
    if (!res.data) return actionReturn('error')('Deactivated Error')
    if (res.data === 'invalid credentials') return actionReturn('error')('Invalid Credential')

    let isMatch = await verifyPassword(password)(res.data.password)
    if (isMatch) {
      if (res.data.deleted) return actionReturn('error')('Deactivated Error')

      return actionReturn('success')(D.deleteKey(res.data, 'password'))
    }
    return actionReturn('error')('Invalid Credential')
  }
}
