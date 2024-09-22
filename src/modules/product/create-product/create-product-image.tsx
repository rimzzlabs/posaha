'use client'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { uploadImageAction } from '@/actions/upload-image'
import { createProductSchema } from '@/app/app/product/__schema'
import { cn } from '@/lib/utils'

import { A, B, pipe } from '@mobily/ts-belt'
import { ImagePlusIcon, Loader2Icon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import Image from 'next/image'
import * as R from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { match, P } from 'ts-pattern'
import { z } from 'zod'

const UPLOAD_ERROR_MESSAGE = 'Gagal mengupload gambar, harap coba lagi'
const UPLOAD_SUCCESS_MESSAGE = 'Berhasil mengunggah gambar'
const UPLOAD_LOADING_MESSAGE = 'Mengunggah gambar, harap tunggu...'
const UPLOAD_SIZE_ERROR_MESSAGE = 'Ukuran gambar terlalu besar, maksimal 1MB'
const UPLOAD_ERROR_GENERIC_MESSAGE = 'Jenis file ini tidak didukung'
const MAX_FILE_SIZE = Math.pow(150, 3) // 3 MB
const MAX_FILE_UPLOAD = 1

export function CreateProductImage() {
  let form = useFormContext<z.infer<typeof createProductSchema>>()

  let uploadImage = useAction(uploadImageAction)
  let imageURL = useWatch({ control: form.control, name: 'image' })

  let onDrop = R.useCallback(
    (previousImageURL: typeof imageURL) => async (acceptedFiles: Array<File>) => {
      let file = acceptedFiles[0]
      if (!file) return
      toast.loading(UPLOAD_LOADING_MESSAGE)

      let fd = new FormData()
      fd.append('image', file)
      previousImageURL && fd.append('prevImage', previousImageURL)

      let res = await uploadImage.executeAsync(fd)
      toast.dismiss()

      let isUploadFailed = res?.serverError || res?.validationErrors || !res?.data
      if (isUploadFailed) {
        toast.error(UPLOAD_ERROR_MESSAGE)
        form.setValue('image', null)
        return
      }

      if (!res?.data?.ok) {
        toast.error(UPLOAD_ERROR_MESSAGE)
        form.setValue('image', null)
        return
      }

      form.setValue('image', res.data.secure_url)
      toast.success(UPLOAD_SUCCESS_MESSAGE)
    },
    [],
  )

  let disableInteraction = pipe(
    uploadImage.isPending,
    B.or(uploadImage.isExecuting),
    B.or(uploadImage.isTransitioning),
    B.or(form.formState.isSubmitting),
  )
  let { getRootProps, getInputProps, open, isDragAccept, isDragReject } = useDropzone({
    onDrop: onDrop(imageURL),
    disabled: disableInteraction,
    onError: (error) => toast.error(error.message),
    onDropRejected: (fileRejections) =>
      pipe(
        fileRejections,
        A.map((file) => file.errors),
        A.flat,
        A.map((err) => err.code),
        A.forEach((errCode) => {
          toast.error(
            match(errCode)
              .with(P.string.includes('too-large'), () => UPLOAD_SIZE_ERROR_MESSAGE)
              .otherwise(() => UPLOAD_ERROR_GENERIC_MESSAGE),
          )
        }),
      ),
    maxFiles: MAX_FILE_UPLOAD,
    maxSize: MAX_FILE_SIZE,
    noDrag: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/svg': [],
    },
  })

  let renderLabel = match([imageURL, isDragAccept, isDragReject])
    .with([P.string, P._, P._], () => null)
    .with([P.nullish, true, P._], () => (
      <p className='text-xs text-balance mb-4 font-medium text-muted-foreground'>
        Lepas file gambar disini untuk mengunggah
      </p>
    ))
    .with([P.nullish, P._, true], () => (
      <p className='text-xs text-balance mb-4 font-medium text-muted-foreground'>
        Jenis file gambar ini tidak didukung
      </p>
    ))
    .otherwise(() => (
      <p className='text-xs text-balance mb-4 font-medium text-muted-foreground'>
        Seret dan jatuhkan gambar di sini, atau klik untuk memilih gambar
      </p>
    ))

  let renderImage = match([imageURL, disableInteraction])
    .with([P._, true], () => (
      <Loader2Icon className='text-muted-foreground my-auto size-8 md:size-14 xl:size-16 animate-spin-ease' />
    ))
    .with([P.not(P.nullish).select(), false], (image) => (
      <Image src={image} alt='' className='rounded-md' width={240} height={240} />
    ))
    .otherwise(() => (
      <ImagePlusIcon className='text-muted-foreground my-auto size-8 md:size-14 xl:size-16' />
    ))

  return (
    <FormField
      name='image'
      control={form.control}
      render={({ field }) => (
        <FormItem className='md:w-72 lg:w-56 xl:w-80 space-y-1'>
          <FormLabel hidden>Unggah gambar produk</FormLabel>
          <FormControl>
            <div
              {...getRootProps()}
              className={cn(
                'flex flex-col transition items-center justify-center text-center border-stone-300 dark:border-stone-700 size-40 md:size-72 lg:size-56 xl:size-80 bg-muted border-4 rounded-lg border-dashed',
                isDragAccept && 'border-emerald-500 dark:border-emerald-500',
                isDragReject && 'border-red-600 dark:border-red-600',
              )}
            >
              {renderImage}
              {renderLabel}
              <input disabled={disableInteraction} {...getInputProps()} />
            </div>
          </FormControl>

          <Button onClick={open} disabled={disableInteraction} className='w-40 md:w-full mt-2'>
            Unggah Gambar
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
