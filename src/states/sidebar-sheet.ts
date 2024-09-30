import { atom } from 'jotai'

export let sidebarSheetAtom = atom(false)

export let toggleSidebarSheetAtom = atom(null, (get, set, args?: boolean) => {
  set(sidebarSheetAtom, args ?? !get(sidebarSheetAtom))
})
