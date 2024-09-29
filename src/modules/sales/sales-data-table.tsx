import { Card, CardContent } from '@/components/ui/card'

import type { TSalesListResult } from '@/database/query/sales'

import { DataTableUI } from '../shared/data-table'
import { SALES_DATA_TABLE_COLUMN } from './sales-data-table-column'
import { SalesDataTableHeader } from './sales-data-table-header'

type TSalesDataTable = TSalesListResult

export function SalesDataTable(props: TSalesDataTable) {
  return (
    <Card>
      <SalesDataTableHeader />

      <CardContent>
        <DataTableUI
          page={props.meta.page}
          total={props.meta.total}
          data={props.data}
          columns={SALES_DATA_TABLE_COLUMN}
          emptyState={{ description: 'Belum ada data penjualan' }}
        />
      </CardContent>
    </Card>
  )
}
