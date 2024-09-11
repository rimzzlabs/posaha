'use client'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { USER_DATA_TABLE_COLUMN } from './user-data-table-column'

export function UserDataTable() {
  return (
    <section>
      <DataTableHeader
        search={{
          label: 'Cari pengguna',
          placeholder: 'Cari: nama, nik, role, alamat',
        }}
        button={{ href: '/admin/user/create', label: 'Tambah Pengguna' }}
      />

      <DataTableUI
        data={[]}
        page={1}
        total={1}
        columns={USER_DATA_TABLE_COLUMN}
        emptyState={{ description: 'Tidak ada data pengguna' }}
      />
    </section>
  )
}
