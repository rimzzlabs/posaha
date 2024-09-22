'use client'

import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import * as R from 'react'

export function SessionCheck() {
  let session = useSession()
  let pathname = usePathname()

  let isDeactivated = R.useMemo(
    () => session?.data?.user?.deactivated,
    [session?.data?.user?.deactivated],
  )

  R.useEffect(() => {
    if (isDeactivated) {
      ;(async () => await signOut())()
    }
  }, [pathname])

  return <R.Fragment />
}
