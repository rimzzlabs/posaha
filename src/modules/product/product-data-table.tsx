'use client'

import { useProductList } from '@/app/admin/product/__hooks'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { PRODUCT_DATA_TABLE_COLUMN } from './product-data-table-column'

import { useSearchParams } from 'next/navigation'
import { toFloat } from 'radash'

export function ProductDataTable() {
  let search = useSearchParams()
  let data = useProductList()
  let page = toFloat(search.get('page'), 1)

  let limit = 10
  let offset = (page - 1) * limit
  let totalPage = Math.ceil(data.length / limit) || 1
  let paginatedData = data.slice(offset, offset + limit)

  return (
    <section>
      <DataTableHeader
        search={{
          label: 'Cari produk',
          placeholder: 'Cari: minyak sayur, gula pasir',
        }}
        button={{ href: '/admin/product/create', label: 'Tambah Produk' }}
      />
      <DataTableUI
        page={page}
        total={totalPage}
        data={paginatedData}
        isPending={false}
        columns={PRODUCT_DATA_TABLE_COLUMN}
      />
    </section>
  )
}
