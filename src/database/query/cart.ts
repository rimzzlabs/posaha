import type {
  addOrAppendToCartSchema,
  deleteCartSchema,
  updateCartQuantitySchema,
} from '@/app/app/product/__schema'

import { DB } from '../config'
import { CART_ITEM_SCHEMA, PRODUCT_SCHEMA } from '../schema'

import { A, B, D, F, G, N, pipe } from '@mobily/ts-belt'
import { and, asc, eq, inArray, sql } from 'drizzle-orm'
import type { z } from 'zod'

export async function getCartItemsByUserId(userId: string) {
  let cartItems = await DB.query.CART_ITEM_SCHEMA.findMany({
    where: eq(CART_ITEM_SCHEMA.userId, userId),
    with: { product: { with: { category: true } } },
    orderBy: asc(CART_ITEM_SCHEMA.createdAt),
  })

  let items = await Promise.all(
    cartItems.map(async ({ product, id, createdAt, updatedAt, quantity }) => {
      if (product.deleted || product.stock === 0) {
        await DB.delete(CART_ITEM_SCHEMA).where(eq(CART_ITEM_SCHEMA.id, id))
        return null
      }

      let isExceedStock = quantity > product.stock
      if (isExceedStock) {
        let [updatedItem] = await DB.update(CART_ITEM_SCHEMA)
          .set({ quantity: product.stock })
          .where(eq(CART_ITEM_SCHEMA.id, id))
          .returning()

        if (!updatedItem) return null
        return { id, createdAt, updatedAt, product, quantity: updatedItem.quantity }
      }

      return { id, createdAt, updatedAt, product, quantity }
    }),
  )

  return pipe(
    items,
    A.filter((value) => value !== null),
    F.toMutable,
  )
}

export async function addOrAppendToCart(payload: z.infer<typeof addOrAppendToCartSchema>) {
  let product = await DB.query.PRODUCT_SCHEMA.findFirst({
    where: eq(PRODUCT_SCHEMA.id, payload.productId),
  })

  if (!product) throw new Error('Product not found')

  let isProductNotAvailable = pipe(
    product.deleted,
    F.equals(true),
    B.or(pipe(product.stock, N.lt(1))),
  )
  if (isProductNotAvailable) throw new Error('Product not available')

  let existingItem = await DB.query.CART_ITEM_SCHEMA.findFirst({
    where: and(
      eq(CART_ITEM_SCHEMA.userId, payload.userId),
      eq(CART_ITEM_SCHEMA.productId, product.id),
    ),
  })

  if (existingItem) {
    let quantity = pipe(existingItem.quantity, N.add(1))
    let [updatedItem] = await DB.update(CART_ITEM_SCHEMA)
      .set({ quantity })
      .where(eq(CART_ITEM_SCHEMA.id, existingItem.id))
      .returning()
    return updatedItem ?? null
  }

  let [newItem] = await DB.insert(CART_ITEM_SCHEMA)
    .values({ ...payload, quantity: 1 })
    .returning()

  return newItem ?? null
}

export async function updateCartQuantity(payload: z.infer<typeof updateCartQuantitySchema>) {
  let cartItem = await DB.query.CART_ITEM_SCHEMA.findFirst({
    where: eq(CART_ITEM_SCHEMA.id, payload.cartItemId),
    with: { product: true },
  })
  if (!cartItem) throw new Error('Cart item not found')

  let product = cartItem.product
  let isExceedStock = pipe(payload.quantity, N.gt(product.stock))
  if (isExceedStock) throw new Error('The requested quantity exceed the current product')

  let [newItem] = await DB.update(CART_ITEM_SCHEMA)
    .set({ quantity: payload.quantity, updatedAt: sql`now()` })
    .where(eq(CART_ITEM_SCHEMA.id, payload.cartItemId))
    .returning()

  if (!newItem) throw new Error('Failed to returning new updated item')

  return pipe(newItem, D.set('product', product), D.deleteKeys(['userId', 'productId']))
}

export async function deleteCarts(payload: z.infer<typeof deleteCartSchema>) {
  let cartItemId = payload.cartItemId

  if (G.isArray(cartItemId)) {
    const isClearCart = cartItemId.length === 0

    if (isClearCart) {
      let { rowCount } = await DB.delete(CART_ITEM_SCHEMA).where(
        eq(CART_ITEM_SCHEMA.userId, payload.userId),
      )

      return { deletedCount: rowCount }
    }

    const { rowCount } = await DB.delete(CART_ITEM_SCHEMA).where(
      inArray(CART_ITEM_SCHEMA.id, cartItemId),
    )

    return { deletedCount: rowCount }
  }

  let { rowCount } = await DB.delete(CART_ITEM_SCHEMA).where(eq(CART_ITEM_SCHEMA.id, cartItemId))

  return { deletedCount: rowCount }
}
