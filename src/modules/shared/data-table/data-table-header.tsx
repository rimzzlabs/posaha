'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { F } from '@mobily/ts-belt'
import { PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
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
  let [inputValue, setInputValue] = R.useState('')

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
  let onSearchChange = match(props?.search?.onValueChange)
    .with(P.instanceOf(Function), F.identity)
    .otherwise(F.always(F.ignore))

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
    <div className='flex max-lg:flex-col-reverse px-1 pt-1 pb-6 gap-4'>
      <div className='space-y-1'>
        <Label htmlFor={id} hidden>
          {label}
        </Label>
        <div className='relative'>
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
