import { Loader2 } from 'lucide-react'

export default function LoadingAdmin() {
  return (
    <div className='flex flex-col items-center justify-center text-center text-balance h-[calc(100vh-14rem)]'>
      <Loader2 size='2.25rem' className='animate-spin' />
      <p className='font-semibold tracking-tight text-muted-foreground'>Memproses Halaman</p>
    </div>
  )
}
