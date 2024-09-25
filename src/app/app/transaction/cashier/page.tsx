import { getProductList } from '@/database/query/product'
import { CashierWrapper } from '@/layouts/wrappers/cashier-wrapper'
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
    <CashierWrapper>
      <CashierProductDisplay
        search={search}
        products={products.data}
        page={products.meta.page}
        total={products.meta.total}
      />

      <CashierSidebarCart />
    </CashierWrapper>
  )
}
