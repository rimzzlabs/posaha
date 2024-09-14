import { ProductCategoryDataTable } from '@/modules/product-category'
import { SpinnerCard } from '@/modules/shared/spinner-card'

import { random, sleep } from 'radash'
import { Suspense } from 'react'

export default async function ProductCategoryPage() {
  await sleep(random(1000, 2000))

  return (
    <Suspense fallback={<SpinnerCard />}>
      <ProductCategoryDataTable />
    </Suspense>
  )
}
