import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { PRODUCT_DATA_TABLE_COLUMN } from './product-data-table-column'

import dynamic from 'next/dynamic'

let UpdateStockDialog = dynamic(
  () =>
    import('./update-product-stock-dialog').then((mod) => ({
      default: mod.UpdateProductStockDialog,
    })),
  { ssr: false },
)

type TProductDataTable = {
  data: Array<Product>
  page: number
  total: number
}
export function ProductDataTable(props: TProductDataTable) {
  return (
    <Card>
      <CardHeader>
        <DataTableHeader
          search={{
            label: 'Cari produk',
            placeholder: 'Cari: minyak sayur, gula pasir',
          }}
          button={{ href: '/app/product/create', label: 'Tambah Produk' }}
        />
      </CardHeader>

      <CardContent>
        <DataTableUI
          page={props.page}
          total={props.total}
          data={props.data}
          columns={PRODUCT_DATA_TABLE_COLUMN}
        />
      </CardContent>

      <UpdateStockDialog />
    </Card>
  )
}
