import { getProductList } from '@/database/query/product'
import { CashierProductDisplay, CashierSidebarCart } from '@/modules/cashier'
import { auth } from '@/server/next-auth'

import { F, O, pipe } from '@mobily/ts-belt'
import { redirect, RedirectType } from 'next/navigation'
import { toInt } from 'radash'

export default async function TransactionCashierPage(props: TPageProps) {
  let session = await auth()

  let role = pipe(
    O.fromNullable(session),
    O.map((session) => session.user.role),
  )
  if (role !== 'cashier') redirect('/app', RedirectType.replace)

  let search = pipe(O.fromNullable(props.searchParams?.search), O.mapWithDefault('', F.identity))
  let page = pipe(
    O.fromNullable(props.searchParams?.page),
    O.mapWithDefault('1', F.identity),
    toInt,
  )
  let products = await getProductList({ page, search, limit: 20 })

  return (
    <div className='grid gap-2.5 xl:grid-cols-[minmax(480px,768px)_minmax(324px,1fr)] 3xl:grid-cols-[minmax(768px,1196px)_minmax(440px,1fr)]'>
      <CashierProductDisplay
        search={search}
        products={products.data}
        page={products.meta.page}
        total={products.meta.total}
      />

      <div className='max-md:hidden'>
        <CashierSidebarCart />
      </div>
    </div>
  )
}
