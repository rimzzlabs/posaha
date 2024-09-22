import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'

import { createColumnHelper } from '@tanstack/react-table'
import { MinusIcon } from 'lucide-react'
import Image from 'next/image'
import { match, P } from 'ts-pattern'

const ch = createColumnHelper<Sales>()

export const SALES_DATA_TABLE_COLUMN = [
  ch.display({
    header: 'No.',
    id: 'Numeric',
    cell: (props) => {
      const pagination = props.table.getState().pagination
      const pageSize = pagination.pageSize
      const pageIndex = pagination.pageIndex - 1

      return pageIndex * pageSize + props.row.index + 1
    },
  }),
  ch.accessor('product.image', {
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
            alt={props.row.original.product.name}
            width={48}
            height={48}
            loading='lazy'
            className='rounded-lg w-auto h-auto'
          />
        ))
    },
  }),
  ch.accessor('createdAt', {
    header: 'Waktu & Tanggal',
    cell: (props) => formatDate(props.getValue()),
  }),
  ch.accessor('product.name', { header: 'Nama Produk' }),
  ch.accessor('product.sku', { header: 'SKU' }),
  ch.accessor('product.stock', { header: 'Stok Tersisa' }),
  ch.accessor('qty', { header: 'Jumlah Terjual' }),
  ch.accessor('product.price', {
    header: 'Harga Produk',
    cell: (props) => formatPrice(props.getValue()),
  }),
  ch.accessor('total', {
    header: 'Jumlah Pendapatan',
    cell: (props) => formatPrice(props.getValue()),
  }),
]
