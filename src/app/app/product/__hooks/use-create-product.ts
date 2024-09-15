import { productListAtom } from '@/states/product'
import { productCategoryAtom } from '@/states/product-category'

import { createProductSchema } from '../__schema/product-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { A, F, pipe, S } from '@mobily/ts-belt'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { random, sleep, uid } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function useCreateProduct() {
  let router = useRouter()
  let updateProductList = useSetAtom(productListAtom)
  let productCategoryList = useAtomValue(productCategoryAtom)

  let form = useForm<z.infer<typeof createProductSchema>>({
    defaultValues: {
      name: '',
      stock: 1,
      description: '',
      category: '',
      sku: '',
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
    let category = pipe(
      productCategoryList,
      A.getBy((category) => S.includes(values.category)(category.id)),
    )

    if (!category) {
      toast.dismiss()
      toast.error('Kategori produk tidak valid')
      return
    }

    let sku = pipe(
      values.sku,
      S.toUpperCase,
      S.replaceByRe(/\s+/g, '-'),
      F.ifElse(S.startsWith('-'), S.sliceToEnd(1), F.identity),
      (value) => {
        const match = /-+$/.exec(value)
        if (match && match[0].length > 1) {
          return value.slice(0, -match[0].length) + '-'
        }
        return value
      },
      S.split('-'),
      A.filter((value) => S.length(value) > 0),
      A.join('-'),
      S.prepend('POS-'),
    )
    let stock = {
      sold: 0,
      id: uid(12),
      available: values.stock,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    let newProduct: Product = {
      id: uid(32),
      name: values.name,
      description: values.description,
      createdAt: timestamp,
      updatedAt: timestamp,
      price: values.price,
      sku,
      category,
      stock,
    }
    updateProductList((prev) => prev.concat([newProduct]))
    toast.dismiss(toastId)
    toast.success('Berhasil menambahkan produk baru!')
    router.push('/app/product/list')
  })

  return { form, onSubmit }
}
