import { A, F, pipe } from "@mobily/ts-belt";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export let productListAtom = atomWithStorage<Array<Product>>(
  "posaha.product.list",
  [],
);
export let sortedProductListAtom = atom((get) =>
  pipe(
    get(productListAtom),
    A.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1)),
    F.toMutable,
  ),
);
