import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { USER_DATA_TABLE_COLUMN } from './user-data-table-column'

import dynamic from 'next/dynamic'

let UpdateUserDialog = dynamic(
  () => import('./update-user-dialog').then((mod) => ({ default: mod.UpdateUserDialog })),
  { ssr: false },
)
let UpdateUserPasswordDialog = dynamic(
  () =>
    import('./update-user-password-dialog').then((mod) => ({
      default: mod.UpdateUserPasswordDialog,
    })),
  { ssr: false },
)

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

      <UpdateUserDialog />
      <UpdateUserPasswordDialog />
    </Card>
  )
}
