import { CardDescription, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { formatPrice } from '@/lib/number'

import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { match, P } from 'ts-pattern'

export function CashierCheckoutDialogProductItem(props: TCartProductItem) {
  let product = props.product
  let image = match(props.product.image)
    .with(P.string, (src) => (
      <Image
        fill
        src={src}
        loading='lazy'
        alt={product.name}
        className='shrink-0 grow-0 rounded-md object-cover'
      />
    ))
    .otherwise(() => (
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <div className='flex aspect-square w-14 items-center justify-center rounded-md bg-muted text-muted-foreground'>
            <ImageIcon className='size-2.5 lg:size-3' />
            <span className='sr-only'>Tidak ada gambar produk</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-sm font-medium'>Produk ini belum mempunyai foto</p>
        </TooltipContent>
      </Tooltip>
    ))

  return (
    <div className='grid grid-cols-[minmax(3.5rem,3.5rem)_minmax(0,1fr)] py-3'>
      <div className='pl-2'>
        <div className='relative aspect-square w-14'>{image}</div>
      </div>

      <div className='px-4 pl-4'>
        <CardTitle className='sr-only'>{product.name}</CardTitle>
        <CardDescription>{product.name}</CardDescription>
        <p className='mb-2 font-bold'>{formatPrice(product.price)}</p>

        <p className='text-sm text-muted-foreground'>Kuantitas: {props.quantity}</p>
      </div>
    </div>
  )
}
