import { getUserList } from '@/database/query/user'
import { UserDataTable } from '@/modules/user'
import { auth } from '@/server/next-auth'

import { D, F, O, pipe } from '@mobily/ts-belt'
import { redirect, RedirectType } from 'next/navigation'
import { toInt } from 'radash'

export default async function ListUserPage(props: TPageProps) {
  let session = await auth()
  let page = pipe(props.searchParams, D.getUnsafe('page'), O.mapWithDefault('1', F.identity), toInt)

  let role = pipe(session?.user.role, O.fromNullable, O.mapWithDefault('cashier', F.identity))
  let res = await getUserList({ page, role, search: props.searchParams?.search, limit: 10 })

  if (role === 'cashier') {
    redirect('/app', RedirectType.replace)
  }

  return <UserDataTable data={res.data} page={res.meta.page} total={res.meta.total} />
}
