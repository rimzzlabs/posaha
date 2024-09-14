import { SalesDataTable } from '@/modules/sales'

import { faker } from '@faker-js/faker/locale/id_ID'
import { A, D, F, N, pipe, S } from '@mobily/ts-belt'
import { omit, random, sleep, toFloat, uid } from 'radash'
import { Suspense } from 'react'

export default async function AdminSalesPage() {
  let sales = await getSalesData()

  return (
    <Suspense>
      <SalesDataTable data={sales} />
    </Suspense>
  )
}

async function getSalesData(): Promise<Array<Sales>> {
  await sleep(random(100, 1000))

  const MAX_ITEMS = 100
  return pipe(
    MAX_ITEMS,
    A.makeWithIndex((n) => {
      let timestamp = faker.date.recent({ days: N.add(n)(1) }).toISOString()

      return {
        id: uid(8),
        qty: random(1, 50),
        remark: '',
        createdAt: timestamp,
        updatedAt: timestamp,
      }
    }),
    A.map(
      D.merge({
        cashier: {
          id: uid(8),
          name: faker.person.fullName(),
        },
      }),
    ),
    A.map(
      D.merge({
        stock: {
          id: uid(8),
          available: random(100, 150),
          sold: 0,
          createdAt: faker.date.recent().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
        },
      }),
    ),
    A.map(
      D.merge({
        category: {
          id: uid(8),
          color: faker.color.rgb(),
          name: faker.commerce.department(),
          createdAt: faker.date.recent().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
        },
      }),
    ),
    A.map((sale) => ({
      ...sale,
      product: {
        id: uid(8),
        name: faker.commerce.productName(),
        price: toFloat(faker.commerce.price({ min: 5000, max: 150_000 }), 5000),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      },
    })),
    A.map((sale) => ({
      ...sale,
      product: {
        ...sale.product,
        sku: pipe(sale.product.name, S.replaceByRe(/\s+/g, '-'), S.toUpperCase, S.prepend('POS-')),
      },
    })),
    A.map((sale) => ({
      ...sale,
      stock: { ...sale.stock, sold: sale.qty, available: sale.stock.available - sale.qty },
    })),
    A.map((sale) => ({
      ...omit(sale, ['product', 'stock', 'category']),
      product: {
        ...sale.product,
        product: sale.product,
        category: sale.category,
        stock: sale.stock,
      },
      total: pipe(sale.qty, N.multiply(sale.product.price)),
    })),
    F.toMutable,
  )
}

/**
 *    A.makeWithIndex((n) => {
      let timestamp = faker.date.recent({ days: n }).toISOString()
      let name = faker.commerce.productName()
      let sku = pipe(name, S.replaceByRe(/\s+/g, '-'), S.toUpperCase, S.prepend('POS-'))
      let cashier = { id: uid(12), name: faker.person.fullName() }

      let category: ProductCategory = {
        id: uid(8),
        color: faker.color.rgb(),
        createdAt: timestamp,
        updatedAt: timestamp,
        name: faker.commerce.department(),
      }
      let product = {
        id: uid(12),
        name,
        sku,
        category,
        createdAt: timestamp,
        updatedAt: timestamp,
        price: toFloat(faker.commerce.price({ min: 5000, max: 100_000 }), 5000),
      }
      let id = uid(12)
      let qty = random(1, 10)
      let total = pipe(product.price, N.multiply(qty))
      let stockAvbl = random(100, 200)

      let stock: ProductStock = {
        id: uid(8),
        available: stockAvbl - qty,
        sold: qty,
        createdAt: timestamp,
        updatedAt: timestamp,
      }

      let actualProduct: Product = { ...product, stock }

      return {
        id,
        cashier,
        qty,
        total,
        product: actualProduct,
        remark: '',
        createdAt: timestamp,
        updatedAt: timestamp,
      } as Sales
    }),
 */
