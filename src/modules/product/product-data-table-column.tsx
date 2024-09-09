import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'

import { ProductDataTableAction } from './product-data-table-action'

import { N } from '@mobily/ts-belt'
import { createColumnHelper } from '@tanstack/react-table'

let ch = createColumnHelper<Product>()

export const PRODUCT_DATA_TABLE_COLUMN = [
  ch.display({
    header: 'No.',
    id: 'Numeric',
    cell: (props) => N.add(props.row.index, 1),
  }),
  ch.accessor('name', {
    header: 'Nama Produk',
    cell: (props) => <span className='text-balance'>{props.getValue()}</span>,
  }),
  ch.accessor('price', {
    header: 'Harga produk',
    cell: (p) => formatPrice(p.getValue()),
  }),
  ch.accessor('description', {
    header: 'Deksripsi Produk',
    cell: (props) =>
      props.getValue() || <em className='text-muted-foreground'>Tidak ada deksripsi produk</em>,
  }),
  ch.accessor('stock.available', {
    header: 'Stok Tersedia',
    cell: (props) => props.getValue(),
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
