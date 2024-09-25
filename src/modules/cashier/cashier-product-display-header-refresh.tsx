'use client'

import { Button } from '@/components/ui/button'

import { B } from '@mobily/ts-belt'
import { Loader2Icon, RefreshCwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as R from 'react'
import { toast } from 'sonner'

export function CashierProductDisplayHeaderRefresh() {
  let router = useRouter()
  let [isRefreshing, startTransition] = R.useTransition()

  let onClickRefresh = R.useCallback(() => {
    toast.dismiss()
    startTransition(() => {
      router.refresh()
      toast.success('Daftar produk berhasil diperbarui')
    })
  }, [])

  return (
    <Button
      variant='ghost'
      disabled={isRefreshing}
      onClick={onClickRefresh}
      className='h-9 w-9 gap-x-2 p-0 max-md:ml-auto'
    >
      {B.ifElse(
        isRefreshing,
        () => (
          <Loader2Icon size='1rem' className='animate-spin-ease' />
        ),
        () => (
          <RefreshCwIcon size='1rem' />
        ),
      )}
      <span className='sr-only'>Perbarui</span>
    </Button>
  )
}
