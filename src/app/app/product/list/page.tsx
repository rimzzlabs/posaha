import { ProductDataTable } from '@/modules/product/product-data-table'
import { SpinnerCard } from '@/modules/shared/spinner-card'

import { random, sleep } from 'radash'
import { Suspense } from 'react'

export default async function ProductPage() {
  await sleep(random(1000, 2000))

  return (
    <Suspense fallback={<SpinnerCard />}>
      <ProductDataTable />
    </Suspense>
  )
}
