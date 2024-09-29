'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { B, F, pipe, S } from '@mobily/ts-belt'
import { PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as R from 'react'
import { match, P } from 'ts-pattern'

type TDataTableHeader = {
  search?: {
    label?: string
    placeholder?: string
  }
  button?: { label?: string; href?: string }
}
const DELAY = 500

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

  let onChangeDebounced = R.useMemo(() => F.debounce(onSearchChange, DELAY), [onSearchChange])

  let onChangeInput = (e: R.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    onChangeDebounced(value)
    setInputValue(value)
  }

  return (
    <div className='flex gap-4 px-1 pb-6 pt-1 max-md:flex-col-reverse'>
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
            className='peer pl-10'
            placeholder={placeholder}
          />
          <SearchIcon
            size='1rem'
            className='absolute left-3.5 top-2.5 stroke-muted-foreground peer-focus:stroke-foreground'
          />
        </div>
      </div>

      {B.ifElse(
        Boolean(props.button),
        () => (
          <Button className='ml-auto gap-x-2' asChild>
            <Link href={href}>
              <PlusIcon size='1em' />
              {buttonLabel}
            </Link>
          </Button>
        ),
        () => null,
      )}
    </div>
  )
}
