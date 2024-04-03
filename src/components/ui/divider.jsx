import { cn } from '@/lib/utils'

export default function Divider({ className, vertical, ...props }) {
  return <div className={cn('bg-slate-800 my-1', vertical ? 'w-[1px] max-w-[1px] h-full' : 'w-full h-[1px] max-h-[1px]', className)} {...props}></div>
}
