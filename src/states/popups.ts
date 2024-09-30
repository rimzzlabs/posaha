import { atom } from 'jotai'

type TUpdateStockDialogValue = { open: boolean; productId: string }

type TUpdateCategoryDialogValue = {
  open: boolean
  isPending: boolean
  categoryId: string
  name: string
  color: string
}

type TUpdateUserDialogAtom = {
  open: boolean
  isPending: boolean
  userId: string
  name: string
  address: string
  role: TRole
}

type TUpdateUserPasswordDialogAtom = {
  open: boolean
  isPending: boolean
  userId: string
  email: string
}

export let updateStockDialogAtom = atom<TUpdateStockDialogValue>({ open: false, productId: '' })

export let openUpdateStockDialogAtom = atom(
  null,
  (_, set, args: Omit<TUpdateStockDialogValue, 'open'>) => {
    set(updateStockDialogAtom, { ...args, open: true })
  },
)

export let closeUpdateStockDialogAtom = atom(null, (_, set) => {
  set(updateStockDialogAtom, { open: false, productId: '' })
})

export let updateCategoryDialogAtom = atom<TUpdateCategoryDialogValue>({
  name: '',
  color: '',
  open: false,
  categoryId: '',
  isPending: false,
})

export let openUpdateCategoryDialogAtom = atom(
  null,
  (get, set, args: Omit<TUpdateCategoryDialogValue, 'open' | 'isPending'>) => {
    let prevState = get(updateCategoryDialogAtom)
    set(updateCategoryDialogAtom, { ...prevState, ...args, open: true })
  },
)

export let togglePendingUpdateCategoryDialogAtom = atom(null, (get, set, args?: boolean) => {
  let prevState = get(updateCategoryDialogAtom)
  set(updateCategoryDialogAtom, { ...prevState, isPending: args ?? !prevState.isPending })
})

export let closeUpdateCategoryDialogAtom = atom(null, (_, set) => {
  set(updateCategoryDialogAtom, {
    color: '',
    name: '',
    open: false,
    categoryId: '',
    isPending: false,
  })
})

export let updateUserDialogAtom = atom<TUpdateUserDialogAtom>({
  open: false,
  isPending: false,
  userId: '',
  name: '',
  address: '',
  role: 'cashier',
})

export let openUpdateUserDialogAtom = atom(
  null,
  (_, set, args: Omit<TUpdateUserDialogAtom, 'open' | 'isPending'>) => {
    set(updateUserDialogAtom, { ...args, isPending: false, open: true })
  },
)

export let togglePendingUpdateUserDialogAtom = atom(null, (get, set, args?: boolean) => {
  let prevState = get(updateUserDialogAtom)
  set(updateUserDialogAtom, { ...prevState, isPending: args ?? !prevState.isPending })
})

export let closeUpdateUserDialogAtom = atom(null, (_, set) => {
  set(updateUserDialogAtom, {
    name: '',
    userId: '',
    open: false,
    address: '',
    role: 'cashier',
    isPending: false,
  })
})

export let updateUserPasswordDialogAtom = atom<TUpdateUserPasswordDialogAtom>({
  email: '',
  userId: '',
  open: false,
  isPending: false,
})

export let openUpdateUserPasswordDialogAtom = atom(
  null,
  (_, set, args: Pick<TUpdateUserPasswordDialogAtom, 'userId' | 'email'>) => {
    set(updateUserPasswordDialogAtom, { ...args, open: true, isPending: false })
  },
)

export let togglePendingUpdateUserPasswordDialogAtom = atom(null, (get, set, args?: boolean) => {
  let prevState = get(updateUserPasswordDialogAtom)
  set(updateUserPasswordDialogAtom, { ...prevState, isPending: args ?? !prevState.isPending })
})

export let closeUpdateUserPasswordDialogAtom = atom(null, (_, set) => {
  set(updateUserPasswordDialogAtom, { email: '', userId: '', open: false, isPending: false })
})
