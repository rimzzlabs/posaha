import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
} from './environment'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
})

export const IMAGE_SERVICE = cloudinary
