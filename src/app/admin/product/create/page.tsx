import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { CreateProductForm } from '@/modules/product/create-product'

export default function AddProductPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl lg:text-2xl'>Buat Produk Baru</CardTitle>
        <CardDescription>Anda bisa membuat produk baru disini</CardDescription>
      </CardHeader>

      <CardContent>
        <CreateProductForm />
      </CardContent>
    </Card>
  )
}
