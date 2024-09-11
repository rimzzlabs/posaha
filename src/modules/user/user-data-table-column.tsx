import { formatDate } from '@/lib/dates'

import { UserDataTableAction } from './user-data-table-action'

import { N } from '@mobily/ts-belt'
import { createColumnHelper } from '@tanstack/react-table'

const ch = createColumnHelper<UserProfile>()

export const USER_DATA_TABLE_COLUMN = [
  ch.display({
    header: 'No.',
    id: 'Numeric',
    cell: (props) => N.add(props.row.index, 1),
  }),
  ch.accessor('fullName', { header: 'Nama Lengkap' }),
  ch.accessor('email', { header: 'Email' }),
  ch.accessor('role.name', { header: 'Role' }),
  ch.accessor('createdAt', {
    header: 'Terakhir diperbarui',
    cell: (props) => formatDate(props.getValue()),
  }),
  ch.display({
    header: 'Aksi',
    id: 'action',
    cell: (props) => <UserDataTableAction {...props.row.original} />,
  }),
]
