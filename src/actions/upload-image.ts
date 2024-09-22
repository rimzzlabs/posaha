'use server'

import { uploadImageFromBuffer } from '@/lib/configs/cloudinary'
import { actionReturn } from '@/lib/req-res'

import { createSafeActionClient } from 'next-safe-action'
import { Buffer } from 'node:buffer'
import { tryit } from 'radash'
import { zfd } from 'zod-form-data'

let schema = zfd.formData({
  image: zfd.file(),
  prevImage: zfd.text().optional(),
})

export let uploadImageAction = createSafeActionClient()
  .schema(schema)
  .action(async ({ parsedInput: payload }) => {
    let buffer = await payload.image.arrayBuffer()
    let file = Buffer.from(buffer)
    const [error, res] = await tryit(uploadImageFromBuffer)(file, payload.prevImage)

    if (error) {
      console.info('(LOG ERR) uploadImageAction error: ', error.message)
      return actionReturn('error')('Tidak dapat mengunggah gambar, harap coba lagi nanti')
    }

    return actionReturn('success')(res)
  })
