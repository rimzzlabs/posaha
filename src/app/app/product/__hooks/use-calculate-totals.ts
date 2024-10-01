import { NEXT_PUBLIC_TAX_FEE } from '@/lib/configs/environment-client'

import { A, F, N, pipe } from '@mobily/ts-belt'
import { toFloat } from 'radash'
import * as R from 'react'

const TAX = toFloat(NEXT_PUBLIC_TAX_FEE, 0)

export function useCalculateTotals(cartItems: Array<TCartProductItem> = []) {
  let taxPercentage = pipe(TAX, N.multiply(100))

  let totalQuantity = R.useMemo(() => {
    return pipe(
      cartItems,
      A.reduce(0, (qty, { quantity }) => N.add(qty, quantity)),
    )
  }, [cartItems])

  let subTotal = R.useMemo(() => {
    return pipe(
      cartItems,
      A.reduce(0, (subTotal, { quantity, product }) =>
        pipe(subTotal, N.add(pipe(product.price, N.multiply(quantity)))),
      ),
    )
  }, [cartItems])
  let total = R.useMemo(() => {
    return pipe(
      cartItems,
      A.map(({ quantity, product }) =>
        pipe(product.price, N.multiply(quantity), (subtotal) =>
          N.add(subtotal, N.multiply(subtotal, TAX)),
        ),
      ),
      A.reduce(0, (total, sub) => pipe(total, N.add(sub))),
    )
  }, [cartItems])

  let calcCustomerMoney = R.useCallback((payload: { total: number; money: number }) => {
    let money = toFloat(payload.money, 0)
    let change = pipe(
      money,
      N.subtract(payload.total),
      F.ifElse(N.gt(0), F.identity, () => 0),
    )
    let missing = pipe(
      payload.total,
      N.subtract(money),
      F.ifElse(N.gt(0), F.identity, () => 0),
    )

    return { change, missing }
  }, [])

  return { subTotal, total, totalQuantity, taxPercentage, calcCustomerMoney }
}
