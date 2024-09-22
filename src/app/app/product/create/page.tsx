import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { getAllCategoryList } from '@/database/query/category'
import { CreateProductForm } from '@/modules/product/create-product'

export default async function AddProductPage() {
  const categoryList = await getAllCategoryList()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl lg:text-2xl'>Buat Produk Baru</CardTitle>
        <CardDescription>Anda bisa membuat produk baru disini</CardDescription>
      </CardHeader>

      <CardContent>
        <CreateProductForm categoryList={categoryList} />
      </CardContent>
    </Card>
  )
}
