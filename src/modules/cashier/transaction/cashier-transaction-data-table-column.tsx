'use client'

import { Badge } from '@/components/ui/badge'

import type { TSalesListResult } from '@/database/query/sales'
import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'
import { SalesDataTableColumnProduct } from '@/modules/sales/sales-data-table-column-product'

import { F, O, pipe } from '@mobily/ts-belt'
import { createColumnHelper } from '@tanstack/react-table'
import { toInt } from 'radash'
import { match } from 'ts-pattern'

type TSalesResult = TSalesListResult['data'][number]
const ch = createColumnHelper<TSalesResult>()

export const CASHIER_TRANSACTION_DATA_TABLE_COLUMN = [
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
  ch.accessor('totalQuantity', {
    header: 'Jumlah Produk Terjual',
    cell: (props) => {
      return <SalesDataTableColumnProduct {...props.row.original} />
    },
  }),
  ch.accessor('totalAmount', {
    header: 'Total Harga',
    cell: (props) => pipe(props.getValue(), toInt, formatPrice),
  }),
  ch.accessor('customerMoney', {
    header: 'Uang Pelanggan',
    cell: (props) => pipe(props.getValue(), toInt, formatPrice),
  }),
  ch.accessor('customerChange', {
    header: 'Uang Kembalian Pelanggan',
    cell: (props) => pipe(props.getValue(), toInt, formatPrice),
  }),
  ch.accessor('paymentMethod', {
    header: 'Metode Pembayaran',
    cell: (props) => (
      <Badge variant='secondary'>
        {match(props.getValue())
          .with('cash', () => 'Uang Kertas')
          .otherwise(() => 'Tidak diketahui')}
      </Badge>
    ),
  }),
  ch.accessor('remark', {
    header: 'Catatan',
    cell: (props) => pipe(O.fromNullable(props.getValue()), O.mapWithDefault('-', F.identity)),
  }),
]
