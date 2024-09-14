'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useId } from 'react'

export function ProductCategoryDataTableFilter() {
  let id = useId()

  return (
    <div className='flex px-1 pt-1 pb-6 gap-x-4'>
      <div className='space-y-1'>
        <Label htmlFor={id} hidden>
          Cari kategori
        </Label>
        <div className='relative'>
          <Input
            id={id}
            aria-label='Cari kategori'
            className='pl-10 w-96 peer'
            placeholder='Cari: Makanan, Minuman ...'
          />
          <SearchIcon
            size='1rem'
            className='absolute stroke-muted-foreground peer-focus:stroke-foreground left-3.5 top-2.5'
          />
        </div>
      </div>

      <Button className='gap-x-2 ml-auto' asChild>
        <Link href='/app/product/category/create'>
          <PlusIcon size='1em' />
          Tambah Kategori
        </Link>
      </Button>
    </div>
  )
}
