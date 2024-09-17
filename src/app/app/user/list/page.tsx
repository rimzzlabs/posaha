import { getUserList } from '@/database/query/user'
import { UserDataTable } from '@/modules/user'
import { auth } from '@/server/next-auth'

import { D, F, O, pipe } from '@mobily/ts-belt'
import { redirect } from 'next/navigation'
import { toInt } from 'radash'
import { match } from 'ts-pattern'

export default async function ListUserPage(props: TPageProps) {
  let session = await auth()
  let page = pipe(props.searchParams, D.getUnsafe('page'), O.mapWithDefault('1', F.identity), toInt)

  let role = pipe(session?.user.role, O.fromNullable, O.mapWithDefault('cashier', F.identity))
  let userList = await getUserList(page, role)(10)

  let res = match(userList)
    .with({ ok: true }, (value) => D.deleteKey(value, 'ok'))
    .otherwise(() => ({ meta: { page: 1, total: 0 }, data: [] }))

  if (role === 'cashier') {
    redirect('/app')
  }

  return <UserDataTable data={res.data} page={res.meta.page} total={res.meta.total} />
}
