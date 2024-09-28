import { atom } from 'jotai'

let defaultValues = { open: false, pending: false, cartItems: [] as Array<TCartProductItem> }
export let checkoutAtom = atom(defaultValues)

export let openDialogCheckoutAtom = atom(null, (get, set, cartItems: Array<TCartProductItem>) => {
  set(checkoutAtom, { ...get(checkoutAtom), open: true, cartItems })
})

export let closeDialogCheckoutAtom = atom(null, (get, set) => {
  set(checkoutAtom, { ...get(checkoutAtom), open: false, cartItems: [] })
})

export let clearDialogCheckoutAtom = atom(null, (get, set) => {
  set(checkoutAtom, { ...get(checkoutAtom), open: false, cartItems: [] })
})

export let togglePendingCheckoutAtom = atom(null, (get, set, args?: boolean) => {
  set(checkoutAtom, { ...get(checkoutAtom), pending: args ?? !get(checkoutAtom).pending })
})
