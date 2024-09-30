import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import type { updateStockProductSchemaForm } from '@/app/app/product/__schema'
import { closeUpdateStockDialogAtom } from '@/states/popups'

import { B } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { Loader2Icon, SendHorizontalIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { z } from 'zod'

export function UpdateProductStockDialogFooter() {
  let closeUpdateStockDialog = useSetAtom(closeUpdateStockDialogAtom)

  let form = useFormContext<z.infer<typeof updateStockProductSchemaForm>>()

  let disableButton = form.formState.isSubmitting
  let submitIcon = B.ifElse(
    disableButton,
    () => <Loader2Icon size='1em' className='animate-spin' />,
    () => <SendHorizontalIcon size='1em' />,
  )

  let onClickCloseDialog = () => closeUpdateStockDialog()

  return (
    <AlertDialogFooter className='pt-10'>
      <AlertDialogCancel asChild>
        <Button variant='outline' disabled={disableButton} onClick={onClickCloseDialog}>
          Batalkan
        </Button>
      </AlertDialogCancel>

      <Button disabled={disableButton} type='submit' className='gap-x-2'>
        Kirim {submitIcon}
      </Button>
    </AlertDialogFooter>
  )
}
