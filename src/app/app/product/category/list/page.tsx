import { getCategoryList } from '@/database/query/category'
import { ProductCategoryDataTable } from '@/modules/product-category'
import { SpinnerCard } from '@/modules/shared/spinner-card'

import { F, O, pipe } from '@mobily/ts-belt'
import { toInt } from 'radash'
import { Suspense } from 'react'

export default async function ProductCategoryPage(props: TPageProps) {
  let search = pipe(O.fromNullable(props.searchParams?.search), O.mapWithDefault('', F.identity))
  let page = pipe(
    props?.searchParams?.page,
    O.fromNullable,
    O.mapWithDefault(1, (value) => toInt(value, 1)),
  )

  const res = await getCategoryList({ page, search, limit: 10 })

  return (
    <Suspense fallback={<SpinnerCard />}>
      <ProductCategoryDataTable data={res.data} page={res.meta.page} total={res.meta.total} />
    </Suspense>
  )
}
