'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
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

import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

export function CreateProductCategory() {
  let [open, setOpen] = React.useState(false)
  let form = useFormContext<z.infer<typeof createProductSchema>>()

  return (
    <FormField
      name='category'
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel asterisk>Kategori Produk</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn('w-full', !field.value && 'text-muted-foreground')}
                  >
                    {field.value || 'Pilih Produk kategori'}
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
                    {/* 
                    <CommandGroup>
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
                    </CommandGroup> */}
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
