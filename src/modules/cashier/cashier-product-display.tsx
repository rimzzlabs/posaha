import { Card, CardContent } from '@/components/ui/card'
import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { formatPrice } from '@/lib/number'

import { CashierProductDisplayHeader } from './cashier-product-display-header'
import { CashierProductDisplayItem } from './cashier-product-display-item'

import { faker } from '@faker-js/faker/locale/id_ID'
import { A, pipe } from '@mobily/ts-belt'
import { random, sleep, toFloat, uid } from 'radash'
import { Suspense } from 'react'

export async function TransactionCashierProductDisplay() {
  let products = await fetchProductList()

  return (
    <Card>
      <Suspense fallback={<Skeleton className='h-10 w-full' />}>
        <CashierProductDisplayHeader />
      </Suspense>

      <CardContent>
        <ScrollArea className='h-[calc(100vh-16.5rem)]'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-2.5 2xl:gap-4'>
            <For each={products}>
              {(product) => <CashierProductDisplayItem {...product} key={product.id} />}
            </For>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

async function fetchProductList() {
  await sleep(random(50, 1200))
  return pipe(
    30,
    A.makeWithIndex(() => ({
      id: uid(14),
      name: faker.commerce.productName(),
      image: faker.image.urlLoremFlickr({ width: 265, height: 148 }),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 10, max: 250 }),
      price: pipe({ min: 5000, max: 150_000 }, faker.commerce.price, toFloat, formatPrice),
      category: { name: faker.commerce.department() },
    })),
  )
}
