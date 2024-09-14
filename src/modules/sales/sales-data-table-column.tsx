import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'

import { createColumnHelper } from '@tanstack/react-table'

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
  ch.accessor('createdAt', {
    header: 'Waktu & Tanggal',
    cell: (props) => formatDate(props.getValue()),
  }),
  ch.accessor('product.name', { header: 'Nama Produk' }),
  ch.accessor('product.sku', { header: 'SKU' }),
  ch.accessor('product.stock.available', { header: 'Stok Tersisa' }),
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
