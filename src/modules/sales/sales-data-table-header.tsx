'use client'

import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

import { RefreshCwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function SalesDataTableHeader() {
  let router = useRouter()
  let [isPending, startTransition] = useTransition()

  let onClickRefresh = () => {
    toast.dismiss()
    startTransition(() => {
      router.refresh()
    })
    toast.success('Data berhasil diperbarui')
  }

  return (
    <CardHeader className='flex-col-reverse justify-between gap-x-2 space-y-0 pb-12 md:flex-row'>
      <div className='space-y-1.5'>
        <CardTitle>Daftar transaksi yang baru saja dilakukan</CardTitle>
        <CardDescription className='text-balance'>
          Transaksi tidak bersifat real-time, anda dapat mengklik tombol refresh di samping kanan
          untuk memperbarui data
        </CardDescription>
      </div>

      <Button
        variant='secondary'
        disabled={isPending}
        onClick={onClickRefresh}
        className='ml-auto max-w-max'
      >
        <RefreshCwIcon size='1em' className={cn(isPending && 'animate-spin-ease')} />

        <span className='sr-only'>Refresh data table</span>
      </Button>
    </CardHeader>
  )
}
