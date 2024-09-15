import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { USER_DATA_TABLE_COLUMN } from './user-data-table-column'

type TUserDataTable = { data: Array<TUser>; page: number; total: number }

export function UserDataTable(props: TUserDataTable) {
  return (
    <Card>
      <CardHeader>
        <DataTableHeader
          search={{
            label: 'Cari pengguna',
            placeholder: 'Cari: nama, nik, role, alamat',
          }}
          button={{ href: '/app/user/create', label: 'Tambah Pengguna' }}
        />
      </CardHeader>

      <CardContent>
        <DataTableUI
          {...props}
          columns={USER_DATA_TABLE_COLUMN}
          emptyState={{ description: 'Tidak ada data pengguna' }}
        />
      </CardContent>
    </Card>
  )
}
