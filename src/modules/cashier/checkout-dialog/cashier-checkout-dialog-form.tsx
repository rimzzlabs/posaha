'use form'

import { Form } from '@/components/ui/form'

import { useCreateTransaction } from '@/app/app/product/__hooks'
import { checkoutAtom } from '@/states/checkout'

import { CashierCheckoutDialogFooter } from './cashier-checkout-dialog-footer'
import { CashierCheckoutDialogMoney } from './cashier-checkout-dialog-money'
import { CashierCheckoutDialogPayment } from './cashier-checkout-dialog-payment'
import { CashierCheckoutDialogTotals } from './cashier-checkout-dialog-totals'

import { useAtomValue } from 'jotai'

export function CashierCheckoutDialogForm() {
  let form = useCreateTransaction()

  let dialogState = useAtomValue(checkoutAtom)

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className='grid gap-3'>
        <CashierCheckoutDialogPayment />
        <CashierCheckoutDialogMoney />

        <CashierCheckoutDialogTotals cartItems={dialogState.cartItems} />

        <CashierCheckoutDialogFooter />
      </form>
    </Form>
  )
}
