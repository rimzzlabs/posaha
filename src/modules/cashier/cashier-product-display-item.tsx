import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { formatPrice } from '@/lib/number'

import { CashierProductDisplayItemButton } from './cashier-product-display-item-button'

import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { match, P } from 'ts-pattern'

export function CashierProductDisplayItem(props: Product) {
  let price = formatPrice(props.price)
  let image = match(props.image)
    .with(P.not(P.nullish), (image) => (
      <Image
        fill
        alt={props.name}
        src={image}
        loading='lazy'
        sizes='(max-width: 768px) 240px, 100vw'
        className='shrink-0 grow-0 object-cover brightness-75 transition hover:brightness-100'
      />
    ))
    .otherwise(() => (
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <div className='flex h-32 items-center justify-center rounded-md bg-muted text-muted-foreground md:h-36 lg:h-40 xl:h-48'>
            <ImageIcon className='size-4 lg:size-12' />
            <span className='sr-only'>Tidak ada gambar produk</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-sm font-medium'>Produk ini belum mempunyai foto</p>
        </TooltipContent>
      </Tooltip>
    ))

  return (
    <Card>
      <div className='relative h-32 md:h-36 lg:h-40 xl:h-48'>
        {image}
        <Badge
          variant='secondary'
          className='absolute bottom-2 right-2 max-w-max dark:text-stone-950'
          style={{ backgroundColor: props.category.color }}
        >
          {props.category.name}
        </Badge>
      </div>
      <CardHeader className='p-4'>
        <CardTitle className='sr-only'>{props.name}</CardTitle>
        <CardDescription className='truncate'>{props.name}</CardDescription>

        <p className='font-bold'>{price}</p>
        <p className='text-sm font-medium text-muted-foreground'>
          Stok: <span className='font-semibold'>{props.stock}</span>
        </p>
      </CardHeader>

      <CardFooter className='justify-end p-4 pb-3 pt-0'>
        <CashierProductDisplayItemButton productId={props.id} />
      </CardFooter>
    </Card>
  )
}
