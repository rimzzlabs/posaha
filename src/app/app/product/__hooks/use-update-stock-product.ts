import { closeUpdateStockDialogAtom, updateStockDialogAtom } from '@/states/popups'

import { updateStockAction } from '../__actions/update-stock'
import { updateStockProductSchemaForm } from '../__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAtomValue, useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function useUpdateStockProduct() {
  let dialogState = useAtomValue(updateStockDialogAtom)
  let closeDialog = useSetAtom(closeUpdateStockDialogAtom)

  let form = useForm<z.infer<typeof updateStockProductSchemaForm>>({
    defaultValues: {
      stock: '' as unknown as number,
    },
    resolver: zodResolver(updateStockProductSchemaForm),
  })

  let onSubmit = form.handleSubmit(
    async (values) => {
      if (!dialogState.productId) {
        return toast.error('Terjadi kesalahan, harap perbarui halaman')
      }
      toast.dismiss()
      toast.loading('Memproses, harap tunggu...')
      let res = await updateStockAction({
        ...values,
        productId: dialogState.productId,
      })
      toast.dismiss()

      if (res?.serverError || res?.validationErrors || !res?.data) {
        return toast.error('Terjadi kesalahan pada server', {
          description: 'Harap coba beberapa saat lagi',
        })
      }
      if (!res.data.ok) {
        return toast.error(res.data.error)
      }

      form.reset()
      closeDialog()
      toast.success('Berhasil memberbarui stok produk!')
    },
    (err) => console.info(err),
  )

  return { form, onSubmit }
}
