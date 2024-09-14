'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { useUserProfileList } from '@/app/app/user/__hooks'

import { DataTableHeader, DataTableUI } from '../shared/data-table'
import { USER_DATA_TABLE_COLUMN } from './user-data-table-column'

import { useSearchParams } from 'next/navigation'
import { toInt } from 'radash'

export function UserDataTable() {
  let search = useSearchParams()
  let data = useUserProfileList()
  let page = toInt(search.get('page'), 1)

  let limit = 10
  let offset = (page - 1) * limit
  let totalPage = Math.ceil(data.length / limit) || 1
  let paginatedData = data.slice(offset, offset + limit)

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
          data={paginatedData}
          page={page}
          total={totalPage}
          columns={USER_DATA_TABLE_COLUMN}
          emptyState={{ description: 'Tidak ada data pengguna' }}
        />
      </CardContent>
    </Card>
  )
}
