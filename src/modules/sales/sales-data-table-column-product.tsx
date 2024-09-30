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

import { SalesDataTableColumnProductItem } from './sales-data-table-column-product-item'

import { EyeIcon } from 'lucide-react'

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
            Berikut adalah produk yang dibeli pada hari{' '}
            <span className='font-semibold'>{date}</span> yang dilayani oleh kasir{' '}
            <span className='font-semibold'>{props.user?.name ?? '-'}</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-96'>
          <div className='grid gap-3 py-4 pr-2.5'>
            <For each={props.items}>
              {(args) => <SalesDataTableColumnProductItem key={args.id} {...args} />}
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
