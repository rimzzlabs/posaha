import { getCategoryList } from '@/database/query/category'
import { ProductCategoryDataTable } from '@/modules/product-category'
import { SpinnerCard } from '@/modules/shared/spinner-card'
import { auth } from '@/server/next-auth'

import { O, pipe } from '@mobily/ts-belt'
import { toInt, tryit } from 'radash'
import { Suspense } from 'react'

export default async function ProductCategoryPage(props: TPageProps) {
  let session = await auth()

  console.info(session)
  let page = pipe(
    props?.searchParams?.page,
    O.fromNullable,
    O.mapWithDefault(1, (value) => toInt(value, 1)),
  )

  const [error, res] = await tryit(getCategoryList(page))(10)

  if (error) throw error

  return (
    <Suspense fallback={<SpinnerCard />}>
      <ProductCategoryDataTable data={res.data} page={res.meta.page} total={res.meta.total} />
    </Suspense>
  )
}
