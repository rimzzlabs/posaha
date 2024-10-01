'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { TGetDashboardResult } from '@/database/query/sales'
import { formatPrice } from '@/lib/number'
import { cn } from '@/lib/utils'

import { B, O, pipe } from '@mobily/ts-belt'
import { ArrowRight, InboxIcon, RefreshCwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toFloat } from 'radash'
import * as R from 'react'

type TDashboardTransaction = {
  data: TGetDashboardResult['data']['transactions']
}
export function DashboardTransaction(props: TDashboardTransaction) {
  let router = useRouter()
  let [isPending, startTransition] = R.useTransition()

  let transactions = pipe(
    props.data,
    O.mapWithDefault([], (data) => data),
  )

  let isEmpty = transactions.length === 0

  let onClickRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Card>
      <CardHeader className='flex-row justify-between space-y-0'>
        <div>
          <CardTitle>Transaksi Terakhir</CardTitle>
          <CardDescription>10 Transaksi terakhir akan muncul disini.</CardDescription>
        </div>

        <Button
          onClick={onClickRefresh}
          disabled={isPending}
          size='sm'
          variant='secondary'
          className='gap-x-2'
        >
          <RefreshCwIcon size='1em' className={cn(isPending && 'animate-spin-ease')} />
          Perbarui
        </Button>
      </CardHeader>

      <CardContent className='px-4'>
        <ScrollArea className='h-[31rem] pr-4'>
          <div className='flex flex-col gap-2'>
            {B.ifElse(
              B.inverse(isEmpty),
              () => (
                <R.Fragment>
                  <For each={transactions}>
                    {(trx) => (
                      <Card key={trx.id} className='flex items-end shadow-none'>
                        <CardHeader className='p-4'>
                          <CardTitle className='relative'>{trx.cashier}</CardTitle>
                          <CardDescription className='font-semibold text-emerald-500'>
                            + {formatPrice(toFloat(trx.totalAmount, 0))}
                          </CardDescription>
                          <CardDescription>
                            <span className='font-semibold'>Jumlah Pembelian</span>:{' '}
                            {trx.totalQuantity}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </For>

                  <Button variant='ghost' className='mx-auto max-w-max gap-x-2'>
                    Semua Transaksi <ArrowRight size='1em' />
                  </Button>
                </R.Fragment>
              ),
              () => (
                <div className='flex h-96 flex-col items-center justify-center gap-2'>
                  <InboxIcon size='2.25rem' className='stroke-muted-foreground' />
                  <p className='text-sm font-medium text-muted-foreground'>Belum ada transaksi</p>
                </div>
              ),
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <p className='font-medium leading-none text-muted-foreground'>
          Transaksi tidak bersifat real-time, anda dapat memperbarui data dengan bantuan tombol
          &quot;perbarui&quot; diatas
        </p>
      </CardFooter>
    </Card>
  )
}
