import { HeadingOne } from "@/components/ui/headings";
import { CreateProductForm } from "@/modules/product/create/create-product-form";
import { Fragment } from "react";

export default function AddProductPage() {
  return (
    <Fragment>
      <HeadingOne>Tambah Produk Baru</HeadingOne>
      <section className="pt-10 px-1">
        <CreateProductForm />
      </section>
    </Fragment>
  );
}
