'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { TCreateTransactionSchema } from '@/app/app/product/__schema'

import { omit } from 'radash'
import CurrencyInput from 'react-currency-input-field'
import { useFormContext } from 'react-hook-form'

export function CashierCheckoutDialogMoney() {
  let form = useFormContext<TCreateTransactionSchema>()

  return (
    <FormField
      name='totalAmount'
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Uang Pembeli</FormLabel>
          <FormControl>
            <CurrencyInput
              customInput={Input}
              {...omit(field, ['onChange'])}
              prefix='Rp. '
              groupSeparator='.'
              decimalSeparator=','
              inputMode='numeric'
              allowDecimals={false}
              allowNegativeValue={false}
              placeholder='Rp. 50.750'
              onValueChange={(value) => {
                field.onChange(value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
