import { userListAtom } from '@/states/user'

import { useAtomValue } from 'jotai'

export function useUserProfileList() {
  return useAtomValue(userListAtom)
}
