import { CardDescription, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/lib/number'

import Image from 'next/image'
import { match, P } from 'ts-pattern'

export function CashierCheckoutDialogProductItem(props: TCartProductItem) {
  let product = props.product

  return (
    <div className='grid grid-cols-[minmax(3.5rem,3.5rem)_minmax(0,1fr)] py-3'>
      <div className='pl-2'>
        <div className='relative aspect-square w-14'>
          {match(product.image)
            .with(P.not(P.nullish), (image) => (
              <Image
                fill
                src={image}
                loading='lazy'
                alt={product.name}
                className='shrink-0 grow-0 rounded-md object-cover'
              />
            ))
            .otherwise(() => null)}
        </div>
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
