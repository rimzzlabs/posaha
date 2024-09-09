import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

import { D, F, pipe } from '@mobily/ts-belt'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

type TModalConfirmation = {
  title: string
  description: string
  labelAction?: string
  isPending?: boolean
  onAction: (() => Promise<void>) | (() => void)
}

export function ModalConfirmation(props: TModalConfirmation) {
  let [isPending, setIsPending] = useState(false)

  let title = pipe(props, D.get('title'), F.defaultTo('Judul komponen modal'))
  let description = pipe(props, D.get('description'), F.defaultTo('Deksripsi komponen modal'))
  let labelAction = pipe(props, D.get('labelAction'), F.defaultTo('Konfirmasi'))
  let onAction = pipe(props, D.get('onAction'), F.defaultTo(Promise.resolve))

  let handleClick = async () => {
    setIsPending(true)
    await onAction()
  }

  let preventCloseEvent = (e: Event | KeyboardEvent) => {
    isPending && e.preventDefault()
  }

  return (
    <DialogContent
      onCloseAutoFocus={preventCloseEvent}
      onEscapeKeyDown={preventCloseEvent}
      onPointerDownOutside={preventCloseEvent}
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose disabled={isPending} asChild>
          <Button variant='outline'>Batalkan</Button>
        </DialogClose>
        <Button className='gap-x-2' onClick={handleClick} disabled={isPending}>
          {F.ifElse(
            isPending,
            F.identity,
            F.always(<Loader2Icon size='1em' className='animate-spin' />),
            F.always(null),
          )}

          {labelAction}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
