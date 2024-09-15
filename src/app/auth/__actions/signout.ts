'use server'

import { actionReturn } from '@/lib/req-res'
import { signOut } from '@/server/next-auth'

import { createSafeActionClient } from 'next-safe-action'

export let signOutAction = createSafeActionClient().action(async () => {
  await signOut()
  return actionReturn('success')({ signed: false })
})
