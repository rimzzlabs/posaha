import { getProductList } from '@/database/query/product'
import { ProductDataTable } from '@/modules/product/product-data-table'

import { F, O, pipe } from '@mobily/ts-belt'
import { toInt } from 'radash'

export default async function ProductPage(props: TPageProps) {
  let page = pipe(
    O.fromNullable(props.searchParams?.page),
    O.mapWithDefault('1', F.identity),
    toInt,
  )
  let search = pipe(O.fromNullable(props.searchParams?.search), O.mapWithDefault('', F.identity))

  const res = await getProductList(page)(10, search)

  return <ProductDataTable data={res.data} page={res.meta.page} total={res.meta.total} />
}
