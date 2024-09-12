'use client'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { SALES_DATA_TABLE_COLUMN } from './sales-data-table-column'

import { F, O, pipe, type Option } from '@mobily/ts-belt'
import { useSearchParams } from 'next/navigation'
import { toInt } from 'radash'
import { Fragment } from 'react'

type TSalesDataTable = {
  data: Option<Array<Sales>>
}

export function SalesDataTable(props: TSalesDataTable) {
  let search = useSearchParams()
  let page = toInt(search.get('page'), 1)

  let sales = pipe(props.data, O.mapWithDefault([], F.identity))
  let limit = 10
  let offset = (page - 1) * limit
  let totalPage = Math.ceil(sales.length / limit) || 1
  let paginatedData = sales.slice(offset, offset + limit)

  return (
    <Fragment>
      <DataTableHeader
        search={{
          label: 'Cari penjualan',
          placeholder: 'Cari: produk, tanggal & waktu, lainnya...',
        }}
        button={{
          href: '#',
          label: 'Export ke excel',
        }}
      />

      <DataTableUI
        page={page}
        total={totalPage}
        data={paginatedData}
        columns={SALES_DATA_TABLE_COLUMN}
        emptyState={{ description: 'Belum ada data penjualan' }}
      />
    </Fragment>
  )
}
