import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import type { createCategorySchema } from '@/app/app/product/__schema'
import { PRODUCT_CATEGORY_COLORS } from '@/lib/constant'
import { isFormPending } from '@/lib/utils'

import { A, B, D, F, G, O, pipe } from '@mobily/ts-belt'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { z } from 'zod'

export function CreateProductCategoryColorPicker() {
  let form = useFormContext<z.infer<typeof createCategorySchema>>()
  let disabledInteractive = isFormPending(form.formState)

  return (
    <FormField
      name='color'
      control={form.control}
      render={({ field }) => (
        <FormItem className='pt-3'>
          <FormLabel asterisk>Warna Label Kategori Produk</FormLabel>
          <Popover>
            <FormControl>
              <PopoverTrigger disabled={disabledInteractive} ref={field.ref} asChild>
                <Button
                  variant='outline'
                  className='w-full justify-normal aria-[invalid="true"]:border-destructive'
                >
                  {F.ifElse(
                    field.value,
                    (fieldValue) => B.and(fieldValue.length > 0)(G.isString(fieldValue)),
                    (fieldValue) => (
                      <span className='inline-flex items-center gap-x-2'>
                        <span className='h-4 w-4 rounded' style={{ backgroundColor: fieldValue }} />
                        {pipe(
                          PRODUCT_CATEGORY_COLORS,
                          A.getBy((field) => F.equals(fieldValue)(field.value)),
                          O.getWithDefault({ label: '-', value: '' }),
                          D.get('label'),
                        )}
                      </span>
                    ),
                    () => (
                      <span className='text-muted-foreground'>Pilih Warna</span>
                    ),
                  )}{' '}
                  <ChevronDownIcon size='1em' className='ml-auto' />
                </Button>
              </PopoverTrigger>
            </FormControl>

            <PopoverContent>
              <p className='mb-4 font-semibold'>Pilih warna dibawah ini</p>
              <RadioGroup
                defaultValue={field.value || 'slate'}
                onValueChange={field.onChange}
                className='grid grid-cols-4 gap-2'
              >
                <For each={PRODUCT_CATEGORY_COLORS}>
                  {(color) => (
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger asChild>
                        <div>
                          <RadioGroupItem
                            value={color.value}
                            id={color.value}
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor={color.value}
                            className='flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-transparent peer-focus:border-primary peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-data-[state=checked]:border-primary'
                            style={{ backgroundColor: color.value }}
                          >
                            {field.value === color.value && (
                              <CheckIcon className='text-primary-foreground' size='1.5rem' />
                            )}
                            <span className='sr-only'>{color.value}</span>
                          </Label>
                        </div>
                      </TooltipTrigger>

                      <TooltipContent sideOffset={8}>
                        <p className='text-sm font-medium'>{color.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </For>
              </RadioGroup>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
