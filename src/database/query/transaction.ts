import type { TCreateTransactionSchema } from '@/app/app/product/__schema'

import { DB } from '../config'
import {
  CART_ITEM_SCHEMA,
  PRODUCT_SCHEMA,
  TRANSACTION_ITEM_SCHEMA,
  TRANSACTION_SCHEMA,
} from '../schema'
import { getOffsetClause, mergeClauseWithAnd } from '../utils'

import { A, F, N, pipe } from '@mobily/ts-belt'
import type { SQL } from 'drizzle-orm'
import { eq } from 'drizzle-orm'

type TGetUserTransactionList = TPrettify<TQueryArg & { userId: string }>
export async function getUserTransactionList({
  userId,
  page,
  limit = 10,
}: TGetUserTransactionList) {
  let offset = pipe(page, getOffsetClause(limit))

  let where = pipe(
    [] as Array<SQL>,
    A.append(eq(TRANSACTION_SCHEMA.userId, userId)),
    mergeClauseWithAnd,
  )

  return await DB.query.TRANSACTION_SCHEMA.findMany({
    where,
    offset,
    limit,
    with: { items: { with: { product: true } } },
    orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
  })
}

export async function createTransaction(data: TCreateTransactionSchema) {
  let customerChange = pipe(
    data.totalAmount,
    N.subtract(data.total),
    F.ifElse(
      N.lt(0),
      () => '0.00',
      (change) => String(change),
    ),
  )

  const [transaction] = await DB.insert(TRANSACTION_SCHEMA)
    .values({
      customerChange: customerChange,
      userId: String(data.userId),
      customerMoney: String(data.totalAmount),
      totalAmount: String(data.total),
    })
    .returning()
  if (!transaction) throw new Error('Server error')

  const items = await Promise.all(
    data.cartItems.map(async (item) => {
      // Fetch the current product to get its price and update stock
      await DB.query.PRODUCT_SCHEMA.findFirst({
        where: (product) => eq(product.id, item.productId),
      })
      const product = await DB.query.PRODUCT_SCHEMA.findFirst({
        where: (product) => eq(product.id, item.productId),
      })

      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`)
      }

      await DB.update(PRODUCT_SCHEMA)
        .set({
          stock: product.stock - item.quantity,
          sold: product.sold + item.quantity,
        })
        .where(eq(PRODUCT_SCHEMA.id, item.productId))

      // Create transaction item
      const [transactionItem] = await DB.insert(TRANSACTION_ITEM_SCHEMA)
        .values({
          transactionId: transaction.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        })
        .returning()

      return transactionItem
    }),
  )
  await DB.delete(CART_ITEM_SCHEMA).where(eq(CART_ITEM_SCHEMA.userId, data.userId))

  let transactionItems = pipe(
    items,
    A.filter((value) => !!value),
    F.toMutable,
  )
  return {
    transaction,
    transactionItems,
  }
}
