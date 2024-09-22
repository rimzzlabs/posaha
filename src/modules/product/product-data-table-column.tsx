'use client'

import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'

import { ProductDataTableAction } from './product-data-table-action'

import { F, N, pipe, S } from '@mobily/ts-belt'
import { createColumnHelper } from '@tanstack/react-table'
import { MinusIcon } from 'lucide-react'
import Image from 'next/image'
import { match, P } from 'ts-pattern'

let ch = createColumnHelper<Product>()

export const PRODUCT_DATA_TABLE_COLUMN = [
  ch.display({
    header: 'No.',
    id: 'Numeric',
    cell: (props) => N.add(props.row.index, 1),
  }),
  ch.accessor('image', {
    header: 'Foto Produk',
    cell: (props) => {
      return match(props.getValue())
        .with(P.nullish, () => (
          <Tooltip delayDuration={250}>
            <TooltipTrigger className='text-muted-foreground'>
              <MinusIcon size='1rem' />
              <span className='sr-only'>Tidak ada foto produk</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-sm font-medium'>Produk ini belum mempunyai foto</p>
            </TooltipContent>
          </Tooltip>
        ))
        .otherwise((url) => (
          <Image
            src={url}
            alt={props.row.original.name}
            width={48}
            height={48}
            loading='lazy'
            className='rounded-lg'
          />
        ))
    },
  }),
  ch.accessor('sku', {
    header: 'SKU Produk',
    cell: (props) => pipe(props.getValue(), S.prepend('POS-')),
  }),
  ch.accessor('name', {
    header: 'Nama Produk',
  }),
  ch.accessor('price', {
    header: 'Harga produk',
    cell: (p) => formatPrice(p.getValue()),
  }),
  ch.accessor('description', {
    header: 'Deksripsi Produk',
    cell: (props) => {
      return match(props.getValue())
        .with(P.not(P.nullish).and(P.string.minLength(1)), F.identity)
        .otherwise(() => (
          <Tooltip delayDuration={250}>
            <TooltipTrigger className='text-muted-foreground'>
              <MinusIcon size='1rem' />
              <span className='sr-only'>Tidak ada deskripsi produk</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-sm font-medium'>Produk ini belum mempunyai deskripsi</p>
            </TooltipContent>
          </Tooltip>
        ))
    },
  }),
  ch.accessor('stock', {
    header: 'Stok Tersedia',
  }),
  ch.accessor('sold', {
    header: 'Stok Terjual',
  }),
  ch.accessor('category.name', {
    header: 'Kategori Produk',
    cell: (props) => {
      let backgroundColor = props.row.original.category.color

      return (
        <Badge
          variant='secondary'
          className='max-w-max text-neutral-800'
          style={{ backgroundColor }}
        >
          {props.getValue()}
        </Badge>
      )
    },
  }),
  ch.accessor('updatedAt', {
    header: 'Terakhir Diperbarui',
    cell: (props) => formatDate(props.getValue(), 'EEEE, dd MMM, yyyy. HH:mm:ss'),
  }),
  ch.display({
    id: 'action',
    header: 'Aksi',
    cell: (props) => {
      return <ProductDataTableAction {...props.row.original} />
    },
  }),
]
