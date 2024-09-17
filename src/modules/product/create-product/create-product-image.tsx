import { Button } from '@/components/ui/button'

import { ImagePlusIcon } from 'lucide-react'
import Image from 'next/image'
import * as R from 'react'
import { useDropzone } from 'react-dropzone'
import { match, P } from 'ts-pattern'

export function CreateProductImage() {
  let { current: fileReader } = R.useRef(new FileReader())
  let [base64Image, setBase64Image] = R.useState<null | string>(null)

  let onDrop = R.useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      fileReader.readAsDataURL(file)
    })
  }, [])
  let onLoadFile = R.useCallback((e: ProgressEvent<FileReader>) => {
    console.info(e.target)
    if (e.target?.result && typeof e.target.result === 'string') {
      setBase64Image(e.target.result.toString())
    }
  }, [])
  let { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/svg': [],
    },
  })

  R.useEffect(() => {
    let ac = new AbortController()
    let signal = ac.signal
    fileReader.addEventListener('load', onLoadFile, { passive: true, signal })

    return () => {
      ac.abort()
      fileReader.removeEventListener('load', onLoadFile)
    }
  }, [])

  return (
    <div className='md:w-72 lg:w-56 xl:w-80'>
      <div
        {...getRootProps()}
        className='flex flex-col items-center justify-center text-center border-stone-300 dark:border-stone-700 size-40 md:size-72 lg:size-56 xl:size-80 bg-muted border-4 rounded-lg border-dashed relative'
      >
        {match(base64Image)
          .with(P.not(P.nullish), (image) => (
            <Image
              src={image}
              alt=''
              className='rounded-md object-cover object-[top_center]'
              fill
            />
          ))
          .otherwise(() => (
            <ImagePlusIcon className='text-muted-foreground size-8 md:size-14 xl:size-16' />
          ))}
        <input {...getInputProps()} />
      </div>

      <Button onClick={open} className='w-full mt-2'>
        Unggah Gambar
      </Button>
    </div>
  )
}
