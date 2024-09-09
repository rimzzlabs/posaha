'use client'

import { HeadingOne } from '@/components/ui/headings'

import { CreateProductCategoryForm } from '@/modules/product-category/create-product-category'

import { Fragment } from 'react'

export default function ProductCategoryPage() {
  return (
    <Fragment>
      <HeadingOne>Tambah Kategori Produk</HeadingOne>
      <CreateProductCategoryForm />
    </Fragment>
  )
}
