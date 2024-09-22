import type { createUserSchema, deleteUserSchema } from '@/app/app/user/__schema/user-schema'

import { DB } from '../config'
import { USER_SCHEMA } from '../schema'
import { getSearchClause, getTableCount, queryReturn, queryReturnPagination } from '../utils'

import { A, D, F, pipe, S } from '@mobily/ts-belt'
import bcrypt from 'bcryptjs'
import { and, desc, eq, or, type SQL } from 'drizzle-orm'
import { omit } from 'radash'
import type { z } from 'zod'

const SALT = 10

export async function getUserByEmail(email: string) {
  let user = await DB.query.USER_SCHEMA.findFirst({ where: eq(USER_SCHEMA.email, email) })
  return queryReturn(user)
}

type TGetUserList = {
  page: number
  role: TRole
  limit?: number
  search?: string
}

export async function getUserList({ page, role, limit = 10, search = '' }: TGetUserList) {
  let offset = (page - 1) * limit
  let searchTerm = S.toLowerCase(search)

  let where = pipe(
    [] as Array<SQL>,
    F.ifElse(
      () => role === 'super-admin',
      A.append(or(eq(USER_SCHEMA.role, `admin`), eq(USER_SCHEMA.role, `cashier`))),
      F.identity,
    ),
    F.toMutable,
    F.ifElse(() => role === 'admin', A.append(eq(USER_SCHEMA.role, `cashier`)), F.identity),
    F.toMutable,
    A.append(
      pipe(searchTerm, getSearchClause(USER_SCHEMA.name, USER_SCHEMA.email, USER_SCHEMA.address)),
    ),
    F.toMutable,
    (clauses) => and(...clauses),
  )

  const data = await DB.select({
    id: USER_SCHEMA.id,
    image: USER_SCHEMA.image,
    email: USER_SCHEMA.email,
    name: USER_SCHEMA.name,
    role: USER_SCHEMA.role,
    address: USER_SCHEMA.address,
    createdAt: USER_SCHEMA.createdAt,
    updatedAt: USER_SCHEMA.updatedAt,
  })
    .from(USER_SCHEMA)
    .where(where)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(USER_SCHEMA.updatedAt))

  let rows = await pipe(USER_SCHEMA, getTableCount(where))
  let total = Math.ceil(rows / limit)

  return pipe(data, queryReturnPagination({ limit, page, rows, total }))
}

export async function createUser(payload: z.infer<typeof createUserSchema>) {
  let user = omit(payload, ['password'])
  let password = await bcrypt.hash(payload.password, SALT)

  let values = D.merge(user, { password })

  let [data] = await DB.insert(USER_SCHEMA)
    .values(values)
    .returning({ id: USER_SCHEMA.id, name: USER_SCHEMA.name })

  return queryReturn(data)
}

export async function deleteUser(payload: z.infer<typeof deleteUserSchema>) {
  let [user] = await DB.delete(USER_SCHEMA)
    .where(eq(USER_SCHEMA.id, payload.id))
    .returning({ id: USER_SCHEMA.id })

  return queryReturn(user)
}

export async function updateUser(
  payload: Partial<typeof USER_SCHEMA.$inferInsert> & { id: string },
) {
  let [user] = await DB.update(USER_SCHEMA)
    .set(omit(payload, ['id']))
    .where(eq(USER_SCHEMA.id, payload.id))
    .returning({ id: USER_SCHEMA.id })

  return queryReturn(user)
}
