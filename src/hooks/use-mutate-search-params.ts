import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as R from 'react'

/**
 * IMPORTANT: **EVERY COMPONENT THAT USE THIS HOOKS SHOULD BE WRAPPED INSIDE** `<Suspense />` **BOUNDARY**
 */
export function useMutateSearchParams() {
  let pathname = usePathname()
  let router = useRouter()
  let searchParams = useSearchParams()

  let getParams = R.useCallback((name: string) => searchParams.get(name), [searchParams])

  let setParams = R.useCallback(
    (name: string) => {
      return (value: string) => {
        let params = new URLSearchParams(searchParams)
        params.set(name, value)

        let options = { scroll: false }
        let url = `${pathname}?${params.toString()}`
        router.push(url, options)
      }
    },
    [searchParams, pathname],
  )

  let unsetParams = R.useCallback(
    (name: string) => {
      let params = new URLSearchParams(searchParams)
      params.delete(name)

      let options = { scroll: false }
      let url = `${pathname}?${params.toString()}`
      router.push(url, options)
    },
    [searchParams, pathname],
  )

  return { getParams, setParams, unsetParams }
}
