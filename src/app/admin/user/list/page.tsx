import { UserDataTable } from '@/modules/user'

import { random, sleep } from 'radash'
import { Suspense } from 'react'

export default async function ListUserPage() {
  await sleep(random(800, 1000))

  return (
    <Suspense>
      <UserDataTable />
    </Suspense>
  )
}
