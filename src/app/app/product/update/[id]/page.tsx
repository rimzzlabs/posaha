import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { getAllCategoryList } from '@/database/query/category'
import { getProductById } from '@/database/query/product'
import { UpdateProductForm } from '@/modules/product/update-product'

import { F, O, pipe } from '@mobily/ts-belt'
import { notFound } from 'next/navigation'

export default async function UpdateProductPage(props: TPageProps) {
  let productId = pipe(props.params?.id, O.fromNullable, O.map(F.identity))
  if (!productId) notFound()

  let [product, categoryList] = await Promise.all([getProductById(productId), getAllCategoryList()])
  if (!product.data) notFound()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl lg:text-2xl'>Perbarui Produk</CardTitle>
        <CardDescription>Anda bisa memperbarui data produk baru disini</CardDescription>
      </CardHeader>

      <CardContent>
        <UpdateProductForm
          key={product.data.id}
          product={product.data}
          categoryList={categoryList.data}
        />
      </CardContent>
    </Card>
  )
}
