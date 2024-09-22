import { createProductAction } from '../__actions/create-product'
import { createProductSchema } from '../__schema/product-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const TOAST_PENDING = 'Membuat Produk Baru, harap tunggu'
const TOAST_ERROR = 'Tidak dapat membuat produk baru'

export function useCreateProduct() {
  let router = useRouter()

  let form = useForm<z.infer<typeof createProductSchema>>({
    defaultValues: {
      image: null,
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
    toast.loading(TOAST_PENDING)
    let res = await createProductAction(values)
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

    toast.success('Berhasil menambahkan produk baru!')
    router.push('/app/product/list')
  })

  return { form, onSubmit }
}
