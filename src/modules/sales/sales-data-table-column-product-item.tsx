import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { formatPrice } from '@/lib/number'

import { N, pipe } from '@mobily/ts-belt'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { match, P } from 'ts-pattern'

type TSalesDataTableColumnProductItem = {
  id: string
  productId: string
  name: string
  subTotal: number
  image: string | null
  quantity: number
  price: number
}

export function SalesDataTableColumnProductItem(props: TSalesDataTableColumnProductItem) {
  let productPrice = formatPrice(props.price)
  let subTotal = pipe(props.price, N.multiply(props.quantity), formatPrice)

  let image = match(props.image)
    .with(P.string, (src) => (
      <Image
        src={src}
        width={128}
        height={128}
        loading='lazy'
        alt={props.name}
        className='h-10 w-10 shrink-0 grow-0 rounded-md object-cover'
      />
    ))
    .otherwise(() => (
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <div className='flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground'>
            <ImageIcon size='1rem' />
            <span className='sr-only'>Tidak ada gambar produk</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-sm font-medium'>Produk ini belum mempunyai foto</p>
        </TooltipContent>
      </Tooltip>
    ))

  return (
    <div className='flex items-center gap-x-2'>
      {image}

      <div className='max-w-32 md:max-w-52'>
        <p className='truncate text-sm font-medium'>{props.name}</p>
        <p className='text-sm font-semibold'>{productPrice}</p>
      </div>

      <div className='ml-auto text-end'>
        <p className='text-sm'>
          Kuantitas: <span className='font-semibold'>{props.quantity}x</span>
        </p>
        <p className='text-sm'>
          Sub: <span className='font-semibold'>{subTotal}</span>
        </p>
      </div>
    </div>
  )
}
