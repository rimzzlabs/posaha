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

import { createProductSchema } from '@/app/app/product/__schema'
import { cn } from '@/lib/utils'

import { A, D, F, O, pipe, type Option } from '@mobily/ts-belt'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as R from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

type TCreateProductCategory = {
  categoryList: Array<{
    id: string
    name: string
    createdAt: string
    updatedAt: string
    color: string
  }>
}

const DEFAULT_LABEL = 'Pilih kategori' as string

export function CreateProductCategory(props: TCreateProductCategory) {
  let [open, setOpen] = R.useState(false)
  let form = useFormContext<z.infer<typeof createProductSchema>>()

  let getFieldValue = (fieldValue: Option<string>) => {
    return pipe(fieldValue, O.fromNullable, O.mapWithDefault('', F.identity))
  }

  let getFieldLabel = (fieldValue: Option<string>) => {
    return pipe(
      props.categoryList,
      A.getBy((category) => category.id === getFieldValue(fieldValue)),
      O.mapWithDefault(DEFAULT_LABEL, D.get('name')),
      O.getWithDefault(DEFAULT_LABEL),
    )
  }

  let getCategoryColor = (fieldValue: Option<string>) => {
    return pipe(
      props.categoryList,
      A.getBy((category) => category.id === getFieldValue(fieldValue)),
      O.mapWithDefault(<div className='w-4 h-4 rounded bg-stone-600' />, (category) => (
        <div className='w-4 h-4 rounded' style={{ backgroundColor: category.color }} />
      )),
    )
  }

  return (
    <FormField
      name='category'
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel asterisk>Kategori Produk</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger ref={field.ref} asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn('w-full gap-x-2', !field.value && 'text-muted-foreground')}
                  >
                    {getCategoryColor(field.value)}
                    {getFieldLabel(field.value)}
                    <ChevronsUpDown className='ml-auto shrink-0' size='1em' />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Cari kategori produk' />
                  <CommandList>
                    <CommandEmpty>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Kategori tidak ditemukan
                      </p>
                    </CommandEmpty>

                    <CommandGroup>
                      <For each={props.categoryList}>
                        {(category) => (
                          <CommandItem
                            key={category.id}
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
                    </CommandGroup>
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
