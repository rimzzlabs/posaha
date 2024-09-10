'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { For } from '@/components/ui/for'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { createProductSchema } from '@/app/admin/product/__schema'
import { cn } from '@/lib/utils'
import { productCategoryAtom } from '@/states/product-category'

import { A, D, F, O, pipe, S } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { match, P } from 'ts-pattern'
import { z } from 'zod'

export function CreateProductCategory() {
  let productCategoryList = useAtomValue(productCategoryAtom)
  let [open, setOpen] = React.useState(false)
  let form = useFormContext<z.infer<typeof createProductSchema>>()

  return (
    <FormField
      name='category'
      control={form.control}
      render={({ field }) => {
        let fieldValue = match(field.value)
          .with(P.string.minLength(1), (value) => {
            return pipe(
              productCategoryList,
              A.getBy((category) => S.includes(value)(category.id)),
              O.getWithDefault({ id: '', name: '', color: '', updatedAt: '', createdAt: '' }),
              D.getUnsafe('name'),
              F.defaultTo('Pilih Kategori Produk'),
            )
          })
          .otherwise(() => 'Pilih Kategori Produk')

        return (
          <FormItem className='pt-3'>
            <FormLabel asterisk>Kategori Produk</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn('w-full', !field.value && 'text-muted-foreground')}
                  >
                    {fieldValue}
                    <ChevronsUpDown className='ml-auto shrink-0' size='1em' />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Cari kategori produk' />
                  <CommandList>
                    <CommandEmpty className='h-40 flex items-center justify-center'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Kategori ini belum dibuat
                      </p>
                    </CommandEmpty>

                    <For each={productCategoryList}>
                      {(category) => (
                        <CommandItem
                          value={category.id}
                          onSelect={() => {
                            field.onChange(category.id)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-1 h-4 w-4',
                              category.id === field.value ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          <span
                            className='w-5 mr-2 h-5 rounded'
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}{' '}
                        </CommandItem>
                      )}
                    </For>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              Kategori produk dapat membantu anda untuk mengelola produk berdasarkan kategori
              tertentu.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
