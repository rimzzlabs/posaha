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
    <div
      className={cn('flex flex-col overflow-hidden transition-all md:h-64', generated && 'md:h-80')}
    >
      <UserAvatar
        size={512}
        width={204}
        height={204}
        radius={6}
        seed={seed}
        alt={props.name}
        className='max-lg:size-40 max-md:size-32 lg:size-52'
      />

      <div className='inline-flex max-w-32 flex-col gap-x-2 md:max-w-52'>
        <div className='mt-2 inline-flex gap-x-1'>
          <Button onClick={onGenerateRandom} variant='secondary' className='w-full gap-x-2'>
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
            <Button onClick={onClickSave} className='mt-2 w-full gap-x-2'>
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
