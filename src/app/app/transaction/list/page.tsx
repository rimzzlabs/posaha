import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { getSalesList } from '@/database/query/sales'
import { CASHIER_TRANSACTION_DATA_TABLE_COLUMN } from '@/modules/cashier/transaction'
import { DataTableUI } from '@/modules/shared/data-table'
import { auth } from '@/server/next-auth'

import { F, O, pipe } from '@mobily/ts-belt'
import { redirect } from 'next/navigation'
import { toInt } from 'radash'

export default async function TransactionListPage(props: TPageProps) {
  let session = await auth()
  if (!session) redirect('/auth/signin')

  let page = pipe(
    O.fromNullable(props.searchParams?.page),
    O.mapWithDefault('1', F.identity),
    toInt,
  )
  let { data, meta } = await getSalesList({ userId: session.user.id, page })

  return (
    <Card>
      <CardHeader className='pb-12'>
        <CardTitle>Daftar Transaksi</CardTitle>
        <CardDescription>Berikut adalah daftar transaksi yang anda lakukan</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTableUI
          data={data}
          page={meta.page}
          total={meta.total}
          columns={CASHIER_TRANSACTION_DATA_TABLE_COLUMN}
        />
      </CardContent>
    </Card>
  )
}
