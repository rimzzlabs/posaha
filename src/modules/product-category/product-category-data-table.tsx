import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { PRODUCT_CATEGORY_DATA_TABLE_COLUMN } from './product-category-data-table-column'

import dynamic from 'next/dynamic'

let UpdateProductCategoryDialog = dynamic(
  () =>
    import('./update-product-category-dialog').then((mod) => ({
      default: mod.UpdateProductCategoryDialog,
    })),
  { ssr: false },
)

type TProductCategoryDataTable = { data: Array<ProductCategory>; page: number; total: number }

export function ProductCategoryDataTable(props: TProductCategoryDataTable) {
  return (
    <Card>
      <CardHeader>
        <DataTableHeader
          search={{
            label: 'Cari produk kategori',
            placeholder: 'Cari: makanan, minuman, bahan masakan',
          }}
          button={{ href: '/app/product/category/create', label: 'Tambah Kategori' }}
        />
      </CardHeader>

      <CardContent>
        <DataTableUI
          page={props.page}
          total={props.total}
          data={props.data}
          isPending={false}
          emptyState={{
            description: 'Tidak ada kategori yang tersedia',
          }}
          columns={PRODUCT_CATEGORY_DATA_TABLE_COLUMN}
        />
      </CardContent>

      <UpdateProductCategoryDialog />
    </Card>
  )
}
