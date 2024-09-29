import { getSalesList } from '@/database/query/sales'
import { SalesDataTable } from '@/modules/sales'
import { auth } from '@/server/next-auth'

import { F, O, pipe } from '@mobily/ts-belt'
import { redirect, RedirectType } from 'next/navigation'
import { toInt } from 'radash'

export default async function AdminSalesPage(props: TPageProps) {
  let session = await auth()
  if (!session) redirect('/auth/signin', RedirectType.replace)

  let page = pipe(
    O.fromNullable(props.searchParams?.page),
    O.mapWithDefault('1', F.identity),
    toInt,
  )
  let salesList = await getSalesList({ page })

  return <SalesDataTable {...salesList} />
}
