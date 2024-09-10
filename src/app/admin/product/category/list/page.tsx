import { ProductCategoryDataTable } from '@/modules/product-category'

import { random, sleep } from 'radash'

export default async function ProductCategoryPage() {
  await sleep(random(1000, 2000))
  return <ProductCategoryDataTable />
}
