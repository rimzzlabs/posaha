'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { CreateProductCategoryForm } from '@/modules/product-category/create-product-category'

export default function ProductCategoryPage() {
  return (
    <div className='flex justify-center items-start min-h-screen w-full'>
      <Card className='max-w-max'>
        <CardHeader>
          <CardTitle>Buat Kategori Produk Baru</CardTitle>
          <CardDescription className='max-w-xl'>
            Anda bisa membuat kategori produk baru, seperti bahan masakan, makanan, minuman dan lain
            sebagainnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProductCategoryForm />
        </CardContent>
      </Card>
    </div>
  )
}
