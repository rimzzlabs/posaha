import { createCategoryAction } from '../__actions'
import { createCategorySchema } from '../__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function useCreateCategory() {
  let router = useRouter()

  let form = useForm<z.infer<typeof createCategorySchema>>({
    defaultValues: { name: '', color: '' },
    resolver: zodResolver(createCategorySchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    let toastId = toast.loading('Memproses permintaan, harap tunggu...')
    let res = await createCategoryAction(values)
    toast.dismiss(toastId)
    if (res?.serverError || !res?.data) {
      toast.error('Terjadi kesalahan pada server', {
        description: res?.serverError ?? 'Unknown error',
      })
      return
    }
    if (!res.data.ok) {
      if (res.data.error === 'Kategori Ini Sudah Ada') {
        form.setError('name', { message: res.data.error })
      }
      toast.error(res.data.error)
      return
    }

    toast.success('Kategori produk berhasil ditambahkan!')
    router.push('/app/product/category/list')
  })

  return { form, onSubmit }
}
