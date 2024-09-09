import { sortedProductListAtom } from '@/states/product'

import { useAtomValue } from 'jotai'

export function useProductList() {
  return useAtomValue(sortedProductListAtom)
}
