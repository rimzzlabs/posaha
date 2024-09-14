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

import { A, F, pipe, S } from '@mobily/ts-belt'
import { useFormContext } from 'react-hook-form'
import { match, P } from 'ts-pattern'
import { z } from 'zod'

export function CreateProductSKU() {
  let form = useFormContext<z.infer<typeof createProductSchema>>()
  let disabledInteractive = isFormPending(form.formState)

  let synthesizedOnChange = (onChange: (...e: unknown[]) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let nativeEvent = event.nativeEvent
      let isFromClipboard =
        'inputType' in nativeEvent && nativeEvent.inputType === 'insertFromPaste'

      let valueFromEvent = pipe(
        event.target.value,
        S.toUpperCase,
        S.replaceByRe(/\s+/g, '-'),
        F.ifElse(S.startsWith('-'), S.sliceToEnd(1), F.identity),
        (value) => {
          const match = /-+$/.exec(value)
          if (match && match[0].length > 1) {
            return value.slice(0, -match[0].length) + '-'
          }
          return value
        },
      )

      let valueFromPasteEvent = pipe(
        valueFromEvent,
        S.split('-'),
        A.filter((value) => S.length(value) > 0),
        A.join('-'),
      )

      let nextValue = match([isFromClipboard, valueFromEvent, valueFromPasteEvent] as const)
        .with([true, P._, P.select()], F.identity)
        .otherwise(([_1, valueFromEvent]) => valueFromEvent)

      onChange(nextValue)
    }
  }

  return (
    <FormField
      name='sku'
      control={form.control}
      disabled={disabledInteractive}
      render={({ field }) => (
        <FormItem>
          <FormLabel asterisk>Produk SKU</FormLabel>
          <div className='relative'>
            <p className='leading-none text-sm tracking-tight text-foreground absolute left-3 top-[0.6875rem]'>
              POS-
            </p>
            <FormControl>
              <Input
                {...field}
                className='pl-[2.875rem]'
                autoComplete='off'
                placeholder='MINYAK-500ML'
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
