type ProductStock = TPrettify<
  {
    id: string
    available: number
    sold: number
  } & TTimeStamp
>

type ProductImage = TPrettify<
  {
    id: string
    url: string
  } & TTimeStamp
>

type Product = TPrettify<
  {
    id: string
    name: string
    price: number
    stock: ProductStock

    banner?: ProductImage
    images?: Array<ProductImage>
    description?: string | null
  } & TTimeStamp
>
