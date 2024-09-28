import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'

import { CashierSidebarCartProductListItem } from './cashier-sidebar-cart-product-list-item'

import { A, F, N, O, pipe } from '@mobily/ts-belt'

export function CashierSidebarCartProductList(props: { cartItems: Array<TCartProductItem> }) {
  let isProductEmpty = pipe(
    props.cartItems,
    O.fromNullable,
    O.mapWithDefault([], F.identity),
    A.length,
    N.lt(1),
  )

  if (isProductEmpty) return null

  return (
    <div className='pb-4'>
      <ScrollArea className='h-[calc(100svh-26rem)] xl:h-[34.5rem]'>
        <div className='grid gap-2'>
          <For each={props.cartItems}>
            {(args) => <CashierSidebarCartProductListItem key={args.id} {...args} />}
          </For>
        </div>
      </ScrollArea>
    </div>
  )
}
