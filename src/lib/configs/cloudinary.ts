import { CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } from './environment'
import { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } from './environment-client'

import { F } from '@mobily/ts-belt'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { extractPublicId, buildImageUrl } from 'cloudinary-build-url'
import { isString, tryit } from 'radash'
import { Readable } from 'stream'
import { match, P } from 'ts-pattern'

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  use_root_path: false,
})

export function getPublicId(urlOrPublicId: string) {
  return match(urlOrPublicId).with(P.string.includes('http'), extractPublicId).otherwise(F.identity)
}

export function getImageUrl(urlOrPublicId: string) {
  return buildImageUrl(getPublicId(urlOrPublicId), {
    cloud: { cloudName: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, secure: true },
  })
}

export async function deleteImage(id: string) {
  const [err] = await tryit(cloudinary.uploader.destroy)(id)
  if (err) return err.message
  return true
}

export async function uploadImageFromBuffer(file: Buffer, prevURL?: string) {
  if (prevURL) {
    let res = await deleteImage(getPublicId(prevURL))
    if (isString(res)) {
      console.info('(LOG ERR) image delettion error reason: ', res)
    }
  }

  return new Promise<UploadApiResponse>((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: 'posaha', resource_type: 'image' },
      (error, response) => {
        if (error) return reject(error)
        if (!response) return reject(new Error('Server error'))
        return resolve(response)
      },
    )

    Readable.from(file).pipe(stream)
  })
}
