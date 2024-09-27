import { D, pipe } from '@mobily/ts-belt'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

let initialValues = {
  booleans: {
    sidebarCart: false,
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
