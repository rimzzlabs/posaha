import { productListAtom } from '@/states/product'

import { createProductSchema } from '../__schema/product-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { random, sleep, uid } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function useCreateProduct() {
  let router = useRouter()
  let updateProductList = useSetAtom(productListAtom)

  let form = useForm<z.infer<typeof createProductSchema>>({
    defaultValues: {
      name: '',
      stock: 1,
      description: '',
      price: '' as unknown as number,
    },
    resolver: zodResolver(createProductSchema),
  })

  let onSubmit = form.handleSubmit(async (values: z.infer<typeof createProductSchema>) => {
    toast.dismiss()
    let toastId = toast.loading('Memproses permintaan', {
      description: 'Harap tunggu beberapa saat',
    })
    await sleep(random(50, 800))
    let timestamp = new Date().toISOString()

    let newProduct: Product = {
      id: uid(32),
      name: values.name,
      description: values.description,
      createdAt: timestamp,
      updatedAt: timestamp,
      price: values.price,
      stock: {
        sold: 0,
        id: uid(12),
        available: values.stock,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    }
    updateProductList((prev) => prev.concat([newProduct]))
    toast.dismiss(toastId)
    toast.success('Berhasil menambahkan produk baru!')
    router.push('/admin/product/list')
  })

  return { form, onSubmit }
}
