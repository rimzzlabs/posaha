import type { createProductSchema, updateProductSchema } from '@/app/app/product/__schema'

import { DB } from '../config'
import { PRODUCT_SCHEMA } from '../schema/product'
import {
  getOffsetClause,
  getSearchClause,
  getTableCount,
  getTotalPageByLimit,
  mergeClauseWithAnd,
  queryReturn,
  queryReturnPagination,
} from '../utils'

import { A, F, pipe, S } from '@mobily/ts-belt'
import { desc, eq, sql, type SQL } from 'drizzle-orm'
import type { z } from 'zod'

export async function getProductById(id: string) {
  let product = await DB.query.PRODUCT_SCHEMA.findFirst({
    where: eq(PRODUCT_SCHEMA.id, id),
    with: { category: true },
  })

  return queryReturn(product)
}

export async function getProductList({ page, limit = 10, search = '' }: TQueryArg) {
  let offset = pipe(page, getOffsetClause(limit))
  let searchTerm = pipe(search, S.toLowerCase)

  let where = pipe(
    [] as Array<SQL>,
    A.append(
      pipe(
        searchTerm,
        getSearchClause(PRODUCT_SCHEMA.name, PRODUCT_SCHEMA.sku, PRODUCT_SCHEMA.description),
      ),
    ),
    F.toMutable,
    A.append(eq(PRODUCT_SCHEMA.deleted, false)),
    mergeClauseWithAnd,
  )

  const data = await DB.query.PRODUCT_SCHEMA.findMany({
    where,
    limit,
    offset,
    with: { category: true },
    orderBy: desc(PRODUCT_SCHEMA.updatedAt),
  })

  let rows = await pipe(PRODUCT_SCHEMA, getTableCount(where))

  let total = pipe(rows, getTotalPageByLimit(limit))

  return pipe(data, queryReturnPagination({ limit, page, rows, total }))
}

export async function createProduct(payload: z.infer<typeof createProductSchema>) {
  let [product] = await DB.insert(PRODUCT_SCHEMA)
    .values({
      name: payload.name,
      price: payload.price,
      sku: payload.sku,
      image: payload.image,
      stock: payload.stock,
      categoryId: payload.category,
      description: payload.description,
    })
    .returning({ id: PRODUCT_SCHEMA.id })

  return queryReturn(product)
}

export async function updateProduct(payload: z.infer<typeof updateProductSchema>) {
  let [product] = await DB.update(PRODUCT_SCHEMA)
    .set({
      name: payload.name,
      price: payload.price,
      sku: payload.sku,
      image: payload.image,
      stock: payload.stock,
      categoryId: payload.category,
      description: payload.description,
      updatedAt: sql`now()`,
    })
    .where(eq(PRODUCT_SCHEMA.id, payload.id))
    .returning({ id: PRODUCT_SCHEMA.id })

  return queryReturn(product)
}

export async function deleteProduct(id: string) {
  let product = await DB.query.PRODUCT_SCHEMA.findFirst({ where: eq(PRODUCT_SCHEMA.id, id) })
  if (!product) throw new Error('Product is not found with this id')

  let [data] = await DB.update(PRODUCT_SCHEMA)
    .set({ deleted: true, deletedAt: new Date() })
    .where(eq(PRODUCT_SCHEMA.id, id))
    .returning({ id: PRODUCT_SCHEMA.id })

  return queryReturn(data)
}
