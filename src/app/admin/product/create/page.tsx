import { HeadingOne } from '@/components/ui/headings'

import { CreateProductForm } from '@/modules/product/create-product'

import { Fragment } from 'react'

export default function AddProductPage() {
  return (
    <Fragment>
      <HeadingOne>Tambah Produk Baru</HeadingOne>

      <CreateProductForm />
    </Fragment>
  )
}
