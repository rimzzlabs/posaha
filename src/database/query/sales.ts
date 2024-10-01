import { formatDate } from '@/lib/dates'

import { DB } from '../config'
import { TRANSACTION_SCHEMA } from '../schema'
import { getOffsetClause, getTotalPageByLimit, queryReturn, queryReturnPagination } from '../utils'

import { A, D, F, N, O, pipe } from '@mobily/ts-belt'
import { addMonths, startOfMonth } from 'date-fns'
import { eq, sql } from 'drizzle-orm'
import { sort, toFloat } from 'radash'

export type TSalesListResult = Awaited<ReturnType<typeof getSalesList>>
export async function getSalesList({ page, userId, limit = 10 }: TQueryArg & { userId?: string }) {
  let offset = pipe(page, getOffsetClause(limit))

  let where = userId ? eq(TRANSACTION_SCHEMA.userId, userId) : undefined
  let [transactions, rowsData] = await Promise.all([
    DB.query.TRANSACTION_SCHEMA.findMany({
      offset,
      limit,
      where,
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
      remark: trx.remark,
      createdAt: trx.createdAt,
      totalAmount: trx.totalAmount,
      paymentMethod: trx.paymentMethod,
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

export type TGetDashboardResult = Awaited<ReturnType<typeof getDashboard>>
export async function getDashboard() {
  let [transactions, products, cashier] = await Promise.all([
    DB.query.TRANSACTION_SCHEMA.findMany({
      with: { items: { with: { product: true } }, user: true },
    }),
    DB.query.PRODUCT_SCHEMA.findMany(),
    DB.query.USER_SCHEMA.findMany({ where: (user, clause) => clause.eq(user.role, 'cashier') }),
  ])

  let totalProduct = pipe(products, A.length)
  let totalCashier = pipe(cashier, A.length)
  let totalRevenue = pipe(
    transactions,
    A.reduce(0, (acc, value) => N.add(acc, toFloat(value.totalAmount, 0))),
  )
  let totalProductSold = pipe(
    products,
    A.filter((product) => N.gt(product.sold, 0)),
    A.length,
  )

  let latestTransactions = pipe(
    transactions,
    A.map((trx) => ({
      id: trx.id,
      totalAmount: trx.totalAmount,
      createdAt: trx.createdAt,
      totalQuantity: pipe(
        trx.items,
        A.map((item) => item.quantity),
        A.reduce(0, N.add),
      ),
      cashier: trx.user?.name ?? '',
    })),
    F.toMutable,
    (value) => sort(value, (item) => new Date(item.createdAt).getTime(), true),
  )

  const today = new Date()
  const monthLabels = A.map(A.range(-11, 0), (i) =>
    formatDate(startOfMonth(addMonths(today, i)), 'MMMM yyyy'),
  )

  // Create a revenue Map initialized to zero for each month
  const revenueMap = new Map<string, number>()
  monthLabels.forEach((month) => {
    revenueMap.set(month, 0)
  })

  // Populate the revenue Map with actual transaction data
  transactions.forEach((trx) => {
    const month = formatDate(startOfMonth(new Date(trx.createdAt)), 'MMMM yyyy')
    const revenue = toFloat(trx.totalAmount, 0)
    if (revenueMap.has(month)) {
      const currentRevenue = revenueMap.get(month) || 0
      revenueMap.set(month, currentRevenue + revenue)
    }
  })

  // Convert Map to array for chart data
  const chartData = pipe(
    monthLabels,
    A.map((month) => ({
      month,
      revenue: revenueMap.get(month) || 0,
    })),
    F.toMutable,
  )

  return queryReturn({
    cards: { totalRevenue, totalProductSold, totalProduct, totalCashier },
    transactions: latestTransactions,
    chartData,
  })
}
