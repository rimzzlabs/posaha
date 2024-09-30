'use form'

import { For } from '@/components/ui/for'
import { Form } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'

import { useCreateTransaction } from '@/app/app/transaction/__hooks'
import { checkoutAtom } from '@/states/checkout'

import { CashierCheckoutDialogFooter } from './cashier-checkout-dialog-footer'
import { CashierCheckoutDialogMoney } from './cashier-checkout-dialog-money'
import { CashierCheckoutDialogPayment } from './cashier-checkout-dialog-payment'
import { CashierCheckoutDialogProductItem } from './cashier-checkout-dialog-product-item'
import { CashierCheckoutDialogRemark } from './cashier-checkout-dialog-remark'
import { CashierCheckoutDialogTotals } from './cashier-checkout-dialog-totals'

import { F, O, pipe } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'

export function CashierCheckoutDialogForm() {
  let form = useCreateTransaction()
  let dialogState = useAtomValue(checkoutAtom)

  let cartItems = pipe(O.fromNullable(dialogState?.cartItems), O.mapWithDefault([], F.identity))

  return (
    <Fragment>
      <Form {...form}>
        <div className='grid gap-x-3 md:grid-cols-2 lg:gap-x-4'>
          <div>
            <ScrollArea className='h-48 md:h-72'>
              <div className='grid gap-2'>
                <For each={cartItems}>
                  {(item) => <CashierCheckoutDialogProductItem {...item} />}
                </For>
              </div>
            </ScrollArea>

            <CashierCheckoutDialogTotals cartItems={cartItems} />
          </div>

          <form onSubmit={form.onSubmit} className='flex flex-col gap-y-3'>
            <CashierCheckoutDialogPayment />
            <CashierCheckoutDialogMoney />

            <CashierCheckoutDialogRemark />

            <CashierCheckoutDialogFooter />
          </form>
        </div>
      </Form>
    </Fragment>
  )
}
