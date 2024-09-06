type ProductCategory = { id: string; name: string };

type ProductImage = { id: string; url: string };

type ProductStock = { id: string; available: number; sold: number };

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;

  stock: ProductStock;
  image?: ProductImage;

  createdAt: string;
  updatedAt: string;
};
