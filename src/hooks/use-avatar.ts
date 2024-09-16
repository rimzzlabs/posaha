import { lorelei } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import * as R from 'react'

type TUseAvatar = {
  seed: string
  size: number
  radius?: number
}

export function useAvatar({ seed, size, radius = 12 }: TUseAvatar) {
  return R.useMemo(
    () =>
      createAvatar(lorelei, {
        seed,
        size,
        radius,
        hairColor: ['000'],
        backgroundRotation: [0, 140],
        backgroundType: ['gradientLinear'],
        backgroundColor: ['78716C', '1C1917'],
      }).toDataUri(),
    [seed, size],
  )
}
