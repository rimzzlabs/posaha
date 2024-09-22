type Product = {
  id: string
  name: string
  image: string | null
  createdAt: string
  updatedAt: string
  description: string | null
  sku: string
  price: number
  stock: number
  sold: number
  category: ProductCategory
}
