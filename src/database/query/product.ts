import { createProductSchema, updateProductSchema } from '@/app/app/product/__schema'
import { deleteImage, getPublicId } from '@/lib/configs/cloudinary'
import { dbQueryReturn } from '@/lib/req-res'

import { DB } from '../config'
import { PRODUCT_SCHEMA } from '../schema/product'
import {
  getOffsetClause,
  getSearchClause,
  getTableCount,
  getTotalPageByLimit,
  mergeClauseWithAnd,
} from '../utils'

import { A, F, O, pipe, S } from '@mobily/ts-belt'
import { desc, eq, sql, type SQL } from 'drizzle-orm'
import { isString } from 'radash'
import { z } from 'zod'

export function getProductList(page: number) {
  return async (limit = 10, search = '') => {
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

    return dbQueryReturn('success-paginate')(data, { page, limit, rows, total })
  }
}

export async function getProductById(id: string) {
  return await DB.query.PRODUCT_SCHEMA.findFirst({
    where: eq(PRODUCT_SCHEMA.id, id),
    with: { category: true },
  })
}

export async function createProduct(payload: z.infer<typeof createProductSchema>) {
  return await DB.insert(PRODUCT_SCHEMA)
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
}

export async function updateProduct(payload: z.infer<typeof updateProductSchema>) {
  return await DB.update(PRODUCT_SCHEMA)
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
}

export async function deleteProduct(id: string) {
  let product = await DB.query.PRODUCT_SCHEMA.findFirst({ where: eq(PRODUCT_SCHEMA.id, id) })
  if (!product) throw new Error('Product is not found with this id')

  if (product.image) {
    let res = await deleteImage(getPublicId(product.image))
    if (isString(res)) {
      console.info('(LOG ERR) image deletion when deleting produc error, reaseon: ', res)
    }
  }

  let [res] = await DB.delete(PRODUCT_SCHEMA)
    .where(eq(PRODUCT_SCHEMA.id, id))
    .returning({ id: PRODUCT_SCHEMA.id })

  return pipe(
    res?.id,
    O.fromNullable,
    O.mapWithDefault({ id }, (productId) => ({ id: productId })),
  )
}
