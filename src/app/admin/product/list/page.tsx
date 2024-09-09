import { ProductDataTable } from '@/modules/product/product-data-table'

import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <ProductDataTable />
    </Suspense>
  )
}
