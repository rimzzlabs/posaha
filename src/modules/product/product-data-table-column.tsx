import { formatPrice } from "@/lib/number";
import { createColumnHelper } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, EyeIcon, PenIcon, Trash2Icon } from "lucide-react";

let ch = createColumnHelper<Product>();

export const PRODUCT_DATA_TABLE_COLUMN = [
  ch.accessor("name", { header: "Nama Produk" }),
  ch.accessor("description", {
    header: "Deksripsi Produk",
    cell: (props) => (
      <p className="whitespace-pre-wrap max-w-md text-balance">
        {props.getValue()}
      </p>
    ),
  }),
  ch.accessor("price", {
    header: "Harga Produk",
    cell: (props) => formatPrice(props.getValue()),
  }),
  ch.accessor("stock.available", { header: "Stok Tersedia" }),
  ch.accessor("stock.sold", { header: "Stok Terjual" }),
  ch.display({
    id: "action",
    header: "Aksi",
    cell: () => {
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-x-2">
              Menu
              <ChevronDownIcon size="1em" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Menu Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EyeIcon size="1em" />
              Lihat Produk
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PenIcon size="1em" />
              Perbarui Produk
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2Icon size="1em" />
              Hapus Produk
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
