import { ProductDataTable } from '@/modules/product/product-data-table'

import { random, sleep } from 'radash'

export default async function ProductPage() {
  await sleep(random(1000, 2000))
  return <ProductDataTable />
}
