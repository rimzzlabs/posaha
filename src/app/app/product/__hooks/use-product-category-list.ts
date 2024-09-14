import { sortedProductCategoryAtom } from '@/states/product-category'

import { useAtomValue } from 'jotai'

export function useProductCategoryList() {
  return useAtomValue(sortedProductCategoryAtom)
}
