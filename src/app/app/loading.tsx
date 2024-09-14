import { Card, CardContent } from '@/components/ui/card'

import { Loader2 } from 'lucide-react'

export default function LoadingAdmin() {
  return (
    <div className='flex flex-col items-center justify-center text-center text-balance h-[calc(100vh-4rem-3rem)]'>
      <Card className='w-full h-full'>
        <CardContent className='flex flex-col items-center justify-center h-full'>
          <Loader2 size='2.25rem' className='animate-spin' />
          <p className='font-semibold tracking-tight text-muted-foreground'>Memproses Halaman</p>
        </CardContent>
      </Card>
    </div>
  )
}
