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

import { formatPrice } from '@/lib/number'
import { cn } from '@/lib/utils'

import { B, O, Option, pipe } from '@mobily/ts-belt'
import { ArrowRight, EyeIcon, InboxIcon, Package, RefreshCwIcon } from 'lucide-react'
import { random, sleep } from 'radash'
import * as R from 'react'
import { toast } from 'sonner'

type TDashboardTransaction = {
  data: Option<
    Array<{
      id: string
      name: string
      price: number
      qty: number
      total: number
      timestamp: string
    }>
  >
}
export function DashboardTransaction(props: TDashboardTransaction) {
  let [pending, setPending] = R.useState(false)
  let transactions = pipe(
    props.data,
    O.mapWithDefault([], (data) => data),
  )
  let [isEmpty, setIsEmpty] = R.useState(true)

  let mockRefresh = async () => {
    setPending(true)
    await sleep(random(800, 1800))
    setPending(false)
    setIsEmpty(transactions.length === 0)
    toast.success('Data berhasil diperbarui!')
  }

  return (
    <Card>
      <CardHeader className='flex-row space-y-0 justify-between'>
        <div>
          <CardTitle>Transaksi Terakhir</CardTitle>
          <CardDescription>10 Transaksi terakhir akan muncul disini.</CardDescription>
        </div>

        <Button
          size='sm'
          variant='secondary'
          disabled={pending}
          onClick={mockRefresh}
          className='gap-x-2'
        >
          <RefreshCwIcon size='1em' className={cn(pending && 'animate-spin')} />
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
                          <CardTitle className='relative'>{trx.name}</CardTitle>
                          <CardDescription className='text-emerald-500 font-semibold'>
                            {formatPrice(trx.total)}
                          </CardDescription>
                          <CardDescription>
                            <span className='font-semibold'>Jumlah Pembelian</span>: {trx.qty}
                          </CardDescription>
                          <CardDescription>
                            <span className='font-semibold'>Harga Produk</span>:{' '}
                            {formatPrice(trx.price)}
                          </CardDescription>
                        </CardHeader>

                        <CardFooter className='p-4 gap-1 flex-col items-end ml-auto'>
                          <Button className='gap-x-1' size='sm' variant='ghost'>
                            <Package size='1em' />
                            Lihat Produk
                          </Button>
                          <Button className='gap-x-1' size='sm' variant='secondary'>
                            <EyeIcon size='1em' />
                            Lihat Transaksi
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                  </For>

                  <Button variant='ghost' className='gap-x-2 max-w-max mx-auto'>
                    Semua Transaksi <ArrowRight size='1em' />
                  </Button>
                </R.Fragment>
              ),
              () => (
                <div className='h-96 flex flex-col items-center justify-center gap-2'>
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
