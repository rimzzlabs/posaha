'use client'

import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import type { TCreateTransactionSchema } from '@/app/app/transaction/__schema'

import { Loader2Icon, SendHorizontalIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { match } from 'ts-pattern'

export function CashierCheckoutDialogFooter() {
  let form = useFormContext<TCreateTransactionSchema>()
  let isPending = form.formState.isSubmitting

  let buttonIcon = match(isPending)
    .with(true, () => <Loader2Icon size='1em' className='animate-spin-ease' />)
    .otherwise(() => <SendHorizontalIcon size='1em' />)

  return (
    <AlertDialogFooter className='mt-auto'>
      <AlertDialogCancel type='button' disabled={isPending}>
        Kembali
      </AlertDialogCancel>

      <Button type='submit' className='gap-x-2' disabled={isPending}>
        Proses
        {buttonIcon}
      </Button>
    </AlertDialogFooter>
  )
}
