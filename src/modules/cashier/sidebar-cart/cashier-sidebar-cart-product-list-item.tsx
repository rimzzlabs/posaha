import { CardDescription, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/lib/number'

import { CashierSidebarCartProductQty } from './cashier-sidebar-cart-product-qty'

import Image from 'next/image'
import { match, P } from 'ts-pattern'

export function CashierSidebarCartProductListItem(props: TCartProductItem) {
  let product = props.product

  return (
    <div className='grid grid-cols-[minmax(2.5rem,2.5rem)_minmax(0,1fr)] py-3'>
      <div className='pl-2'>
        <div className='relative aspect-square w-10'>
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
        <p className='font-bold'>{formatPrice(product.price)}</p>

        <div className='flex'>
          <CashierSidebarCartProductQty
            key={props.quantity}
            stock={product.stock}
            quantity={props.quantity}
            cartItemId={props.id}
          />
        </div>
      </div>
    </div>
  )
}
