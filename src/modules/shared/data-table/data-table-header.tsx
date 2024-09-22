'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { F, pipe, S } from '@mobily/ts-belt'
import { PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as R from 'react'
import { match, P } from 'ts-pattern'

type TDataTableHeader = {
  search?: {
    label?: string
    placeholder?: string
    /**
     * @default 500 millisecond
     */
    delay?: number
    /**
     * you can fetch, filter, anything based on available value string
     */
    onValueChange?: ((value: string) => void) | ((value: string) => Promise<void>)
  }
  button?: { label?: string; href?: string }
}

export function DataTableHeader(props: TDataTableHeader) {
  let id = R.useId()
  let router = useRouter()
  let pathname = usePathname()
  let searchParams = useSearchParams()
  let [inputValue, setInputValue] = R.useState(searchParams.get('search') || '')

  let label = match(props?.search?.label)
    .with(P.string, F.identity)
    .otherwise(() => 'Cari sesuatu')
  let placeholder = match(props?.search?.placeholder)
    .with(P.string, F.identity)
    .otherwise(() => 'Cari: sesuatu, apapun')
  let href = match(props?.button?.href)
    .with(P.string, F.identity)
    .otherwise(() => '#')
  let buttonLabel = match(props?.button?.label)
    .with(P.string, F.identity)
    .otherwise(() => 'Tambah sesuatu')
  let delay = match(props?.search?.delay)
    .with(P.number.positive(), F.identity)
    .otherwise(F.always(500))
  let onSearchChange = R.useCallback(
    (value: string) => {
      let params = new URLSearchParams(searchParams)
      let synthesizedValue = pipe(value, S.replaceByRe(/s+/g, ''))

      if (synthesizedValue) {
        params.set('search', synthesizedValue)
      } else {
        params.delete('search')
      }

      let options = { scroll: false }
      let url = `${pathname}?${params.toString()}`
      router.push(url, options)
    },
    [searchParams, pathname],
  )

  let onChangeDebounced = R.useMemo(
    () => F.debounce(onSearchChange, delay),
    [delay, onSearchChange],
  )

  let onChangeInput = (e: R.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    onChangeDebounced(value)
    setInputValue(value)
  }

  return (
    <div className='flex max-md:flex-col-reverse px-1 pt-1 pb-6 gap-4'>
      <div className='space-y-1'>
        <Label htmlFor={id} hidden>
          {label}
        </Label>
        <div className='relative w-full md:w-72'>
          <Input
            value={inputValue}
            onChange={onChangeInput}
            id={id}
            aria-label={label}
            className='pl-10 peer'
            placeholder={placeholder}
          />
          <SearchIcon
            size='1rem'
            className='absolute stroke-muted-foreground peer-focus:stroke-foreground left-3.5 top-2.5'
          />
        </div>
      </div>

      <Button className='gap-x-2 ml-auto' asChild>
        <Link href={href}>
          <PlusIcon size='1em' />
          {buttonLabel}
        </Link>
      </Button>
    </div>
  )
}
