import { S, pipe } from '@mobily/ts-belt'
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
          path: '/admin',
          icon: LayoutGridIcon,
          active: pathname === '/admin',
        },
        {
          visible: true,
          label: 'Daftar Produk',
          path: '/admin/product/list',
          icon: PackageIcon,
          active: false,
        },
        {
          visible: true,
          label: 'Daftar Penggnuna',
          path: '/admin/user/list',
          icon: UsersIcon,
          active: false,
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
          path: '/admin/product/list',
          icon: PackageIcon,
          active: pipe(pathname, S.endsWith('/product/list')),
        },
        {
          visible: true,
          label: 'Daftar Produk Kategori',
          path: '/admin/product/category/list',
          icon: TagsIcon,
          active: pipe(pathname, S.endsWith('/category/list')),
        },
        {
          visible: true,
          label: 'Laporan Penjualan',
          path: '/admin/sales',
          icon: ChartNoAxesColumn,
          active: pathname.endsWith('/sales'),
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
          path: '/admin/user/create',
          icon: UserPlusIcon,
          active: pathname.endsWith('/user/create'),
        },
        {
          visible: true,
          label: 'Daftar Pengguna',
          path: '/admin/user/list',
          icon: UsersIcon,
          active: pathname.endsWith('/user/list'),
        },
      ],
    },
  ]
}
