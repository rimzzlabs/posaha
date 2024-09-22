import { createCategorySchema, deleteCategorySchema } from '@/app/app/product/__schema'
import { dbQueryReturn } from '@/lib/req-res'

import { DB } from '../config'
import { CATEGORY_SCHEMA } from '../schema'
import {
  getOffsetClause,
  getSearchClause,
  getTableCount,
  getTotalPageByLimit,
  mergeClauseWithAnd,
} from '../utils'

import { A, F, pipe, S } from '@mobily/ts-belt'
import { desc, eq, type SQL } from 'drizzle-orm'
import { z } from 'zod'

export function getCategoryList(page: number) {
  return async (limit = 10, search = '') => {
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

    return dbQueryReturn('success-paginate')(data, { page, limit, rows, total })
  }
}

export async function getAllCategoryList() {
  return await DB.query.CATEGORY_SCHEMA.findMany({ orderBy: desc(CATEGORY_SCHEMA.updatedAt) })
}

export async function createCategory(payload: z.infer<typeof createCategorySchema>) {
  return await DB.insert(CATEGORY_SCHEMA).values(payload).returning({ id: CATEGORY_SCHEMA.id })
}

export async function deleteCategory(payload: z.infer<typeof deleteCategorySchema>) {
  return await DB.delete(CATEGORY_SCHEMA)
    .where(eq(CATEGORY_SCHEMA.id, payload.id))
    .returning({ id: CATEGORY_SCHEMA.id })
}
