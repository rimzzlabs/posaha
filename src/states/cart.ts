import { atom } from 'jotai'

export let sheetCartAtom = atom(false)

export let toggleSheetCartAtom = atom(null, (get, set, args?: boolean) => {
  set(sheetCartAtom, args ?? !get(sheetCartAtom))
})
