import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'

import { ProductDataTableAction } from './product-data-table-action'

import { N } from '@mobily/ts-belt'
import { createColumnHelper } from '@tanstack/react-table'
import { MinusIcon } from 'lucide-react'

let ch = createColumnHelper<Product>()

export const PRODUCT_DATA_TABLE_COLUMN = [
  ch.display({
    header: 'No.',
    id: 'Numeric',
    cell: (props) => N.add(props.row.index, 1),
  }),
  ch.accessor('sku', {
    header: 'SKU Produk',
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
    cell: (props) =>
      props.getValue() || (
        <Tooltip delayDuration={250}>
          <TooltipTrigger className='text-muted-foreground'>
            <MinusIcon size='1rem' />
            <span className='sr-only'>Tidak ada deskripsi produk</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-sm font-medium'>Produk ini belum mempunyai deskripsi</p>
          </TooltipContent>
        </Tooltip>
      ),
  }),
  ch.accessor('stock.available', {
    header: 'Stok Tersedia',
  }),
  ch.accessor('stock.sold', {
    header: 'Stok Terjual',
  }),
  ch.accessor('category.name', {
    header: 'Kategori Produk',
    cell: (props) => {
      let backgroundColor = props.row.original.category.color

      return (
        <Badge variant='secondary' className='text-neutral-800' style={{ backgroundColor }}>
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
