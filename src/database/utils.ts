import { DB } from './config'

import { A, F, O, pipe } from '@mobily/ts-belt'
import { and, type Column, ilike, or, sql, type Subquery, type SQL } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'
import type { PgViewBase } from 'drizzle-orm/pg-core/view-base'

export function getSearchClause(...args: Array<Column>) {
  return (search: string) => {
    return pipe(
      args,
      O.match(F.identity, () => [] as typeof args),
      F.toMutable,
      A.reduce([] as Array<SQL>, (clauses, clause) => [...clauses, ilike(clause, `%${search}%`)]),
      (clauses) => or(...clauses),
    )
  }
}

export function getOffsetClause(limit = 10) {
  return (page = 1) => {
    return (page - 1) * limit
  }
}

export function mergeClauseWithAnd(clauses: Array<SQL> | Readonly<Array<SQL>>) {
  return and(...clauses)
}

export function getTableCount(where: SQL | undefined) {
  return async <T extends PgTable | Subquery | PgViewBase | SQL>(column: T) => {
    let [res] = await DB.select({ rows: sql`count(*)`.mapWith(Number) })
      .from(column)
      .where(where)

    return res?.rows ?? 0
  }
}

export function getTotalPageByLimit(limit = 10) {
  return (rows = 1) => Math.ceil(rows / limit)
}

export function queryReturn<D>(data: D) {
  return { data, message: 'success' }
}

type TMetaPagination = { page: number; limit: number; total: number; rows: number }
export function queryReturnPagination(meta: TMetaPagination) {
  return <D>(data: Array<D>) => ({ meta, data, message: 'sucess' })
}
