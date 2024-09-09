import { B, S, pipe } from '@mobily/ts-belt'
import {
  LayoutGridIcon,
  type LucideIcon,
  PackageIcon,
  ChartNoAxesColumn,
  UsersIcon,
  UserPlusIcon,
  TagsIcon,
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
export function getSidebarList(pathname: string): Array<TSidebarGroup> {
  return [
    {
      label: 'Beranda',
      visible: true,
      menus: [
        {
          label: 'Dasbor',
          icon: LayoutGridIcon,
          active: pathname === '/admin',
          path: '/admin',
          visible: true,
        },
      ],
    },
    {
      label: 'Produk & Penjualan',
      visible: true,
      menus: [
        {
          label: 'Produk',
          icon: PackageIcon,
          active: pipe(
            pathname,
            S.endsWith('/product/list'),
            B.or(S.endsWith('/product/create')(pathname)),
            B.or(S.endsWith('/product/update')(pathname)),
          ),
          path: '/admin/product/list',
          visible: true,
          subMenus: [],
        },
        {
          icon: TagsIcon,
          active: pipe(
            pathname,
            S.endsWith('/product/category/list'),
            B.or(S.endsWith('/product/category/create')(pathname)),
            B.or(S.endsWith('/product/category/update')(pathname)),
          ),
          label: 'Kategori Produk',
          path: '/admin/product/category/list',
          visible: true,
        },
        {
          label: 'Penjualan',
          icon: ChartNoAxesColumn,
          active: pathname.endsWith('/sales'),
          path: '/admin/sales',
          visible: true,
        },
      ],
    },
    {
      label: 'Kelola Pengguna',
      visible: true,
      menus: [
        {
          label: 'Daftar Kasir',
          icon: UsersIcon,
          active: pathname.startsWith('admin/cashier'),
          path: '/admin/cashier/list',
          visible: true,
        },
        {
          label: 'Tambah Pengguna',
          icon: UserPlusIcon,
          active: pathname.startsWith('admin/cashier'),
          path: '/admin/cashier/add',
          visible: true,
        },
      ],
    },
  ]
}
