import type { Option } from '@mobily/ts-belt'
import { B, F, S, pipe } from '@mobily/ts-belt'
import {
  LayoutGridIcon,
  type LucideIcon,
  PackageIcon,
  ChartNoAxesColumn,
  UsersIcon,
  UserPlusIcon,
  TagsIcon,
  DollarSignIcon,
  ListOrderedIcon,
} from 'lucide-react'

export type TSidebarSubMenu = {
  path: string
  label: string
  icon: LucideIcon
  newTab?: boolean
}

export type TSidebarMenu = {
  visible: boolean
  path: string
  label: string
  active: boolean
  icon: LucideIcon
  newTab?: boolean
  subMenus?: TSidebarSubMenu[]
}

type TSidebarGroup = {
  visible: boolean
  label?: string
  menus: TSidebarMenu[]
}

export function getSidebarList(pathname: string, role?: Option<TRole>): Array<TSidebarGroup> {
  return [
    {
      label: 'Akses Cepat',
      visible: true,
      menus: [
        {
          visible: true,
          label: 'Dasbor',
          path: '/app',
          icon: LayoutGridIcon,
          active: pipe(pathname, F.equals('/app')),
        },
      ],
    },
    {
      label: 'Transaksi Produk',
      visible: pipe(role, F.equals('cashier')),
      menus: [
        {
          visible: true,
          label: 'Daftar Pembelian',
          path: '/app/transaction/list',
          icon: ListOrderedIcon,
          active: pipe(pathname, S.endsWith('/app/transaction/list')),
        },
        {
          visible: true,
          label: 'Transaksi Pembelian',
          path: '/app/transaction/cashier',
          icon: DollarSignIcon,
          active: pipe(pathname, S.endsWith('/app/transaction/cashier')),
        },
      ],
    },
    {
      label: 'Produk & Penjualan',
      visible: pipe(role, F.equals('super-admin'), B.or(F.equals(role)('admin'))),
      menus: [
        {
          visible: pipe(role, F.equals('super-admin'), B.or(F.equals(role)('admin'))),
          label: 'Daftar Produk',
          path: '/app/product/list',
          icon: PackageIcon,
          active: pipe(pathname, S.endsWith('/product/list')),
        },
        {
          visible: pipe(role, F.equals('super-admin'), B.or(F.equals(role)('admin'))),
          label: 'Produk Kategori',
          path: '/app/product/category/list',
          icon: TagsIcon,
          active: pipe(pathname, S.endsWith('/category/list')),
        },
        {
          visible: pipe(role, F.equals('super-admin'), B.or(F.equals(role)('admin'))),
          label: 'Laporan Penjualan',
          path: '/app/sales',
          icon: ChartNoAxesColumn,
          active: pipe(pathname, S.endsWith('/sales')),
        },
      ],
    },
    {
      label: 'Pengguna',
      visible: pipe(role, F.equals('super-admin'), B.or(F.equals(role)('admin'))),
      menus: [
        {
          visible: true,
          label: 'Buat Pengguna',
          path: '/app/user/create',
          icon: UserPlusIcon,
          active: pipe(pathname, S.endsWith('/user/create')),
        },
        {
          visible: true,
          label: 'Daftar Pengguna',
          path: '/app/user/list',
          icon: UsersIcon,
          active: pipe(pathname, S.endsWith('/user/list')),
        },
      ],
    },
  ]
}
