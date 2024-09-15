import { getRoleColor } from '../utils'

export const USER_ROLES = [
  { value: 'super-admin', label: 'Super Administrator', color: getRoleColor('super-admin') },
  { value: 'admin', label: 'Administrator', color: getRoleColor('admin') },
  { value: 'cashier', label: 'Petugas Kasir', color: getRoleColor('cashier') },
]
