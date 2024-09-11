import { A, F, pipe } from '@mobily/ts-belt'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export let userListAtom = atomWithStorage<Array<UserProfile>>('app.posaha.user.profile.list', [])

export let sortedUserListAtom = atom((get) =>
  pipe(
    get(userListAtom),
    A.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1)),
    F.toMutable,
  ),
)
