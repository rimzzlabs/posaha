import { z } from 'zod'

export let updateAvatarSchema = z.object({
  id: z.string().min(1, 'User ID tidak valid'),
  image: z.string().min(1, 'Avatar tidak valid'),
})
