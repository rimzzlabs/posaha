'use client'

import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/ui/user-avatar'

import { useUpdateAvatar } from '@/app/app/account/__hooks'
import { cn } from '@/lib/utils'

import { F, G, type Option } from '@mobily/ts-belt'
import { Dice6Icon, RotateCcwIcon } from 'lucide-react'

type TAccountPersonalInfoAvatar = {
  id: string
  name: string
  image: Option<string>
}

export function AccountPersonalInfoAvatar(props: TAccountPersonalInfoAvatar) {
  let { seed, generated, onGenerateRandom, onClickSave, onReset } = useUpdateAvatar(props)

  return (
    <div className={cn('flex flex-col overflow-hidden h-64 transition-all', generated && 'h-80')}>
      <UserAvatar
        size={512}
        width={204}
        height={204}
        radius={6}
        seed={seed}
        alt={props.name}
        className='max-md:size-24 max-lg:size-40 lg:size-52'
      />

      <div className='inline-flex flex-col gap-x-2'>
        <div className='inline-flex gap-x-1 mt-2'>
          <Button onClick={onGenerateRandom} variant='secondary' className='gap-x-2 w-full'>
            <Dice6Icon size='1em' />
            Acak Avatar
          </Button>

          {F.ifElse(
            generated,
            G.isString,
            () => (
              <Button variant='secondary' onClick={onReset}>
                <RotateCcwIcon size='1rem' />
                <span className='sr-only'>Batalkan</span>
              </Button>
            ),
            () => null,
          )}
        </div>

        {F.ifElse(
          generated,
          G.isString,
          () => (
            <Button onClick={onClickSave} className='gap-x-2 w-full mt-2'>
              <Dice6Icon size='1em' />
              Simpan
            </Button>
          ),
          () => null,
        )}
      </div>
    </div>
  )
}
