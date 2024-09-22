import { updateProductAction } from '../__actions/update-product'
import { updateProductSchema } from '../__schema/product-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { F, N, O, pipe } from '@mobily/ts-belt'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

const TOAST_PENDING = 'Memberbarui Produk, harap tunggu'
const TOAST_ERROR = 'Tidak dapat memperbarui produk'

export function useUpdateProduct(product: Product) {
  let router = useRouter()

  let form = useForm<z.infer<typeof updateProductSchema>>({
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      stock: 0,
      image: product.image,
      category: product.category.id,
      description: product.description ?? undefined,
    },
    resolver: zodResolver(updateProductSchema),
  })

  let onSubmit = form.handleSubmit(async (values: z.infer<typeof updateProductSchema>) => {
    let stock = pipe(
      values.stock,
      O.fromNullable,
      O.mapWithDefault(0, F.identity),
      N.add(product.stock),
    )

    toast.dismiss()
    toast.loading(TOAST_PENDING)

    let res = await updateProductAction({ ...values, stock })
    toast.dismiss()

    if (res?.serverError || res?.validationErrors || !res?.data) {
      toast.error(TOAST_ERROR, { description: 'Harap coba beberapa saat lagi' })
      return
    }

    if (!res.data.ok) {
      let isDuplicate = res.data.error === 'kode SKU Ini Sudah Ada'
      if (isDuplicate) form.setError('sku', { message: res.data.error })
      toast.error(res.data.error)
      return
    }

    toast.success('Berhasil memperbarui produk!')
    router.push('/app/product/list')
  })

  return { form, onSubmit }
}
