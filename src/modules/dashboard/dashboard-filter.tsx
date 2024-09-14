'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { For } from '@/components/ui/for'

import { cn } from '@/lib/utils'

import { A, D, O, pipe } from '@mobily/ts-belt'
import {
  CalendarClockIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  FilterIcon,
} from 'lucide-react'
import * as R from 'react'

let filterList = [
  { icon: CalendarClockIcon, label: 'Mingguan', value: 'weekly' },
  { icon: CalendarDaysIcon, label: 'Bulanan', value: 'monthly' },
  { icon: CalendarRangeIcon, label: 'Tahunan', value: 'annual' },
]

export function DashboardFilter() {
  let [filterValue, setFilterValue] = R.useState('annual')

  let filterLabel = pipe(
    filterList,
    A.getBy((filter) => filter.value === filterValue),
    O.map(D.getUnsafe('label')),
    O.getWithDefault('Filter berdasarkan' as string),
  )

  let onChangeFilter = (value: string) => () => setFilterValue(value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='gap-2 justify-normal w-52'>
          <FilterIcon size='1em' />
          {filterLabel}
          <ChevronsUpDownIcon size='1em' className='ml-auto text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[var(--radix-popper-anchor-width)]'>
        <For each={filterList}>
          {({ label, value, icon: Icon }) => (
            <DropdownMenuItem onClick={onChangeFilter(value)}>
              <CheckIcon
                size='1em'
                className={cn(
                  'transition opacity-0 invisible',
                  filterValue.includes(value) && 'visible opacity-100',
                )}
              />
              <Icon size='1em' />
              {label}
            </DropdownMenuItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
