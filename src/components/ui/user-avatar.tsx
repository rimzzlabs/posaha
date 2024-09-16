'use client'

import { useAvatar } from '@/hooks/use-avatar'

import { cn } from '@/lib/utils'

import Image from 'next/image'

type TUserAvatar = {
  seed: string
  size: number
  width: number
  height: number
  alt: string
  className?: string
  radius?: number
}

export function UserAvatar({
  seed,
  size,
  className,
  width = 28,
  height = 28,
  radius = 12,
  ...props
}: TUserAvatar) {
  let avatar = useAvatar({ seed, size, radius })

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      src={avatar}
      width={width}
      height={height}
      className={cn('aspect-square', className)}
    />
  )
}
