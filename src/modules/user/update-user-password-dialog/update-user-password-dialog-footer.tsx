import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import type { updateUserPasswordSchema } from '@/app/app/user/__schema'

import { B } from '@mobily/ts-belt'
import { Loader2Icon, SendHorizontalIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { z } from 'zod'

export function UpdateUserPasswordDialogFooter() {
  let form = useFormContext<z.infer<typeof updateUserPasswordSchema>>()

  let disableButton = form.formState.isSubmitting
  let submitIcon = B.ifElse(
    disableButton,
    () => <Loader2Icon size='1em' className='animate-spin-ease' />,
    () => <SendHorizontalIcon size='1em' />,
  )

  return (
    <AlertDialogFooter>
      <AlertDialogCancel asChild>
        <Button variant='outline' disabled={disableButton}>
          Batalkan
        </Button>
      </AlertDialogCancel>

      <Button type='submit' disabled={disableButton}>
        Kirim
        {submitIcon}
      </Button>
    </AlertDialogFooter>
  )
}
