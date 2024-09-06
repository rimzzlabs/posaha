import { Button } from "@/components/ui/button";
import { HeadingOne } from "@/components/ui/headings";
import { ProductDataTable } from "@/modules/product/product-data-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function Page() {
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <HeadingOne>Daftar Produk</HeadingOne>
        <Button className="gap-x-2" asChild>
          <Link href="/admin/product/create">
            <PlusIcon size="1em" />
            Tambah Produk
          </Link>
        </Button>
      </div>
      <ProductDataTable />
    </Fragment>
  );
}
