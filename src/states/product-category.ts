import { A, F, pipe } from '@mobily/ts-belt'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export let productCategoryAtom = atomWithStorage<Array<ProductCategory>>(
  'app.posaha.product.category.list',
  [],
)

export let sortedProductCategoryAtom = atom((get) =>
  pipe(
    get(productCategoryAtom),
    A.sortBy((item) => item.name),
    F.toMutable,
  ),
)
