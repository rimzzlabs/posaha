'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useId } from 'react'

export function ProductDataTableFilter() {
  let id = useId()

  return (
    <div className='flex gap-x-4 px-1 pb-6 pt-1'>
      <div className='space-y-1'>
        <Label htmlFor={id} hidden>
          Cari produk
        </Label>
        <div className='relative'>
          <Input
            id={id}
            aria-label='Cari produk'
            className='peer w-96 pl-10'
            placeholder='Cari: Minyak sayur 1 kg'
          />
          <SearchIcon
            size='1rem'
            className='absolute left-3.5 top-2.5 stroke-muted-foreground peer-focus:stroke-foreground'
          />
        </div>
      </div>

      <Button className='ml-auto gap-x-2' asChild>
        <Link href='/app/product/create'>
          <PlusIcon size='1em' />
          Tambah Produk
        </Link>
      </Button>
    </div>
  )
}
