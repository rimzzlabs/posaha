import { atom } from 'jotai'

export let sessionAtom = atom<Profile | null>({
  id: '123',
  fullName: 'rimzzlabs',
  email: 'rimzzlabs@proton.me',
  createdAt: '1/1/2024',
  updatedAt: '1/1/2024',
  role: 'super-admin',
})
