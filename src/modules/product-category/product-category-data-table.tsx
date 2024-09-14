'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { useProductCategoryList } from '@/app/admin/product/__hooks'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { PRODUCT_CATEGORY_DATA_TABLE_COLUMN } from './product-category-data-table-column'

import { useSearchParams } from 'next/navigation'
import { toFloat } from 'radash'

export function ProductCategoryDataTable() {
  let search = useSearchParams()
  let data = useProductCategoryList()
  let page = toFloat(search.get('page'), 1)

  let limit = 10
  let offset = (page - 1) * limit
  let totalPage = Math.ceil(data.length / limit) || 1
  let paginatedData = data.slice(offset, offset + limit)

  return (
    <Card>
      <CardHeader>
        <DataTableHeader
          search={{
            label: 'Cari produk kategori',
            placeholder: 'Cari: makanan, minuman, bahan masakan',
          }}
          button={{ href: '/admin/product/category/create', label: 'Tambah Kategori' }}
        />
      </CardHeader>

      <CardContent>
        <DataTableUI
          page={page}
          total={totalPage}
          data={paginatedData}
          isPending={false}
          emptyState={{
            description: 'Tidak ada kategori yang tersedia',
          }}
          columns={PRODUCT_CATEGORY_DATA_TABLE_COLUMN}
        />
      </CardContent>
    </Card>
  )
}
