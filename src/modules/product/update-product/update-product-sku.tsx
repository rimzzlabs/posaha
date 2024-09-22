import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { createProductSchema } from '@/app/app/product/__schema'
import { isFormPending } from '@/lib/utils'

import { A, pipe, S } from '@mobily/ts-belt'
import { omit } from 'radash'
import { useFormContext } from 'react-hook-form'
import { match, P } from 'ts-pattern'
import { z } from 'zod'

export function UpdateProductSKU() {
  let form = useFormContext<z.infer<typeof createProductSchema>>()
  let disabledInteractive = isFormPending(form.formState)

  let synthesizedOnChange = (onChange: (...e: unknown[]) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let nativeEvent = event.nativeEvent
      let isFromClipboard =
        'inputType' in nativeEvent && nativeEvent.inputType === 'insertFromPaste'

      let processValue = (value: string): string =>
        pipe(
          value,
          S.toUpperCase,
          S.replaceByRe(/\s+/g, '-'),
          S.replaceByRe(/[^a-zA-Z0-9\s-]/g, ''),
          (v) => (S.startsWith(v, '-') ? v.slice(1) : v),
          (v) => {
            let match = /-+$/.exec(v)
            if (match && S.length(match[0]) > 1) {
              return S.slice(v, 0, -S.length(match[0])) + '-'
            }
            return v
          },
        )

      let nextValue = match([isFromClipboard, event.target.value])
        .with([true, P.select()], (value) =>
          pipe(value, processValue, S.split('-'), A.filter(S.isNotEmpty), A.join('-')),
        )
        .otherwise(([, value]) => processValue(value))

      // If the last character is '-', don't update
      if (S.endsWith(event.target.value, '-') && !S.endsWith(nextValue, '-')) {
        return
      }

      onChange(nextValue)
    }
  }

  return (
    <FormField
      name='sku'
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel asterisk>Produk SKU</FormLabel>
          <div className='relative'>
            <p className='leading-none text-sm tracking-tight text-foreground absolute left-3 top-[0.6875rem]'>
              POS-
            </p>
            <FormControl>
              <Input
                {...omit(field, ['onChange'])}
                className='pl-[2.875rem]'
                placeholder='MINYAK-500ML'
                disabled={disabledInteractive}
                onChange={synthesizedOnChange(field.onChange)}
              />
            </FormControl>
          </div>
          <FormDescription>
            SKU atau Stock Keeping Unit wajib ada dan harus unik untuk setiap masing-masing
            produknya.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
