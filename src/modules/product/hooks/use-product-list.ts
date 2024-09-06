import { useAtomValue } from "jotai";
import { sortedProductListAtom } from "@/states/product";

export function useProductList() {
  return useAtomValue(sortedProductListAtom);
}
