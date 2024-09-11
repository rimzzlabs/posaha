import { ProductDataTable } from '@/modules/product/product-data-table'

import { random, sleep } from 'radash'
import { Suspense } from 'react'

export default async function ProductPage() {
  await sleep(random(1000, 2000))

  return (
    <Suspense>
      <ProductDataTable />
    </Suspense>
  )
}
