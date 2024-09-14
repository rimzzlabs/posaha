import { F, S, pipe } from '@mobily/ts-belt'
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
      label: 'Produk & Penjualan',
      visible: true,
      menus: [
        {
          visible: true,
          label: 'Daftar Produk',
          path: '/app/product/list',
          icon: PackageIcon,
          active: pipe(pathname, S.endsWith('/product/list')),
        },
        {
          visible: true,
          label: 'Produk Kategori',
          path: '/app/product/category/list',
          icon: TagsIcon,
          active: pipe(pathname, S.endsWith('/category/list')),
        },
        {
          visible: true,
          label: 'Laporan Penjualan',
          path: '/app/sales',
          icon: ChartNoAxesColumn,
          active: pipe(pathname, S.endsWith('/sales')),
        },
      ],
    },
    {
      label: 'Pengguna',
      visible: true,
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
