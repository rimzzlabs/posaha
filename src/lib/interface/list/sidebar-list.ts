import {
  LayoutGridIcon,
  PackagePlusIcon,
  type LucideIcon,
  PackageIcon,
  ChartNoAxesColumn,
  UsersIcon,
  UserPlusIcon,
} from "lucide-react";

type Submenu = {
  path: string;
  label: string;
  icon: LucideIcon;
  newTab?: boolean;
};

type Menu = {
  visible: boolean;
  path: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  newTab?: boolean;
  subMenus?: Submenu[];
};

type Group = {
  visible: boolean;
  label?: string;
  menus: Menu[];
};

export function getSidebarList(pathname: string): Array<Group> {
  return [
    {
      label: "Beranda",
      visible: true,
      menus: [
        {
          label: "Dasbor",
          icon: LayoutGridIcon,
          active: pathname === "/admin",
          path: "/admin",
          visible: true,
        },
      ],
    },
    {
      label: "Produk & Penjualan",
      visible: true,
      menus: [
        {
          label: "Kelola Produk",
          icon: PackageIcon,
          active: pathname.endsWith("/product/list"),
          path: "/admin/product/list",
          visible: true,
        },
        {
          icon: PackagePlusIcon,
          active: pathname.endsWith("/product/create"),
          label: "Tambah Produk",
          path: "/admin/product/create",
          visible: true,
        },
        {
          label: "Laporan Penjualan",
          icon: ChartNoAxesColumn,
          active: pathname.endsWith("/sales"),
          path: "/admin/sales",
          visible: true,
        },
      ],
    },
    {
      label: "Kelola Pengguna",
      visible: true,
      menus: [
        {
          label: "Daftar Kasir",
          icon: UsersIcon,
          active: pathname.startsWith("admin/cashier"),
          path: "/admin/cashier/list",
          visible: true,
        },
        {
          label: "Tambah Pengguna",
          icon: UserPlusIcon,
          active: pathname.startsWith("admin/cashier"),
          path: "/admin/cashier/add",
          visible: true,
        },
      ],
    },
  ];
}
