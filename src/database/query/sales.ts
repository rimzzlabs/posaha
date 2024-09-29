import { DB } from '../config'
import { TRANSACTION_SCHEMA } from '../schema'
import { getOffsetClause, getTotalPageByLimit, queryReturnPagination } from '../utils'

import { A, D, F, O, pipe } from '@mobily/ts-belt'
import { sql } from 'drizzle-orm'

export type TSalesListResult = Awaited<ReturnType<typeof getSalesList>>
export async function getSalesList({ page, limit = 10 }: TQueryArg) {
  let offset = pipe(page, getOffsetClause(limit))

  let [transactions, rowsData] = await Promise.all([
    DB.query.TRANSACTION_SCHEMA.findMany({
      offset,
      limit,
      orderBy: (transaction, { desc }) => [desc(transaction.createdAt)],
      with: { items: { with: { product: true } }, user: true },
    }),
    DB.select({ rows: sql`count(*)`.mapWith(Number) }).from(TRANSACTION_SCHEMA),
  ])

  let rows = pipe(rowsData, A.get(0), O.mapWithDefault(0, D.getUnsafe('rows')))
  let total = pipe(rows, getTotalPageByLimit(limit))

  let data = pipe(
    transactions,
    A.map((trx) => ({
      id: trx.id,
      user: trx.user,
      createdAt: trx.createdAt,
      totalAmount: trx.totalAmount,
      customerMoney: trx.customerMoney,
      customerChange: trx.customerChange,
      totalQuantity: pipe(trx.items, A.length),
      items: pipe(
        trx.items,
        A.map((item) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          subTotal: item.price,
          image: item.product.image,
          quantity: item.quantity,
          price: item.product.price,
        })),
        F.toMutable,
      ),
    })),
    F.toMutable,
  )

  return queryReturnPagination({ page, limit, rows, total })(data)
}
