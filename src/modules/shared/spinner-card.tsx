import { Card, CardContent } from '@/components/ui/card'

import { Loader2 } from 'lucide-react'

export function SpinnerCard() {
  return (
    <div className='flex h-[calc(100vh-4rem-3rem)] flex-col items-center justify-center text-balance text-center'>
      <Card className='h-full w-full'>
        <CardContent className='flex h-full flex-col items-center justify-center'>
          <Loader2 size='2.25rem' className='animate-spin-ease' />
          <p className='font-semibold tracking-tight text-muted-foreground'>Memproses Halaman</p>
        </CardContent>
      </Card>
    </div>
  )
}
