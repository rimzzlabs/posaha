'use client'

import { useProductList } from '@/app/admin/product/__hooks'

import { DataTableUI } from '../shared/data-table'
import { PRODUCT_DATA_TABLE_COLUMN } from './product-data-table-column'
import { ProductDataTableFilter } from './product-data-table-filter'

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
      <ProductDataTableFilter />
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
