import { SalesDataTable } from '@/modules/sales'
import { SpinnerCard } from '@/modules/shared/spinner-card'

import { faker } from '@faker-js/faker/locale/id_ID'
import { A, D, F, N, pipe, S } from '@mobily/ts-belt'
import { random, sleep, toFloat, uid } from 'radash'
import { Suspense } from 'react'

export default async function AdminSalesPage() {
  let sales = await getSalesData()

  return (
    <Suspense fallback={<SpinnerCard />}>
      <SalesDataTable data={sales} />
    </Suspense>
  )
}

async function getSalesData() {
  await sleep(random(100, 1000))

  const MAX_ITEMS = 100
  return pipe(
    MAX_ITEMS,
    A.makeWithIndex((index) => ({
      index,
      id: uid(16),
      qty: random(1, 10),
      cashier: { id: uid(16), name: faker.person.fullName() },
      remark: faker.commerce.productDescription(),
      createdAt: faker.date.recent({ days: N.add(1)(index) }).toISOString(),
      updatedAt: faker.date.recent({ days: N.add(1)(index) }).toISOString(),
    })),
    A.map((sales) => {
      let productName = faker.commerce.productName()
      let stock = random(50, 250)
      let sold = random(0, stock)
      let timestamp = faker.date.recent({ days: N.add(1)(sales.index) }).toISOString()

      return pipe(
        sales,
        D.merge({
          product: {
            id: uid(10),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            image: faker.image.url({ height: 48, width: 48 }),
            price: toFloat(faker.commerce.price({ min: 5000, max: 125000 }), 0),
            sku: pipe(productName, S.replaceByRe(/\s+/g, '-'), S.toUpperCase, S.prepend('POS-')),
            sold,
            stock,
            category: {
              id: uid(10),
              color: faker.color.rgb(),
              name: faker.color.human(),
              createdAt: timestamp,
              updatedAt: timestamp,
            },
            createdAt: timestamp,
            updatedAt: timestamp,
          } as Product,
        }),
      )
    }),
    A.map(D.deleteKey('index')),
    A.map((sale) => pipe(sale, D.merge({ total: pipe(sale.qty, N.multiply(sale.product.price)) }))),
    F.toMutable,
  )
}
