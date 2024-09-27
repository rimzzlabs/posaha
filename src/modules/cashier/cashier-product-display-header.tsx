'use client'

import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useMutateSearchParams } from '@/hooks/use-mutate-search-params'

import { sidebarCartAtom } from '@/states/storage'

import { CashierProductDisplayHeaderRefresh } from './cashier-product-display-header-refresh'

import { F, pipe, S } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { SearchIcon, ShoppingBasketIcon } from 'lucide-react'
import * as R from 'react'

const LABEL = 'Cari produk'
const PLACEHOLDER = 'Cari: Minyak sayur, gula pasir, kopi'

export function CashierProductDisplayHeader() {
  let id = R.useId()
  let toggleSidebarCart = useSetAtom(sidebarCartAtom)
  let { getParams, setParams, unsetParams } = useMutateSearchParams()
  let [searchValue, setSearchValue] = R.useState(getParams('search') || '')

  let onToggleSidebar = R.useCallback(() => toggleSidebarCart(), [])
  let onSearchChange = R.useCallback((value: string) => {
    let synthesizedValue = pipe(value, S.replaceByRe(/s+/g, ''))

    if (!synthesizedValue) {
      unsetParams('search')
      return
    }

    setParams('search')(synthesizedValue)
  }, [])
  let onChangeDebounced = R.useMemo(() => F.debounce(onSearchChange, 500), [onSearchChange])
  let onChangeInput = R.useCallback(
    (e: R.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value
      onChangeDebounced(value)
      setSearchValue(value)
    },
    [onChangeDebounced],
  )

  return (
    <CardHeader className='flex-col-reverse gap-2.5 space-y-0 lg:flex-row lg:items-end lg:justify-between'>
      <div>
        <CardTitle className='mb-4 max-lg:hidden'>Produk yang tersedia</CardTitle>
        <div className='space-y-1'>
          <Label htmlFor={id} hidden>
            {LABEL}
          </Label>
          <div className='relative w-full lg:w-72'>
            <Input
              id={id}
              aria-label={LABEL}
              value={searchValue}
              className='peer pl-10'
              onChange={onChangeInput}
              placeholder={PLACEHOLDER}
            />
            <SearchIcon
              size='1rem'
              className='absolute left-3.5 top-2.5 stroke-muted-foreground peer-focus:stroke-foreground'
            />
          </div>
        </div>
      </div>

      <div className='inline-flex items-center justify-between gap-2'>
        <CardTitle className='mb-4 md:hidden'>Produk yang tersedia</CardTitle>

        <CashierProductDisplayHeaderRefresh />
        <Button
          variant='secondary'
          onClick={onToggleSidebar}
          className='gap-x-2 xl:hidden xl:max-w-max'
        >
          <ShoppingBasketIcon size='1rem' />
          Keranjang
        </Button>
      </div>
    </CardHeader>
  )
}
