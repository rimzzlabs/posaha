import { ProductCategoryDataTable } from '@/modules/product-category'

import { Suspense } from 'react'

export default function ProductCategoryPage() {
  return (
    <Suspense>
      <ProductCategoryDataTable />
    </Suspense>
  )
}
