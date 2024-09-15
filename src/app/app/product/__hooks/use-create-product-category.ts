import { productCategoryAtom } from '@/states/product-category'

import { createProductCategorySchema } from '../__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { A, F, pipe } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { random, sleep, uid } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function useCreateProductCategory() {
  let router = useRouter()
  let updateProductCategory = useSetAtom(productCategoryAtom)

  let form = useForm<z.infer<typeof createProductCategorySchema>>({
    defaultValues: { label: '', color: '' },
    resolver: zodResolver(createProductCategorySchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    let toastId = toast.loading('Memproses permintaan, harap tunggu...')
    await sleep(random(350, 800))
    let timestamp = new Date().toISOString()
    let newCategory: ProductCategory = {
      id: uid(32),
      color: values.color,
      name: values.label,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    updateProductCategory((prev) => pipe(prev, A.append(newCategory), F.toMutable))
    toast.dismiss(toastId)
    toast.success('Kategori produk berhasil ditambahkan!')
    router.push('/app/product/category/list')
  })

  return { form, onSubmit }
}
