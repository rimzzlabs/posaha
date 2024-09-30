import type {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from '@/app/app/product/__schema'

import { DB } from '../config'
import { CATEGORY_SCHEMA } from '../schema'
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
import { desc, eq, type SQL } from 'drizzle-orm'
import type { z } from 'zod'

export async function getAllCategoryList() {
  let res = await DB.query.CATEGORY_SCHEMA.findMany({ orderBy: desc(CATEGORY_SCHEMA.updatedAt) })

  return queryReturn(res)
}

type TGetCategoryList = {
  page: number
  limit?: number
  search?: string
}
export async function getCategoryList({ page, limit = 10, search = '' }: TGetCategoryList) {
  let offset = pipe(page, getOffsetClause(limit))
  let searchTerm = pipe(search, S.toLowerCase)

  let where = pipe(
    [] as Array<SQL>,
    A.append(pipe(searchTerm, getSearchClause(CATEGORY_SCHEMA.name))),
    F.toMutable,
    mergeClauseWithAnd,
  )

  const data = await DB.select()
    .from(CATEGORY_SCHEMA)
    .where(where)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(CATEGORY_SCHEMA.updatedAt))

  let rows = await pipe(CATEGORY_SCHEMA, getTableCount(where))

  let total = pipe(rows, getTotalPageByLimit(limit))

  return pipe(data, queryReturnPagination({ limit, page, rows, total }))
}

export async function createCategory(payload: z.infer<typeof createCategorySchema>) {
  let [category] = await DB.insert(CATEGORY_SCHEMA)
    .values(payload)
    .returning({ id: CATEGORY_SCHEMA.id })

  return queryReturn(category)
}

export async function deleteCategory(payload: z.infer<typeof deleteCategorySchema>) {
  let [category] = await DB.delete(CATEGORY_SCHEMA)
    .where(eq(CATEGORY_SCHEMA.id, payload.id))
    .returning({ id: CATEGORY_SCHEMA.id })

  return queryReturn(category)
}

export async function updateCategory(payload: z.infer<typeof updateCategorySchema>) {
  let [product] = await DB.update(CATEGORY_SCHEMA)
    .set({
      name: payload.name,
      color: payload.color,
    })
    .where(eq(CATEGORY_SCHEMA.id, payload.categoryId))
    .returning({ id: CATEGORY_SCHEMA.id })

  return queryReturn(product)
}
