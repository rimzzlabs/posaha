import { D, F, N, O, pipe } from '@mobily/ts-belt'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type TCartProductItem = TPrettify<Product & { qty: number }>
type TCartStorageItems = Record<string, TCartProductItem>
type TCartCustomerMoney = number | undefined

let initialValues = {
  booleans: {
    sidebarCart: false,
  },
  cart: {
    customerMoney: undefined as TCartCustomerMoney,
    items: {} as TCartStorageItems,
  },
}

export let storageAtom = atomWithStorage('app.posaha.storage', initialValues)

export let sidebarCartAtom = atom(
  (get) => get(storageAtom).booleans.sidebarCart,
  (get, set, args?: boolean) => {
    let prevState = get(storageAtom)

    let sidebarCart = args ?? !prevState.booleans.sidebarCart
    let nextState = pipe(prevState, D.merge({ booleans: { ...prevState.booleans, sidebarCart } }))

    set(storageAtom, nextState)
  },
)

export let appendProductToCart = atom(null, (get, set, product: Product) => {
  let prevState = get(storageAtom)

  let items = pipe(prevState.cart.items, (value) => {
    let cartItem = pipe(value, D.get(product.id))
    if (cartItem) {
      let nextCartItem: TCartStorageItems = {
        [product.id]: pipe(product, D.merge({ qty: pipe(cartItem.qty, N.add(1)) })),
      }

      return pipe(value, D.merge(nextCartItem))
    }

    return pipe(value, D.merge({ [product.id]: pipe(product, D.merge({ qty: 1 })) }))
  })

  const cart = pipe(prevState.cart, D.merge({ items }))
  set(storageAtom, { ...prevState, cart })
})

export let sidebarCartProductItemsAtom = atom((get) => {
  return pipe(
    O.fromNullable(get(storageAtom).cart.items),
    O.mapWithDefault({}, F.identity),
    D.values,
    F.toMutable,
  )
})

export let updateCartQtyAtom = atom(null, (get, set, args: { qty: number; id: string }) => {
  let prevState = get(storageAtom)

  let items = pipe(
    prevState.cart.items,
    D.get(args.id),
    O.fromNullable,
    O.map(F.identity),
    O.match(
      (value) => D.merge(value, { qty: args.qty }),
      () => ({}) as TCartProductItem,
    ),
    (cartItem) => D.merge(prevState.cart.items, { [args.id]: cartItem }),
  )

  let cart = pipe(prevState.cart, D.merge({ items }))
  set(storageAtom, pipe(prevState, D.merge({ cart })))
})

export let deleteCartQtyAtom = atom(null, (get, set, productId: string) => {
  let prevState = get(storageAtom)

  const cart = pipe(
    prevState.cart,
    D.merge({
      items: pipe(prevState.cart.items, D.deleteKey(productId)),
    }),
  )

  set(storageAtom, pipe(prevState, D.merge({ cart })))
})
export let clearCartAtom = atom(null, (get, set) => {
  let prevState = get(storageAtom)
  set(
    storageAtom,
    pipe(prevState, D.merge({ cart: { items: {}, customerMoney: prevState.cart.customerMoney } })),
  )
})

export let cartCustomerMoneyAtom = atom((get) => get(storageAtom).cart.customerMoney)
export let updateCartCustomerMoneyAtom = atom(null, (get, set, value?: number) => {
  let prevState = get(storageAtom)
  let cart = pipe(prevState.cart, D.merge({ customerMoney: value }))

  set(storageAtom, D.merge({ cart }))
})
