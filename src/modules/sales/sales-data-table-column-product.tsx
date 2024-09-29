import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { TSalesListResult } from '@/database/query/sales'
import { formatDate } from '@/lib/dates'
import { formatPrice } from '@/lib/number'

import { N, pipe } from '@mobily/ts-belt'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import { match, P } from 'ts-pattern'

export function SalesDataTableColumnProduct(props: TSalesListResult['data'][number]) {
  let date = formatDate(props.createdAt, 'EEEE, dd MM yyyy - HH:mm')

  return (
    <Dialog>
      <div className='inline-flex items-center gap-x-2'>
        <DialogTrigger asChild>
          <Button variant='secondary' className='h-9 w-9 gap-x-1 p-0'>
            <EyeIcon size='1em' />
            <span className='sr-only'>Lihat Produk</span>
          </Button>
        </DialogTrigger>
        <p>{props.totalQuantity} Produk</p>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Pembelian</DialogTitle>
          <DialogDescription>
            Berikut adalah produk yang dibeli pada hari {date} yang dilayani oleh kasir{' '}
            {props.user?.name}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-96'>
          <div className='grid gap-3 py-4 pr-2.5'>
            <For each={props.items}>
              {(transaction) => (
                <div key={transaction.id} className='flex items-center gap-x-2'>
                  {match(transaction.image)
                    .with(P.nullish, () => (
                      <div className='h-10 w-10 rounded-md bg-muted text-muted-foreground'>
                        <p className='text-sm font-medium'>Tidak ada gambar</p>
                      </div>
                    ))
                    .otherwise((img) => (
                      <Image
                        src={img}
                        width={128}
                        height={128}
                        loading='lazy'
                        alt={transaction.name}
                        className='h-10 w-10 shrink-0 grow-0 rounded-md object-cover'
                      />
                    ))}

                  <div className='max-w-32 md:max-w-52'>
                    <p className='truncate text-sm font-medium'>{transaction.name}</p>
                    <p className='text-sm font-semibold'>{formatPrice(transaction.price)}</p>
                  </div>

                  <div className='ml-auto text-end'>
                    <p className='text-sm'>
                      Kuantitas: <span className='font-semibold'>{transaction.quantity}x</span>
                    </p>
                    <p className='text-sm'>
                      Sub:{' '}
                      <span className='font-semibold'>
                        {pipe(transaction.price, N.multiply(transaction.quantity), formatPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
